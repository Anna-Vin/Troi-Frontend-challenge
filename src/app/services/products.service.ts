import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductsReadDto } from "../models/products.dto";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private readonly baseUrl = "https://dummyjson.com/products";
  constructor(private readonly http: HttpClient) {}

  getProducts(
    limit: number,
    skip: number,
    searchPhrase: string
  ): Observable<ProductsReadDto> {
    const params = new HttpParams()
      .set("limit", limit.toString())
      .set("skip", skip.toString())
      .set("q", searchPhrase);

    return this.http.get<ProductsReadDto>(`${this.baseUrl}/search`, {
      params: params,
    });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }
}
