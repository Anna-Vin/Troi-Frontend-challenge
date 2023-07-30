import { Component, Input } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  @Input() products!: Product[];

  trackByFn(index: number, product: Product): number {
    return product.id;
  }
}
