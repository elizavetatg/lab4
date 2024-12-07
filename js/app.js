import {
  getProducts,
  createProduct,
  updateProduct,
} from "./api.js";
import { ProductList } from "./components/ProductList.js";
import { ProductForm } from "./components/ProductForm.js";

class App {
  constructor() {
    this.productList = new ProductList("product-list");
    this.productForm = new ProductForm(
      "product-form",
      this.handleProductSubmit.bind(this)
    );
    this.loadingElement = document.getElementById("loading");
    this.errorElement = document.getElementById("error");

    this.setupEventListeners();
    this.loadProducts();
  }

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-button")) {
        this.handleEditClick(e.target.dataset.id);
      }
    });
  }

  async handleProductSubmit(productData) {
    try {
      this.showLoading();
      const formElement = document.getElementById("product-form");
      const editId = formElement.dataset.editId;

      if (editId) {
        await updateProduct(editId, productData);
        this.productForm.clearEditMode();
      } else {
        await createProduct(productData);
      }

      await this.loadProducts();
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.hideLoading();
    }
  }

  async handleEditClick(productId) {
    try {
      this.showLoading();
      const products = await getProducts();
      const product = products.find((p) => p.id === productId);
      if (product) {
        this.productForm.setEditMode(product);
      }
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.hideLoading();
    }
  }

  async loadProducts() {
    try {
      this.showLoading();
      const products = await getProducts();
      this.productList.render(products);
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.hideLoading();
    }
  }

  showLoading() {
    this.loadingElement.style.display = "block";
    this.errorElement.style.display = "none";
  }

  hideLoading() {
    this.loadingElement.style.display = "none";
  }

  showError(message) {
    this.errorElement.textContent = message;
    this.errorElement.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
