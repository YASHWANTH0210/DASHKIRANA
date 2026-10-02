import { Product, Category, Order, Customer, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS, INITIAL_CUSTOMERS } from '../data/mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'dashkirana_products',
  CATEGORIES: 'dashkirana_categories',
  ORDERS: 'dashkirana_orders',
  CUSTOMERS: 'dashkirana_customers',
};

// Initialize Mock Storage if empty
function initializeStorage() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(INITIAL_CUSTOMERS));
  }
}

// Products API
export async function getProducts(): Promise<Product[]> {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : INITIAL_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

export async function searchProducts(query: string, category?: string): Promise<Product[]> {
  let products = await getProducts();
  products = products.filter((p) => p.active);

  if (category && category !== 'All') {
    products = products.filter((p) => p.category === category);
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    products = products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }

  return products;
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const products = await getProducts();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.unshift(newProduct);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return products[index];
}

export async function updateStock(id: string, stock: number): Promise<Product | null> {
  return updateProduct(id, { stock });
}

// Categories API
export async function getCategories(): Promise<Category[]> {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : INITIAL_CATEGORIES;
}

// Orders API
export async function getOrders(): Promise<Order[]> {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : INITIAL_ORDERS;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await getOrders();
  return orders.find((o) => o.id === id) || null;
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Order> {
  const orders = await getOrders();
  const newOrder: Order = {
    ...orderData,
    id: `DK${Math.floor(10000 + Math.random() * 90000)}`,
    status: 'Placed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  const orders = await getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  orders[index].status = status;
  orders[index].updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return orders[index];
}

// Customers API
export async function getCustomers(): Promise<Customer[]> {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  return data ? JSON.parse(data) : INITIAL_CUSTOMERS;
}
