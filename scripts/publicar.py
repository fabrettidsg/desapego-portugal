#!/usr/bin/env python3
"""Prepara a publicação automática no artefato do Claude.

    python3 scripts/publicar.py           → roda o build, confere o site e lista o que mudou
    python3 scripts/publicar.py --marcar  → registra que a versão atual foi publicada

Saída (JSON):
    {"status": "ok", "mudados": ["js/itens.js", "fotos/sofa-1.webp", ...]}
    {"status": "sem_mudancas"}
    {"status": "erro", "motivo": "..."}   → não publicar nesta rodada
"""
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ART = RAIZ / "dist" / "artefato"
REGISTRO = RAIZ / "dist" / ".publicado.json"


def hashes():
    return {
        p.relative_to(ART).as_posix(): hashlib.sha1(p.read_bytes()).hexdigest()
        for p in sorted(ART.rglob("*"))
        if p.is_file() and not p.name.startswith(".")
    }


def conferir():
    """Evita publicar enquanto o Codex está no meio de uma edição."""
    for js in sorted((RAIZ / "site" / "js").glob("*.js")):
        r = subprocess.run(
            ["osascript", "-l", "JavaScript", "-e",
             f"new Function($.NSString.stringWithContentsOfFileEncodingError('{js}',4,null).js); 'ok'"],
            capture_output=True, text=True)
        if r.returncode != 0:
            return f"erro de sintaxe em {js.name}"
    itens = (RAIZ / "site" / "js" / "itens.js").read_text(encoding="utf-8")
    faltando = [f for f in re.findall(r'"(fotos/[^"<>]+)"', itens) if not (RAIZ / "site" / f).is_file()]
    if faltando:
        return "fotos citadas no itens.js que ainda não existem: " + ", ".join(faltando[:5])
    return None


def main():
    if "--marcar" in sys.argv:
        REGISTRO.write_text(json.dumps(hashes(), indent=1))
        print(json.dumps({"status": "marcado"}))
        return
    motivo = conferir()
    if motivo:
        print(json.dumps({"status": "erro", "motivo": motivo}, ensure_ascii=False))
        return
    subprocess.run([sys.executable, str(RAIZ / "scripts" / "build.py")], check=True, capture_output=True)
    antes = json.loads(REGISTRO.read_text()) if REGISTRO.exists() else {}
    agora = hashes()
    mudados = [p for p, h in agora.items() if antes.get(p) != h]
    print(json.dumps({"status": "ok", "mudados": mudados} if mudados else {"status": "sem_mudancas"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
