// Exibe ou esconde o painel do carrinho
function toggleCarrinho() {
    const panel = document.getElementById("carrinhoPanel");
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
}

// Adiciona um item ao carrinho (agora com o nome correto)
function adicionarAoCarrinho(nome, preco) {
    const item = { nome, preco };
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}

// Renderiza os itens no carrinho
function renderizarCarrinho() {
    const itensCarrinho = document.getElementById("itensCarrinho");
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    itensCarrinho.innerHTML = "";  // Limpa a lista antes de adicionar

    let total = 0;  // Inicializa o total da compra

    carrinho.forEach((item, index) => {
    const divItem = document.createElement("div");
    divItem.classList.add("carrinho-item");
    divItem.innerHTML = `
        <span>${item.nome} - R$${item.preco}</span>
        <button onclick="removerItem(${index})">X</button>
    `;
    itensCarrinho.appendChild(divItem);
    total += item.preco;
});

    // Exibe o total da compra
    document.getElementById("totalCompra").innerText = `Valor Total: R$${total.toFixed(2)}`;
}

// Remove um item do carrinho
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); // Remove o item apenas da posição indicada
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}

// Finaliza a compra (simulação)
function finalizarCompra() {
    alert("Compra finalizada!");
    localStorage.removeItem("carrinho");  // Limpa o carrinho após a compra
    renderizarCarrinho();
}

// Inicializa o carrinho ao carregar a página
window.onload = renderizarCarrinho;