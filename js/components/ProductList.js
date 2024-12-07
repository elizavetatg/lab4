import { renderProduct } from "./Product.js";

export class ProductList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(products) {
    this.container.innerHTML = "";
    products.forEach((product) => {
      const productElement = renderProduct(product);
      this.container.appendChild(productElement);
    });
  }
}
