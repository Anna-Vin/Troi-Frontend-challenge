import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.scss"],
})
export class StarComponent implements OnChanges {
  @Input() filled!: number;
  @Input() index!: number;

  isHalf = false;
  isFull = false;
  partialFill = "0%";

  ngOnChanges(): void {
    this.isHalf = this.filled > this.index && this.filled < this.index + 1;
    this.isFull = this.filled >= this.index + 1;

    if (this.isFull) {
      this.partialFill = "100%";
    } else if (this.isHalf) {
      this.partialFill = (this.filled - this.index) * 100 + "%";
    } else {
      this.partialFill = "0%";
    }
  }
}
