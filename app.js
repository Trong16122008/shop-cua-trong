// Replace this sample catalog with the shop's real products before publishing.
const products = [
  { name: "Bình giữ nhiệt Mầm Xanh", category: "Đồ dùng", price: "189.000đ", description: "Bình nước nhỏ gọn, đồng hành cùng bạn cả ngày.", color: "mint", icon: "◒", tag: "Món xinh" },
  { name: "Túi vải Đi Muôn Nơi", category: "Phụ kiện", price: "129.000đ", description: "Túi vải nhẹ nhàng cho những chuyến đi gần xa.", color: "peach", icon: "▱", tag: "Dùng mỗi ngày" },
  { name: "Đèn ngủ Nắng Muộn", category: "Trang trí", price: "245.000đ", description: "Một ánh đèn ấm áp cho góc phòng thêm dịu dàng.", color: "butter", icon: "☼", tag: "Góc nhỏ" },
  { name: "Ốp lưng Sắc Màu", category: "Phụ kiện", price: "99.000đ", description: "Thêm chút sắc màu vui mắt cho chiếc điện thoại.", color: "lilac", icon: "▯", tag: "Món xinh" },
  { name: "Khay đựng Lặt Vặt", category: "Đồ dùng", price: "79.000đ", description: "Gom chìa khóa, kẹp tóc và những món nho nhỏ.", color: "blue", icon: "⌑", tag: "Gọn gàng" },
  { name: "Bộ sticker Ngày Vui", category: "Khác", price: "39.000đ", description: "Những hình dán vui vui cho sổ tay và laptop.", color: "pink", icon: "✿", tag: "Dễ thương" },
  { name: "Chậu cây Bé Xíu", category: "Trang trí", price: "115.000đ", description: "Điểm xanh nho nhỏ cho bàn làm việc thêm tươi.", color: "sage", icon: "♧", tag: "Góc xanh" },
  { name: "Móc khóa Mây Nhỏ", category: "Phụ kiện", price: "55.000đ", description: "Một món phụ kiện xinh để tìm chìa khóa dễ hơn.", color: "lavender", icon: "☁", tag: "Món xinh" },
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
    const text = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase("vi");
    return matchesCategory && text.includes(query);
  });

  grid.innerHTML = visibleProducts.map((product, index) => `
    <article class="product-card" style="--delay: ${index * 40}ms">
      <div class="product-image image-${product.color}">
        <span class="product-tag">${product.tag}</span>
        <span class="product-illustration" aria-hidden="true">${product.icon}</span>
        <span class="decoration decoration-one" aria-hidden="true">✦</span>
        <span class="decoration decoration-two" aria-hidden="true">✳</span>
        <span class="sample-label">Ảnh minh họa</span>
      </div>
      <div class="product-info">
        <div class="product-title"><h3>${product.name}</h3><span>${product.price}</span></div>
        <p>${product.description}</p><small>${product.category}</small>
      </div>
    </article>
  `).join("");
  count.textContent = `${visibleProducts.length} món đồ`;
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
