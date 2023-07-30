import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { SortingComponent } from "./components/sorting/sorting.component";
import { ProductComponent } from "./components/product/product.component";
import { StarComponent } from "./components/star/star.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    SortingComponent,
    ProductComponent,
    StarComponent,
    ProductListComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
