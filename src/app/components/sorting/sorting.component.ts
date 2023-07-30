import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-sorting",
  templateUrl: "./sorting.component.html",
  styleUrls: ["./sorting.component.scss"],
})
export class SortingComponent {
  activeSort: string | null = null;
  isAscending = false;
  @Output() sortChange = new EventEmitter<{
    sortKey: string | null;
    isAscending: boolean;
  }>();

  onSort(sortKey: string) {
    if (this.activeSort === sortKey) {
      if (this.isAscending) {
        // Third click: reset the sort
        this.activeSort = null;
        this.isAscending = false;
        this.sortChange.emit({ sortKey: null, isAscending: false }); // emit an event to reset sorting in parent component
      } else {
        // Second click: toggle to ascending
        this.isAscending = true;
        this.sortChange.emit({ sortKey, isAscending: this.isAscending });
      }
    } else {
      // First click: set active sort and descending order
      this.activeSort = sortKey;
      this.isAscending = false;
      this.sortChange.emit({ sortKey, isAscending: this.isAscending });
    }
  }
}
