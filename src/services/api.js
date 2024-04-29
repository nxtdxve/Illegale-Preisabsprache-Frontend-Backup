const baseURL = "https://api.zettler.dev";

// Fetch retailers
export const fetchRetailers = async () => {
  try {
    const response = await fetch(`${baseURL}/retailers`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch retailers:", error);
    throw error;
  }
};

// Fetch products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${baseURL}/products`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${baseURL}/products/${productId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product with ID ${productId}:`, error);
    throw error;
  }
};

// Subscribe to price changes
export const subscribeToPriceChanges = async (productId, email) => {
  try {
    const response = await fetch(`${baseURL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId, email: email }),
    });
    if (!response.ok) {
      throw new Error("Failed to subscribe to price changes");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to subscribe:", error);
    throw error;
  }
};

// Unsubscribe from product updates
export const unsubscribeFromPriceChanges = async (productId, email) => {
  try {
    const response = await fetch(`${baseURL}/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId, email: email }),
    });
    if (!response.ok) {
      throw new Error("Failed to unsubscribe from price changes");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to unsubscribe:", error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${baseURL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
};
