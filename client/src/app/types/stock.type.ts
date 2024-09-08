import { Size } from "./size.type"

export type Stock =  {
    "createdAt": Date,
    "updatedAt": Date,
    "deletedAt": Date | null,
    "id": string,
    "quantity": number,
    "size": Size
  }