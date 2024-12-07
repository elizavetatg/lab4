import { deleteProduct } from "../api.js";

export const renderProduct = (product) => {
  const productCard = document.createElement("div");
  productCard.className = "product-card";

  const keyTranslations = {
    color: "Цвет",
    price: "Цена",
    capacity: "Объем",
  };

  const productContent = `
    <h3 class="product-name">${product.name}</h3>
    ${
      product.data
        ? `
      <div class="product-details">
        ${Object.entries(product.data)
          .map(
            ([key, value]) => `
            <p class="product-detail">
              <span class="detail-label">${keyTranslations[key] || key}:</span>
              ${value}${key === "price" ? " ₽" : ""}
            </p>
          `
          )
          .join("")}
      </div>
    `
        : ""
    }
    <div class="product-actions">
      <button class="edit-button" data-id="${product.id}">Изменить</button>
      <button class="delete-button" data-id="${product.id}">Удалить</button>
    </div>
  `;

  productCard.innerHTML = productContent;

  const deleteButton = productCard.querySelector(".delete-button");
  deleteButton?.addEventListener("click", async (e) => {
    try {
      const id = e.currentTarget.getAttribute("data-id");
      if (!id) return;

      await deleteProduct(id);
      productCard.remove();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Ошибка при удалении товара");
    }
  });

  return productCard;
};
