document.addEventListener("DOMContentLoaded", function () {
   let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

   function salvarCarrinho() {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
   }

   function renderizarCarrinho() {
      const container = document.getElementById("itensCarrinho");
      const totalCompra = document.getElementById("totalCompra");

      container.innerHTML = "";
      let total = 0;

      carrinho.forEach((item, index) => {
         total += item.preco;

         const itemDiv = document.createElement("div");
         itemDiv.classList.add("item-carrinho");
         itemDiv.innerHTML = `
            <p>${item.nome} - R$${item.preco.toFixed(2)}</p>
            <button onclick="removerItem(${index})">Remover</button>
         `;
         container.appendChild(itemDiv);
      });

      totalCompra.textContent = `Total: R$${total.toFixed(2)}`;
   }

   window.adicionarAoCarrinho = function (nome, preco) {
      carrinho.push({ nome, preco });
      salvarCarrinho();
      renderizarCarrinho();
   };

   window.removerItem = function (index) {
      carrinho.splice(index, 1);
      salvarCarrinho();
      renderizarCarrinho();
   };

   window.toggleCarrinho = function () {
      const panel = document.getElementById("carrinhoPanel");
      panel.style.display = panel.style.display === "block" ? "none" : "block";
   };

   window.finalizarCompra = function () {
      const resumo = document.getElementById("resumo-pedido");
      const totalPedido = document.getElementById("total-pedido");
      let total = 0;

      resumo.innerHTML = "";
      carrinho.forEach((item) => {
         total += item.preco;
         const li = document.createElement("li");
         li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
         resumo.appendChild(li);
      });

      totalPedido.textContent = `Total: R$${total.toFixed(2)}`;

      mostrarMensagemSucesso(); // ✅ Chamando a função com temporizador
      document.getElementById("carrinhoPanel").style.display = "none";

      carrinho = [];
      salvarCarrinho();
      renderizarCarrinho();
   };

   renderizarCarrinho(); // Exibe o carrinho ao carregar a página
});

// ✅ Função para mostrar e esconder mensagem de sucesso automaticamente
function mostrarMensagemSucesso() {
   const sucesso = document.getElementById("compra-sucesso");
   sucesso.style.display = "block";

   // Esconde após 5 segundos (5000 milissegundos)
   setTimeout(() => {
      sucesso.style.display = "none";
   }, 5000);
}
