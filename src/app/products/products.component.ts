import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/products";
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;

  constructor(private route: ActivatedRoute,
              private cartService: ShoppingCartService,
              private productService: ProductService) {

    productService.getAll()
      .switchMap(products => {
        this.products = this.filteredProducts = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
  }

  private applyFilter(){
    this.filteredProducts = (this.category)
      ? this.products.filter(p => p.category === this.category)
      : this.products;
  }

}
