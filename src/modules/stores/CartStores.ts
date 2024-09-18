//defineStore de pinia se utiliza para definir una nueva tienda que manejarà el estado global
import { defineStore } from 'pinia';
//Para crear variables reactivas 
import { ref } from 'vue';
//Es una interfaz que define como debe lucir un producto 
import type IProduct from '../interfaces/IProducts';

//Ests interfaz exteinde la interfaz IProduct y añade la propiedad quantity, que es la cantidad en el carrito
interface CartItem extends IProduct {
  quantity: number;
}
//Defines una tienda de pinia llamada cart el segundo argumento es una funciòn 
export const useCartStore = defineStore('cart', () => {
  //creas una variable reactiva cart  que es un array de cartItem. Inicia como un array vacio
  //donde cada elemento sera un producto con su cantidad.
  const cart = ref<CartItem[]>([]);

  //Delara una funciǹ llamada loadCartFromLocalStorage 
  const loadCartFromLocalStorage = () => {
    //Se declara una constante storedCart 
    const storedCart = localStorage.getItem('cart');// Se usa localStorage.getItem('cart') para intentar recuperar un item llamado 'cart' del almacenamiento local del navegador.
    //si encuentra un carrito almacenado lo convierte en una cadena string a un array de objetos 
    if (storedCart) {
      //Usa JSON.parse para convertir la cadena json almacenada en storedCart de vuelta a un objeto array 
      cart.value = JSON.parse(storedCart);//Asigna este valor parseado a cart.value 
    }
  };
  //guarda el carrito actual en localStorage 
  const saveCartToLocalStorage = () => {
    //Convierte el contenido de cart a una cadena usuando JSON.stringify y lo almacena bajo la clave cart
    localStorage.setItem('cart', JSON.stringify(cart.value));
  };

  //Aquì defines una funciòn llamada addToCart que rcibem¡n argumento producto de tipo IProduct 
  const addToCart = (product: IProduct) => {
    //cart.value hace referencia al carrito de compras 
    //find es un metodo que busca dentro de un array el primer elemento
    //item => item.id === product.id: Esta es la condición de búsqueda. Compara el id de cada item con el id del product que estamos intentando agregar.

    const existingItem = cart.value.find(item => item.id === product.id);//si encuentra un producto con el mismo id lo devuelve y lo guarda en existingItem
    //Aquì se verifica si el producto ya existe en el carrito
    if (existingItem) {
      existingItem.quantity += 1;//se imcrementa en 1 la cantidad del producto en el carrito
    } else {//sino existe lo añade uno nuevo al carrito
      cart.value.push({ ...product, quantity: 1 });
    }
    //finalmente se llama a esta funcion para guardar el carrito actualizado en el localStorage del navegador
    saveCartToLocalStorage();
  };

  // Reduce la cantidad del producto
  const decreaseQuantity = (product: IProduct) => {
    const existingItem = cart.value.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        clearItemCart(product.id);
      }
      saveCartToLocalStorage();
    }
  };

  //creamos una funciòn en la cual se utiliza reduce para sumar las cantidades de todos los productos en el carrito y retorna el numero total de productos
  const getTotalItems = () => {
    return cart.value.reduce((total, item) => total + (item.quantity || 0), 0);
  };
  //Esta funciòn limpia el carrito asignando un array vacio
  const clearCart = () => {
    cart.value = [];
    saveCartToLocalStorage();//guarda el estado vacio en el local storage
  };

  const clearItemCart = (id: number) => {
    cart.value = cart.value.filter(item => item.id !== id);
    console.log(cart.value)
    saveCartToLocalStorage();//guarda el estado vacio en el local storage
  };

  //llama a la funciòn para inmediatamente cargaar el estado del carrito desde el localStorage cuando se inicializa la tienda
  loadCartFromLocalStorage();
  //retorna las propiedades y funciones que podràn ser utilizadas fuera de la tienda
  return { cart, addToCart, clearCart, getTotalItems, clearItemCart, decreaseQuantity };
  //cart-> el carrito actual
  //addToCart -> funcion para agregar un poroducto al carrito
  // clearCart -> Funciòn para limpiar el carrito
  //getTotalItems -> funciona para obtener el numero total del carrito
});
