# Desapego rumo a Portugal

Site com os móveis e eletrodomésticos à venda antes da mudança para Portugal.
Os vizinhos do condomínio veem os itens e chamam no WhatsApp.

- **Link do Claude:** https://claude.ai/artifact/9ZHX1Aj63ABwNUJXbj1BAw
- **GitHub Pages:** cada push na branch `main` publica a pasta `site/`

## Estrutura

```
desapego-portugal/
├── site/                     ← o site em si (é isso que vai para o ar)
│   ├── index.html
│   ├── css/estilo.css        ← cores e visual
│   ├── js/itens.js           ← ★ itens, preços, vendidos e fotos (o arquivo do dia a dia)
│   ├── js/icones.js          ← ícones mostrados enquanto não há foto
│   ├── js/app.js             ← lógica da página
│   └── fotos/                ← fotos tratadas, prontas para o site
├── fotos-originais/          ← coloque aqui as fotos do celular
│   ├── 1-sala/
│   │   ├── mesa-de-jantar/
│   │   ├── sofa/
│   │   └── …
│   ├── 2-cozinha/
│   ├── 3-quarto-do-casal/
│   ├── 4-quarto-infantil/
│   ├── 5-climatizacao/
│   └── 6-area-externa/
├── .github/workflows/        ← publica o site/ no GitHub Pages
├── scripts/build.py          ← gera a versão do artefato do Claude (e um zip de reserva)
├── dist/                     ← arquivos gerados (não editar à mão)
├── AGENTS.md                 ← instruções para o Codex
└── CLAUDE.md                 ← instruções para o Claude
```

## Como adicionar fotos

1. Copie as fotos do item para a pasta dele em `fotos-originais/`
   (ex.: `fotos-originais/1-sala/sofa/`). Qualquer nome de arquivo serve.
2. Peça ao Codex: **"trata as fotos novas"**. Ele gera as versões leves em
   `site/fotos/` e atualiza `site/js/itens.js`.
3. Peça ao Claude: **"publica"**. Ele atualiza o link do Claude.
4. Faça commit e push no VS Code para atualizar o GitHub Pages.

## Como marcar vendido

Em `site/js/itens.js`, no item, adicione `status: "vendido"`.
Para itens por unidade (cadeiras), diminua o `qtd`. Com `qtd: 0` ele aparece como vendido.

## Ver no computador

```bash
python3 -m http.server 8765 --directory site
```

Depois abra http://localhost:8765

## Publicar

`fotos-originais/` e `revisao-fotos/` não vão para o GitHub (estão no `.gitignore`): têm localização GPS e pessoas nas fotos.

```bash
python3 scripts/build.py
```
