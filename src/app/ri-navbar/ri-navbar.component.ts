import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {AppUser} from "../models/app.user";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Observable} from "rxjs/Observable";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'ri-navbar',
  templateUrl: './ri-navbar.component.html',
  styleUrls: ['./ri-navbar.component.css']
})
export class RiNavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService,
              private cartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
