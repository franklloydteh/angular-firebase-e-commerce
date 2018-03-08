import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {ShoppingCartService} from "./shopping-cart.service";

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) {
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders')
      .snapshotChanges().map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      });
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
  }
}
