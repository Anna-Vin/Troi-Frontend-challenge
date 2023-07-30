import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductsService } from "./services/products.service";
import {
  BehaviorSubject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs";
import { Product } from "./models/product.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  private searchTerm = new BehaviorSubject<string>("");
  productsSub!: Subscription;
  categoriesSub!: Subscription;
  initialProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories!: { value: string; view: string }[];
  activeSort: string | null = null;
  isAscending = false;
  category!: string;
  limit = 10;
  limitDisplay = 10;
  page = 1;
  pages: number[] = [];
  pageRange: number[] = [];
  total = 0;
  filteredTotal = 0;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productsSub = this.searchTerm
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term: string) => {
          const skip = (this.page - 1) * this.limit;
          return this.productsService.getProducts(this.limit, skip, term);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.total = res.total;
          this.initialProducts = res.products;
          this.filteredProducts = res.products;
          this.filteredTotal = this.filteredProducts.length;
          const totalPages = Math.ceil(this.total / this.limit);
          const filteredPages = Math.ceil(this.filteredTotal / this.limit);
          if (this.category) {
            this.pages = Array.from({ length: filteredPages }, (_, i) => i + 1);
          } else {
            this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
          }

          this.updatePageRange();
          this.onCategoryChange(this.category);
        }
      });
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe((res) => {
      if (res) {
        this.categories = res.map((category) => {
          const transformedCategory = category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return {
            value: category,
            view: transformedCategory,
          };
        });
      }
    });
  }

  updatePageRange(): void {
    let start = Math.max(this.page - 2, 1);
    let end = Math.min(start + 4, this.pages.length);

    // Ensure that we always show up to 5 pages
    if (this.pages.length < 5) {
      start = 1;
      end = this.pages.length;
    } else if (this.page < 3) {
      start = 1;
      end = 5;
    } else if (this.page > this.pages.length - 2) {
      start = this.pages.length - 4;
      end = this.pages.length;
    }

    this.pageRange = this.pages.slice(start - 1, end);
  }

  changePage(page: number): void {
    if (page === this.page) {
      return;
    }
    this.page = page;
    this.loadProducts();
  }

  changeLimit(limit: number): void {
    this.limit = limit;
    this.page = 1;
    this.loadProducts();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.changePage(this.page - 1);
    }
  }

  nextPage(): void {
    if (this.page < this.pages.length) {
      this.changePage(this.page + 1);
    }
  }

  onSearchChange(searchTerm: string): void {
    this.page = 1;
    this.searchTerm.next(searchTerm);
    this.sortProducts();
  }

  onCategoryChange(category: string): void {
    if (category) {
      this.category = category;
      this.filteredProducts = this.initialProducts.filter(
        (product) => product.category === category
      );
      this.page = 1;
      const totalPages = Math.ceil(this.filteredTotal / this.limit);
      this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      this.updatePageRange();
    } else {
      this.filteredProducts = this.initialProducts;
    }
    this.filteredTotal = this.filteredProducts.length;
    if (this.filteredTotal < this.limit) {
      this.limitDisplay = this.filteredTotal;
    } else {
      this.limitDisplay = this.limit;
    }

    this.sortProducts();
  }

  onSortChange(sort: { sortKey: string | null; isAscending: boolean }) {
    this.activeSort = sort.sortKey;
    this.isAscending = sort.isAscending;
    this.sortProducts();
  }

  sortProducts() {
    if (this.activeSort) {
      this.filteredProducts.sort((a, b) => {
        const fieldA = a[this.activeSort as keyof Product];
        const fieldB = b[this.activeSort as keyof Product];

        if (fieldA < fieldB) {
          return this.isAscending ? -1 : 1;
        }
        if (fieldA > fieldB) {
          return this.isAscending ? 1 : -1;
        }
        return 0;
      });
    }
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }
}
