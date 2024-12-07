export class ProductForm {
  constructor(formId, onSubmit) {
    this.form = document.getElementById(formId);
    this.onSubmit = onSubmit;
    this.setupListeners();
  }

  setupListeners() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const productData = {
      name: formData.get("name"),
      data: {
        color: formData.get("color"),
        price: Number(formData.get("price")) || undefined,
        capacity: formData.get("capacity"),
      },
    };

    await this.onSubmit(productData);
    this.form.reset();
  }

  setEditMode(product) {
    this.form.name.value = product.name;
    if (product.data) {
      this.form.color.value = product.data.color || "";
      this.form.price.value = product.data.price || "";
      this.form.capacity.value = product.data.capacity || "";
    }
    this.form.dataset.editId = product.id;
    document.getElementById("submit-button").textContent = "Изменить товар";
  }

  clearEditMode() {
    this.form.reset();
    delete this.form.dataset.editId;
    document.getElementById("submit-button").textContent = "Создать товар";
  }
}
