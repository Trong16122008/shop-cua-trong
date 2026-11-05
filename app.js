// Examples only. Replace with assets actually supported by the agency.
const products = [
  { name: "Bitcoin", symbol: "BTC", category: "Bitcoin", description: "Tài sản số đầu tiên, thường được gọi là BTC.", color: "bitcoin", icon: "₿" },
  { name: "Ethereum", symbol: "ETH", category: "Altcoin", description: "Tài sản gốc của mạng lưới Ethereum.", color: "ethereum", icon: "Ξ" },
  { name: "Tether", symbol: "USDT", category: "Stablecoin", description: "Stablecoin được thiết kế để bám theo giá trị USD.", color: "tether", icon: "₮" },
  { name: "USD Coin", symbol: "USDC", category: "Stablecoin", description: "Stablecoin được thiết kế để bám theo giá trị USD.", color: "usdc", icon: "$" },
  { name: "Solana", symbol: "SOL", category: "Altcoin", description: "Tài sản gốc của mạng lưới Solana.", color: "solana", icon: "S" },
  { name: "BNB", symbol: "BNB", category: "Altcoin", description: "Tài sản số của hệ sinh thái BNB Chain.", color: "bnb", icon: "◆" },
  { name: "XRP", symbol: "XRP", category: "Altcoin", description: "Tài sản số liên kết với sổ cái XRP Ledger.", color: "xrp", icon: "✕" },
  { name: "Toncoin", symbol: "TON", category: "Altcoin", description: "Tài sản gốc của mạng lưới TON.", color: "ton", icon: "◇" },
];

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const count = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const categoryButtons = [...document.querySelectorAll(".category-button")];
let activeCategory = "Tất cả";

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("vi");
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "Tất cả" || product.category === activeCategory;
    const text = `${product.name} ${product.symbol} ${product.category} ${product.description}`.toLocaleLowerCase("vi");
    return matchesCategory && text.includes(query);
  });

  grid.innerHTML = visibleProducts.map((product, index) => `
    <article class="product-card" style="--delay: ${index * 40}ms">
      <div class="product-image image-${product.color}">
        <span class="product-tag">Ví dụ</span>
        <span class="product-illustration" aria-hidden="true">${product.icon}</span>
        <span class="decoration decoration-one" aria-hidden="true">✦</span>
        <span class="decoration decoration-two" aria-hidden="true">✳</span>
        <span class="sample-label">Danh mục tham khảo</span>
      </div>
      <div class="product-info">
        <div class="product-title"><h3>${product.name}</h3><span>${product.symbol}</span></div>
        <p>${product.description}</p><small>${product.category}</small>
      </div>
    </article>
  `).join("");
  count.textContent = `${visibleProducts.length} tài sản`;
  emptyState.hidden = visibleProducts.length !== 0;
  grid.hidden = visibleProducts.length === 0;
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderProducts();
