import {ShoppingCartItem} from "./shopping-cart-item";
import {Product} from "./products";

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({...item, key:productId}));
    }
  }

  getQuantity(product: Product) {
    this.itemsMap = this.itemsMap || {};
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let i in this.items) {
      sum += this.items[i].totalPrice
    }
    return sum;
  }

  get totalItemsCount() {
    let shoppingCartItemCount = 0;
    for (let i in this.items) {
      shoppingCartItemCount += this.items[i].quantity
    }
    return shoppingCartItemCount;
  }
}
