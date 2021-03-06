import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {OrderService} from "../services/order.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Order} from "../models/order";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string;
  subscription: Subscription;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private router: Router) {
  }

  async ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }

}
