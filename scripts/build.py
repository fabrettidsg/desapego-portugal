#!/usr/bin/env python3
"""Gera as versões publicáveis do site a partir da pasta site/.

Uso (na raiz do projeto):
    python3 scripts/build.py

Saída:
    dist/desapego-netlify.zip   → arrastar no Netlify (Deploys)
    dist/artefato/              → versão usada para atualizar o link do Claude
"""
import re
import shutil
import zipfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SITE = RAIZ / "site"
DIST = RAIZ / "dist"
PASTAS = ["css", "js", "fotos"]


def arquivos_do_site():
    yield SITE / "index.html"
    for pasta in PASTAS:
        for arq in sorted((SITE / pasta).rglob("*")):
            if arq.is_file() and not arq.name.startswith("."):
                yield arq


def gerar_zip():
    destino = DIST / "desapego-netlify.zip"
    with zipfile.ZipFile(destino, "w", zipfile.ZIP_DEFLATED) as z:
        for arq in arquivos_do_site():
            z.write(arq, arq.relative_to(SITE).as_posix())
    return destino


def gerar_artefato():
    """O artefato do Claude já recebe <html>/<head>/<body> prontos, então a página vai sem eles."""
    destino = DIST / "artefato"
    if destino.exists():
        shutil.rmtree(destino)
    destino.mkdir(parents=True)
    html = (SITE / "index.html").read_text(encoding="utf-8")
    head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
    body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
    manter = re.findall(r"<title>.*?</title>|<link [^>]+>", head, re.S)
    (destino / "index.html").write_text("\n".join(manter) + "\n" + body.strip() + "\n", encoding="utf-8")
    for pasta in PASTAS:
        shutil.copytree(SITE / pasta, destino / pasta, ignore=shutil.ignore_patterns(".*"))
    return destino


if __name__ == "__main__":
    DIST.mkdir(exist_ok=True)
    print("Netlify :", gerar_zip().relative_to(RAIZ))
    print("Artefato:", gerar_artefato().relative_to(RAIZ))
