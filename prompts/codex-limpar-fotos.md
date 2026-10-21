Leia o AGENTS.md antes de começar. Sua tarefa é preparar as fotos dos anúncios do site.

## Onde estão as fotos
- Originais: `fotos-originais/<ambiente>/<id-do-item>/`. O nome da pasta é o `id` do item em `site/js/itens.js`.
- Ignore a pasta `fotos-originais/_revisar-nao-estao-na-lista/`.
- Nunca altere, mova ou apague nada em `fotos-originais/`.

## O que fazer em cada foto
O objetivo é que o produto anunciado seja o protagonista da foto, sem bagunça em volta.

1. **Identifique o produto principal** pela pasta onde a foto está. Exemplo: em `sofa/`, o produto é o sofá.
2. **Remova o que não faz parte do produto**, preenchendo o fundo de forma natural (parede, piso, cortina):
   - objetos pessoais em cima ou em volta: roupas, brinquedos, sacolas, garrafas, alimentos, controles, cabos soltos, papéis, plantas, decoração;
   - **pessoas, partes do corpo (mãos, braços, pernas) e animais**. Isso é obrigatório, porque o site é público e há crianças em algumas fotos;
   - outros móveis que dividem a foto e não estão à venda nesse anúncio, quando der para remover sem parecer artificial.
3. **Enquadre**: recorte para centralizar o produto, com uma pequena margem. Corrija a inclinação e a perspectiva se a foto estiver torta, e equilibre o brilho e o branco se estiver escura ou amarelada.
4. **Não altere o produto em si.** Mantenha arranhões, manchas, desgaste, cor real, formato e tamanho. São itens usados e o comprador vai ver pessoalmente: a foto precisa ser honesta. Não invente partes que não aparecem na foto.
5. Se a remoção ficar artificial (borrões, formas deformadas, textura repetida), use **só o recorte e o ajuste de luz** naquela foto e anote isso no relatório.

## Saída
- Formato: WebP, qualidade ~80, no máximo 1600 px no lado maior, orientação corrigida e **sem metadados** (EXIF/GPS).
- Salve como `site/fotos/<id>-<n>.webp` (n = 1, 2, 3… na ordem dos arquivos originais). A melhor foto do item deve ser a `-1`, porque ela vira a capa do card.
- Atualize o campo `fotos` do item em `site/js/itens.js`, por exemplo `fotos: ["fotos/sofa-1.webp", "fotos/sofa-2.webp"]`. Não mude nenhum outro campo.

## Como trabalhar
1. **Comece por um teste:** trate só as fotos de `1-sala/sofa/` e `2-cozinha/airfryer/` e pare. Mostre o antes e o depois para eu aprovar o estilo.
2. Com a minha aprovação, trate os demais itens, um ambiente por vez.
3. No final, mostre um relatório com:
   - quantas fotos cada item recebeu;
   - quais fotos ficaram só com recorte;
   - quais fotos você acha que eu devo tirar de novo (borradas, escuras, produto cortado).
