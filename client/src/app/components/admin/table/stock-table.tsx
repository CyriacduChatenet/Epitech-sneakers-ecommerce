import { Dispatch, FC, SetStateAction } from "react";

import { Stock } from "../../../types/stock.type";

interface IProps {
    data: Stock[];
    setData: Dispatch<SetStateAction<Stock[]>>
  }

export const StockTable: FC<IProps> = ({ data }) => {

  return (
    <>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 w-2/10 text-left"></th>
            <th className="p-2 w-2/10 text-left">Name</th>
            <th className="p-2 w-2/10 text-left">Size</th>
            <th className="p-2 w-3/10 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item: Stock, index: number) => (
            <tr className="border-t">
              <td className="p-2 w-2/10">{index + 1}</td>
              <td className="p-2 w-3/10">{item.sneaker.name}</td>
              <td className="p-2 w-3/10">{item.size.size}</td>
              <td className="p-2 w-3/10 text-gray-500">{item.quantity}</td>
            </tr>
          )) : <p className="ml-6 py-4">No stocks found here !</p>}
        </tbody>
      </table>
    </>
  );
};
