# Desapego rumo a Portugal

Siga também o `AGENTS.md` (regras de fotos e dados, compartilhadas com o Codex).

## Publicar no artefato do Claude

O site publicado vive em https://claude.ai/artifact/9ZHX1Aj63ABwNUJXbj1BAw — sempre atualize este mesmo link, nunca crie outro.

1. `python3 scripts/publicar.py` → roda o build, confere o site e lista os arquivos mudados desde a última publicação (`"sem_mudancas"` ou `"erro"` = não publicar).
2. Publique `dist/artefato/index.html` com `url` do artefato acima, `root: "dist/artefato"` e `files` mapeando cada caminho de `"mudados"` para ele mesmo (arquivos já publicados que não mudaram não precisam ir de novo).
3. Depois de publicar, `python3 scripts/publicar.py --marcar`.

## GitHub Pages

O projeto é um repositório git (branch `main`). Cada push publica a pasta `site/` no GitHub Pages pelo workflow `.github/workflows/pages.yml`.
`fotos-originais/` e `revisao-fotos/` ficam fora do git de propósito (têm GPS e pessoas nas fotos): nunca adicione essas pastas.
Faça commit/push só quando o usuário pedir.

## Contexto

- WhatsApp dos vendedores e formas de pagamento estão em `site/js/itens.js` e `site/index.html`.
- Visual atual: estilo loja online, cores de Portugal (verde, vermelho, amarelo).
- O usuário avisa vendas por mensagem ("vendi o sofá") → `status: "vendido"` no item e publicar.
