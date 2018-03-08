import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Subscription} from "rxjs/Subscription";
import {Product} from "../models/products";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
    });
  }

  filter(q) {
    this.filteredProducts = (q)
      ? this.products.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
      : this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
