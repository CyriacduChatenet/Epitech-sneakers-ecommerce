import { Size } from "./size.type"
import { Sneaker } from "./sneaker.type"

export type Stock =  {
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
    id: string,
    quantity: number,
    size: Size,
    sneaker: Sneaker
  }