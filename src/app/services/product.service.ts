import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  get(productId: string) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: string, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
