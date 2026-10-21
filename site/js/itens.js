/* ==========================================================
   DADOS DO DESAPEGO — este é o arquivo para editar itens,
   preços, vendidos e fotos.
   ========================================================== */

const WHATSAPP = "5517996353273";   // com DDI 55 e DDD, só números
const MOSTRAR_AVISO_PREVIA = false;

const AMBIENTES = [
  { id: "sala",     nome: "Sala",            icone: "sofa" },
  { id: "cozinha",  nome: "Cozinha",         icone: "geladeira" },
  { id: "casal",    nome: "Quarto do casal", icone: "cama" },
  { id: "infantil", nome: "Quarto infantil", icone: "carro" },
  { id: "clima",    nome: "Climatização",    icone: "ar" },
  { id: "externa",  nome: "Área externa",    icone: "guardasol" },
];

/* Itens que aparecem no carrossel "Destaques da casa" (pelo nome + marca) */
const DESTAQUES = ["Smart TV 55\"", "Geladeira", "Lava-louça", "Ar-condicionado 18.000 BTUs", "Escrivaninha elétrica regulável", "Sofá", "Smart TV 50\""];

/* Campos de cada item
   id      → nome da pasta em fotos-originais/ e prefixo das fotos tratadas (não mude depois de criado)
   amb     → ambiente: sala | cozinha | casal | infantil | clima | externa
   icone   → ícone mostrado enquanto não há foto (veja js/icones.js)
   preco   → número em reais; null quando o valor é a combinar (use precoTexto)
   status  → "disponivel" (padrão) | "reservado" | "vendido"
   unidade/qtd → itens vendidos por unidade; qtd = quantos restam
   fotos   → ["fotos/<id>-1.webp", ...]; a primeira é a capa do card */
const ITENS = [
  // Sala
  { id: "mesa-de-jantar", amb: "sala", icone: "mesa", nome: "Mesa de jantar", marca: "Naterial", preco: 800, estado: "", specs: [], fotos: ["fotos/mesa-de-jantar-1.webp", "fotos/mesa-de-jantar-2.webp", "fotos/mesa-de-jantar-3.webp"] },
  { id: "cadeira-de-jantar", amb: "sala", icone: "cadeira", nome: "Cadeira de jantar", marca: "", preco: 80, unidade: true, qtd: 5, estado: "", specs: ["Vendida por unidade"], fotos: ["fotos/cadeira-de-jantar-1.webp"] },
  { id: "cadeira-de-jantar-mais-usada", amb: "sala", icone: "cadeira", nome: "Cadeira de jantar (mais usada)", marca: "", preco: 40, estado: "Com marcas de uso", specs: [], fotos: [] },
  { id: "sofa", amb: "sala", icone: "sofa", nome: "Sofá", marca: "", preco: 1500, estado: "", specs: [], fotos: ["fotos/sofa-1.webp", "fotos/sofa-2.webp", "fotos/sofa-3.webp", "fotos/sofa-4.webp"] },
  { id: "poltrona", amb: "sala", icone: "poltrona", nome: "Poltrona", marca: "", preco: 250, estado: "", specs: [], fotos: ["fotos/poltrona-1.webp"] },
  { id: "rack", amb: "sala", icone: "rack", nome: "Rack", marca: "", preco: 300, status: "vendido", estado: "", specs: [], fotos: ["fotos/rack-1.webp"] },
  { id: "smart-tv-55", amb: "sala", icone: "tv", nome: "Smart TV 55\"", marca: "TCL", preco: 1800, status: "vendido", estado: "", specs: ["55 polegadas"], fotos: ["fotos/smart-tv-55-1.webp", "fotos/smart-tv-55-2.webp"] },
  { id: "prateleira", amb: "sala", icone: "estante", nome: "Prateleira", marca: "", preco: 80, estado: "", specs: [], fotos: ["fotos/prateleira-1.webp"] },
  { id: "luminaria-de-chao", amb: "sala", icone: "luminaria", nome: "Luminária de chão", marca: "", preco: 90, estado: "", specs: [], fotos: ["fotos/luminaria-de-chao-1.webp", "fotos/luminaria-de-chao-2.webp", "fotos/luminaria-de-chao-3.webp"] },
  { id: "tapete-da-sala", amb: "sala", icone: "tapete", nome: "Tapete da sala", marca: "", preco: 350, estado: "", specs: [], fotos: ["fotos/tapete-da-sala-1.webp", "fotos/tapete-da-sala-2.webp"] },
  { id: "bicicleta-ergometrica", amb: "sala", icone: "bike", nome: "Bicicleta ergométrica", marca: "", preco: 300, estado: "", specs: [], fotos: ["fotos/bicicleta-ergometrica-1.webp"] },
  { id: "quadros", amb: "sala", icone: "quadros", nome: "Quadros", marca: "", preco: null, precoTexto: "Valor a combinar", estado: "", specs: ["Vários quadros: veja todas as fotos"], fotos: ["fotos/quadros-1.webp", "fotos/quadros-2.webp", "fotos/quadros-3.webp", "fotos/quadros-4.webp", "fotos/quadros-5.webp", "fotos/quadros-6.webp", "fotos/quadros-7.webp", "fotos/quadros-8.webp", "fotos/quadros-9.webp"] },

  // Cozinha
  { id: "geladeira", amb: "cozinha", icone: "geladeira", nome: "Geladeira", marca: "", preco: 1500, status: "vendido", estado: "", specs: [], fotos: ["fotos/geladeira-1.webp", "fotos/geladeira-2.webp"] },
  { id: "micro-ondas", amb: "cozinha", icone: "microondas", nome: "Micro-ondas", marca: "", preco: 350, estado: "", specs: [], fotos: ["fotos/micro-ondas-1.webp"] },
  { id: "suporte-micro-ondas", amb: "cozinha", icone: "suporte", nome: "Suporte para micro-ondas", marca: "", preco: 120, estado: "", specs: ["É o suporte que aparece na foto, sem o micro-ondas"], fotos: ["fotos/micro-ondas-1.webp"] },
  { id: "lava-louca", amb: "cozinha", icone: "lavalouca", nome: "Lava-louça", marca: "", preco: 1500, estado: "Na garantia", specs: [], fotos: ["fotos/lava-louca-1.webp"] },
  { id: "cooktop-4-bocas", amb: "cozinha", icone: "cooktop", nome: "Cooktop 4 bocas", marca: "", preco: 200, estado: "", specs: ["4 bocas"], fotos: [] },
  { id: "forno", amb: "cozinha", icone: "forno", nome: "Forno", marca: "", preco: 200, estado: "", specs: [], fotos: ["fotos/forno-1.webp"] },
  { id: "panela-de-pressao", amb: "cozinha", icone: "panela", nome: "Panela de pressão", marca: "", preco: 250, status: "vendido", estado: "", specs: [], fotos: [] },
  { id: "airfryer", amb: "cozinha", icone: "airfryer", nome: "Airfryer", marca: "", preco: 120, estado: "", specs: [], fotos: ["fotos/airfryer-1.webp"] },
  { id: "maquina-de-cafe", amb: "cozinha", icone: "cafe", nome: "Máquina de café", marca: "", preco: 350, estado: "", specs: [], fotos: ["fotos/maquina-de-cafe-1.webp"] },
  { id: "pipoqueira", amb: "cozinha", icone: "pipoca", nome: "Pipoqueira", marca: "", preco: 60, estado: "", specs: [], fotos: [] },
  { id: "batedeira", amb: "cozinha", icone: "batedeira", nome: "Batedeira", marca: "", preco: 60, estado: "", specs: [], fotos: ["fotos/batedeira-1.webp"] },
  { id: "espremedor-de-suco", amb: "cozinha", icone: "espremedor", nome: "Espremedor de suco", marca: "", preco: 60, estado: "", specs: [], fotos: ["fotos/espremedor-de-suco-1.webp"] },

  // Quarto do casal
  { id: "cama-de-casal-com-colchao", amb: "casal", icone: "cama", nome: "Cama de casal com colchão", marca: "", preco: 500, estado: "", specs: ["Colchão de molas ensacadas"], fotos: ["fotos/cama-de-casal-com-colchao-1.webp", "fotos/cama-de-casal-com-colchao-2.webp"] },
  { id: "escrivaninha-eletrica-regulavel", amb: "casal", icone: "escrivaninha", nome: "Escrivaninha elétrica regulável", marca: "", preco: 200, estado: "", specs: ["Sobe e desce para trabalhar em pé"], fotos: ["fotos/escrivaninha-eletrica-regulavel-1.webp"] },
  { id: "mesa-de-cabeceira", amb: "casal", icone: "cabeceira", nome: "Mesa de cabeceira", marca: "", preco: 120, estado: "", specs: [], fotos: ["fotos/mesa-de-cabeceira-1.webp", "fotos/mesa-de-cabeceira-2.webp"] },
  { id: "gaveteiro", amb: "casal", icone: "gaveteiro", nome: "Gaveteiro", marca: "", preco: 120, estado: "", specs: [], fotos: ["fotos/gaveteiro-1.webp"] },
  { id: "smart-tv-50", amb: "casal", icone: "tv", nome: "Smart TV 50\"", marca: "Samsung", preco: 1500, estado: "", specs: ["50 polegadas"], fotos: ["fotos/smart-tv-50-1.webp", "fotos/smart-tv-50-2.webp"] },
  { id: "cadeira-de-escritorio", amb: "casal", icone: "escritorio", nome: "Cadeira de escritório", marca: "", preco: 700, estado: "", specs: [], fotos: ["fotos/cadeira-de-escritorio-1.webp", "fotos/cadeira-de-escritorio-2.webp", "fotos/cadeira-de-escritorio-3.webp"] },
  { id: "monitor-27", amb: "casal", icone: "monitor", nome: "Monitor 27\"", marca: "", preco: 700, estado: "", specs: ["27 polegadas", "165 Hz"], fotos: ["fotos/monitor-27-1.webp"] },
  { id: "monitor-24", amb: "casal", icone: "monitor", nome: "Monitor 24\"", marca: "", preco: 500, estado: "", specs: ["24 polegadas", "60 Hz"], fotos: ["fotos/monitor-24-1.webp"] },

  // Quarto infantil
  { id: "cama-em-formato-de-carro", amb: "infantil", icone: "carro", nome: "Cama em formato de carro", marca: "", preco: 450, estado: "", specs: [], fotos: ["fotos/cama-em-formato-de-carro-1.webp", "fotos/cama-em-formato-de-carro-2.webp"] },
  { id: "bateria-infantil", amb: "infantil", icone: "bateria", nome: "Bateria infantil", marca: "", preco: 70, estado: "", specs: [], fotos: ["fotos/bateria-infantil-1.webp", "fotos/bateria-infantil-2.webp", "fotos/bateria-infantil-3.webp"] },
  { id: "mesinha-infantil-com-cadeira", amb: "infantil", icone: "mesinha", nome: "Mesinha infantil com cadeira", marca: "", preco: 100, estado: "", specs: [], fotos: ["fotos/mesinha-infantil-com-cadeira-1.webp"] },
  { id: "armario-infantil", amb: "infantil", icone: "armario", nome: "Armário infantil", marca: "", preco: 450, status: "vendido", estado: "", specs: [], fotos: ["fotos/armario-infantil-1.webp"] },
  { id: "prateleira-vermelha-de-metal", amb: "infantil", icone: "metal", nome: "Prateleira vermelha de metal", marca: "", preco: 80, estado: "", specs: ["De chão"], fotos: ["fotos/prateleira-vermelha-de-metal-1.webp"] },
  { id: "mini-prateleira-com-organizadores", amb: "infantil", icone: "nichos", nome: "Mini prateleira com organizadores", marca: "", preco: 80, estado: "", specs: ["Organizadores de pano"], fotos: [] },
  { id: "tapete-infantil", amb: "infantil", icone: "tapetekids", nome: "Tapete infantil", marca: "", preco: 300, estado: "", specs: [], fotos: ["fotos/tapete-infantil-1.webp"] },

  // Área externa
  { id: "guarda-sol-com-mesa-e-cadeiras", amb: "externa", icone: "guardasol", nome: "Guarda-sol com mesa e cadeiras", marca: "", preco: 600, status: "vendido", estado: "", specs: ["Conjunto completo"], fotos: [] },

  // Climatização
  { id: "ar-condicionado-9000-btus-electrolux", amb: "clima", icone: "ar", nome: "Ar-condicionado 9.000 BTUs", marca: "Electrolux", preco: 1900, estado: "", specs: ["9.000 BTUs"], aviso: "Desinstalação a combinar", fotos: ["fotos/ar-condicionado-9000-btus-electrolux-1.webp", "fotos/ar-condicionado-9000-btus-electrolux-2.webp"] },
  { id: "ar-condicionado-9000-btus-philco", amb: "clima", icone: "ar", nome: "Ar-condicionado 9.000 BTUs", marca: "Philco", preco: 1600, estado: "", specs: ["9.000 BTUs"], aviso: "Desinstalação a combinar", fotos: ["fotos/ar-condicionado-9000-btus-philco-1.webp", "fotos/ar-condicionado-9000-btus-philco-2.webp"] },
  { id: "ar-condicionado-18000-btus-samsung", amb: "clima", icone: "ar", nome: "Ar-condicionado 18.000 BTUs", marca: "Samsung", preco: 2500, estado: "", specs: ["18.000 BTUs", "Instalado na sala"], aviso: "Desinstalação a combinar", fotos: ["fotos/ar-condicionado-18000-btus-samsung-1.webp"] },
];
/* ================================================ */
