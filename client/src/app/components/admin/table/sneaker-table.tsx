import { Dispatch, FC, SetStateAction } from "react";

import { Sneaker } from "../../../types/sneaker.type";
import SneakerService from "../../../services/sneaker.service";

interface IProps {
    data: Sneaker[];
    setData: Dispatch<SetStateAction<Sneaker[]>>
  }

export const SneakerTable: FC<IProps> = ({ data, setData }) => {

  const sneakerService = new SneakerService();

  const deleteSneaker = async (id: string) => {
    await sneakerService.delete(id);
    setData(data.filter((Sneaker: Sneaker) => Sneaker.id !== id));
  }

  return (
    <>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 w-2/10 text-left"></th>
            <th className="p-2 w-2/10 text-left">Name</th>
            <th className="p-2 w-1/10 text-left">Brand</th>
            <th className="p-2 w-1/10 text-left">Gender</th>
            <th className="p-2 w-2/10 text-left">Release year</th>
            <th className="p-2 w-2/10 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item: Sneaker, index: number) => (
            <tr className="border-t">
              <td className="p-2 w-2/10">{index + 1}</td>
              <td className="p-2 w-2/10">{item.name}</td>
              <td className="p-2 w-2/10 text-gray-500">{item.brand}</td>
              <td className="p-2 w-2/10 text-gray-500">{item.gender}</td>
              <td className="p-2 w-2/10 text-gray-500">{item.releaseYear}</td>
              <td className="p-2 w-1/10">
                <button className="flex justify-center items-center" onClick={() => deleteSneaker(item.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          )) : <p className="ml-6 py-4">No Sneakers found here !</p>}
        </tbody>
      </table>
    </>
  );
};
