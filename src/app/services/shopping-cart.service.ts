import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Product} from "../models/products";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {ShoppingCart} from "../models/shopping-cart";
import {ShoppingCartItem} from "../models/shopping-cart-item";

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe((item: ShoppingCartItem) => {
      if (item)
        item$.update({quantity: item.quantity + 1});
      else
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        });
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .map((cart: { items: {} }) => new ShoppingCart(cart.items));
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe((item: ShoppingCartItem) => {
      if (item) {
        let q = item.quantity - 1;
        if (q > 0)
          item$.update({quantity: q});
        else
          item$.remove();
      }
    })
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
}
