/* Lógica da página: filtros, cards, galeria. Normalmente não precisa mexer aqui. */

const zapIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>`;
const brl = v => v == null ? "Consulte" : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const statusDe = it => it.status || (it.unidade && it.qtd === 0 ? "vendido" : "disponivel");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $ = id => document.getElementById(id);

let filtro = "todos";
try { filtro = localStorage.getItem("desapego-filtro") || "todos"; } catch (e) {}

function linkZap(it) {
  let msg = it
    ? `Olá! Vi o desapego de vocês e tenho interesse em: ${it.nome}${it.marca ? " (" + it.marca + ")" : ""}${it.preco != null ? " - " + brl(it.preco) + (it.unidade ? " cada" : "") : ""}.${it.precoTexto ? " Pode me passar os valores?" : ""}${it.unidade ? " Quantidade: " : ""}`
    : "Olá! Vi o desapego de vocês e queria tirar uma dúvida.";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function card(it) {
  const st = statusDe(it);
  const badges = [];
  if (st === "reservado") badges.push(`<span class="badge cinza">Reservado</span>`);
  if (it.estado === "Na garantia") badges.push(`<span class="badge laranja">Na garantia</span>`);
  if (it.unidade && st !== "vendido") badges.push(`<span class="badge verde">${it.qtd} disponíve${it.qtd > 1 ? "is" : "l"}</span>`);
  const faixa = st === "vendido" ? `<span class="faixa-vendido">Vendido</span>` : "";
  const b = badges.length ? `<div class="badges">${badges.join("")}</div>` : "";
  const temFoto = it.fotos && it.fotos.length;
  const foto = temFoto
    ? `<button class="foto" type="button" data-zoom="${ITENS.indexOf(it)}" aria-label="Ver fotos de ${esc(it.nome)}"><img src="${esc(it.fotos[0])}" alt="${esc(it.nome)}" loading="lazy">${b}${faixa}</button>`
    : `<div class="foto">${icone(it.icone)}<span class="semfoto">Foto em breve</span>${b}${faixa}</div>`;
  const detalhes = [...it.specs, ...(it.estado && it.estado !== "Na garantia" ? [it.estado] : [])].join(" · ");
  const preco = it.precoTexto
    ? `<div class="v consulta">${esc(it.precoTexto)}</div><div class="cond">Chame no WhatsApp para saber</div>`
    : `<div class="v">${brl(it.preco)}${it.unidade ? "<small>cada</small>" : ""}</div><div class="cond"><b>Pix, dinheiro ou cartão</b></div>`;
  const botao = st === "vendido" ? "Vendido" : st === "reservado" ? "Entrar na fila" : it.precoTexto ? "Perguntar valor" : "Tenho interesse";
  return `<article class="card ${st === "vendido" ? "vendido" : ""}">
    ${foto}
    <div class="info">
      <div class="marca">${esc(it.marca || "")}</div>
      <h3 class="nome">${esc(it.nome)}</h3>
      ${detalhes ? `<p class="specs">${esc(detalhes)}</p>` : ""}
      ${it.aviso ? `<div class="aviso">${esc(it.aviso)}</div>` : ""}
      <div class="preco">${preco}</div>
      <a class="btn-card" href="${linkZap(it)}" target="_blank" rel="noopener">${zapIcon}${botao}</a>
    </div>
  </article>`;
}

function render() {
  const termo = $("busca").value.trim().toLowerCase();
  const soDisp = $("soDisp").checked;
  const ordem = $("ordem").value;

  // ambientes
  const cont = a => ITENS.filter(i => a === "todos" || i.amb === a).length;
  $("ambientes").innerHTML = [{ id: "todos", nome: "Todos os itens", icone: "casa" }, ...AMBIENTES]
    .map(a => `<button class="amb" type="button" data-f="${a.id}" aria-pressed="${filtro === a.id}"><span class="icw">${icone(a.icone)}</span><span><b>${a.nome}</b><br><span>${cont(a.id)} itens</span></span></button>`).join("");

  const visiveis = ITENS.filter(it =>
    (filtro === "todos" || it.amb === filtro) &&
    (!soDisp || statusDe(it) !== "vendido") &&
    (!termo || (it.nome + " " + it.marca + " " + it.specs.join(" ")).toLowerCase().includes(termo))
  );
  const nomeAmb = filtro === "todos" ? "Todos os itens" : AMBIENTES.find(a => a.id === filtro).nome;
  $("tituloLista").textContent = termo ? `Resultados para “${$("busca").value.trim()}”` : nomeAmb;
  const disp = visiveis.filter(i => statusDe(i) !== "vendido").length;
  $("qtd").innerHTML = `<b>${visiveis.length}</b> ${visiveis.length === 1 ? "item" : "itens"} · ${disp} disponíve${disp === 1 ? "l" : "is"}`;

  let ord = visiveis;
  if (ordem === "ambiente") ord = AMBIENTES.flatMap(a => visiveis.filter(i => i.amb === a.id));
  else ord = [...visiveis].sort((x, y) => { const a = x.preco ?? Infinity, b = y.preco ?? Infinity; return ordem === "menor" ? a - b : (b === Infinity ? -1 : a === Infinity ? 1 : b - a); });
  $("lista").innerHTML = ord.length ? ord.map(card).join("") : `<p class="vazio">Nenhum item encontrado. Tente outra busca ou outro ambiente.</p>`;
}

function renderFixos() {
  const dest = DESTAQUES.map(n => ITENS.find(i => i.nome === n)).filter(Boolean);
  $("trilho").innerHTML = dest.map(card).join("");
  const precos = ITENS.filter(i => i.preco != null && statusDe(i) !== "vendido").map(i => i.preco);
  if (precos.length) $("aPartir").textContent = brl(Math.min(...precos));
  $("vitrine").innerHTML = ["Smart TV 55\"", "Geladeira", "Sofá", "Ar-condicionado 18.000 BTUs"]
    .map(n => ITENS.find(i => i.nome === n)).filter(Boolean)
    .map(i => statusDe(i) === "vendido" ? `<div class="peca vendida">${icone(i.icone)}<b>Vendido</b></div>` : `<div class="peca">${icone(i.icone)}<b>${brl(i.preco)}</b></div>`).join("");
}

$("ambientes").addEventListener("click", e => {
  const b = e.target.closest("[data-f]"); if (!b) return;
  filtro = b.dataset.f;
  try { localStorage.setItem("desapego-filtro", filtro); } catch (err) {}
  render();
  $("produtos").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});
$("busca").addEventListener("input", () => { render(); });
$("busca").addEventListener("keydown", e => { if (e.key === "Enter") $("produtos").scrollIntoView(); });
["ordem", "soDisp"].forEach(id => $(id).addEventListener("input", render));

// Galeria de fotos
let lbItem = null, lbIdx = 0;
const lb = $("lightbox");
function lbShow() { $("lbImg").src = lbItem.fotos[lbIdx]; $("lbImg").alt = lbItem.nome; const m = lbItem.fotos.length > 1; $("lbPrev").hidden = !m; $("lbNext").hidden = !m; }
document.addEventListener("click", e => {
  const b = e.target.closest("[data-zoom]"); if (!b) return;
  lbItem = ITENS[+b.dataset.zoom]; lbIdx = 0; lbShow(); lb.showModal();
});
$("lbClose").onclick = () => lb.close();
$("lbPrev").onclick = () => { lbIdx = (lbIdx - 1 + lbItem.fotos.length) % lbItem.fotos.length; lbShow(); };
$("lbNext").onclick = () => { lbIdx = (lbIdx + 1) % lbItem.fotos.length; lbShow(); };
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });

$("previewNote").hidden = !MOSTRAR_AVISO_PREVIA;
$("zapTopo").href = $("zapFlutuante").href = linkZap(null);
$("contato").innerHTML = `<strong>WhatsApp:</strong> +${WHATSAPP.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, "$1 ($2) $3-$4")}`;
renderFixos();
render();
