//export default significa que este archivo exporta un valor por defecto en este caso la interfaces IProduct
//aqui se creo una interfaces con la estructura que debe seguir un objetos que usen esta interfaz
export default interface IProduct {
    id: number;
    title: string;
    price: number;
    stock: number;
    quantity: number;
    thumbnail: string;
}