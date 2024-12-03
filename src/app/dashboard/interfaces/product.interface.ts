export interface Product {
  _id?: string;
  name: string;
  brand: Brand;
  priceBuy: number;
  priceSale: number;
  size: string;
  stock: number;
  imageUrl: string;
}

export enum Brand{
  Nike = "Nike",
  Puma = "Puma",
  Adidas = "Adidas",
  Rebook = "Rebook"
}
