const API_URL = "https://api.restful-api.dev/objects";
const CREATED_PRODUCTS_KEY = "createdProductIds";

const getCreatedProductIds = () => {
  const ids = localStorage.getItem(CREATED_PRODUCTS_KEY);
  return ids ? JSON.parse(ids) : [];
};

const saveProductId = (id) => {
  const ids = getCreatedProductIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(CREATED_PRODUCTS_KEY, JSON.stringify(ids));
  }
};

export const getProducts = async () => {
  try {
    const createdIds = getCreatedProductIds();

    if (createdIds.length === 0) {
      return [];
    }

    const params = createdIds.map((id) => `id=${id}`).join("&");
    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) throw new Error("Не удалось загрузить товары");
    return await response.json();
  } catch (error) {
    throw new Error(`Ошибка при загрузке товаров: ${error.message}`);
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Не удалось создать товар");
    const newProduct = await response.json();

    saveProductId(newProduct.id);
    return newProduct;
  } catch (error) {
    throw new Error(`Ошибка при создании товара: ${error.message}`);
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Не удалось обновить товар");
    return await response.json();
  } catch (error) {
    throw new Error(`Ошибка при обновлении товара: ${error.message}`);
  }
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Не удалось удалить товар");
  }
};
