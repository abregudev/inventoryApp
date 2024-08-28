import { defineStore } from 'pinia';
import { ref } from 'vue';
import type IProduct from '../interfaces/IProducts';

interface CartItem extends IProduct {
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([]);

  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart.value = JSON.parse(storedCart);
    }
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  };

  const addToCart = (product: IProduct) => {
    const existingItem = cart.value.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }

    saveCartToLocalStorage();
  };

  const getTotalItems = () => {
    return cart.value.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const clearCart = () => {
    cart.value = [];
    saveCartToLocalStorage();
  };

  loadCartFromLocalStorage();

  return { cart, addToCart, clearCart, getTotalItems };
});
