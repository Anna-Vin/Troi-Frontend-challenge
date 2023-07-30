import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent {
  searchTerm = "";
  selectedCategory = "";
  @Input() categories!: { value: string; view: string }[];
  @Output() searchChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();

  onSearchChange(): void {
    this.searchChange.emit(this.searchTerm);
  }

  onCategoryChange(): void {
    this.categoryChange.emit(this.selectedCategory);
  }

  trackByFn(index: number, category: { value: string; view: string }) {
    return category.value;
  }
}
