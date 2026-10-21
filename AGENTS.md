# Instruções para agentes (Codex e outros)

Site estático de venda de itens da casa. Sem framework, sem npm. Leia o `README.md` para a estrutura.

## Tarefa principal: tratar fotos

Quando pedirem para "tratar as fotos":

1. Procure imagens em `fotos-originais/<ambiente>/<id-do-item>/` (jpg, jpeg, png, heic, webp).
   O nome da pasta do item é exatamente o `id` dele em `site/js/itens.js`.
2. Para cada foto:
   - corrija a orientação pelo EXIF;
   - **remova todos os metadados** (EXIF, GPS). As fotos vão para um site público;
   - redimensione para no máximo **1600 px** no lado maior (sem aumentar fotos menores);
   - salve como **WebP**, qualidade ~80, em `site/fotos/<id>-<n>.webp` (`n` começa em 1, na ordem alfabética dos arquivos originais).
3. Atualize o campo `fotos` do item em `site/js/itens.js`:
   `fotos: ["fotos/<id>-1.webp", "fotos/<id>-2.webp"]`. A primeira é a capa do card.
4. Não apague nem altere nada em `fotos-originais/`.
5. Se uma pasta tiver fotos mas não existir item com aquele `id`, avise em vez de inventar um item.
6. Ao terminar, liste quais itens ganharam fotos e quantas.

Ferramentas sugeridas: Pillow (`pip install pillow pillow-heif`) ou `sips`/`cwebp` no macOS.

## Regras gerais

- Itens, preços e status ficam **só** em `site/js/itens.js`. Não escreva dados em `app.js` ou no HTML.
- Não mude o `id` de um item existente: ele liga o item às fotos.
- Textos do site em português do Brasil.
- Depois de mudar o site, rode `python3 scripts/build.py` para atualizar `dist/`.
- Nunca adicione `fotos-originais/` ou `revisao-fotos/` ao git: elas têm GPS e pessoas nas fotos.
