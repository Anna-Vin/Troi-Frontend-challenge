import { Component, Input } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent {
  @Input() product!: Product;

  get discountedPrice(): number {
    const discountedPrice =
      this.product.price -
      (this.product.price * this.product.discountPercentage) / 100;

    return Number(discountedPrice.toFixed(2));
  }
}
