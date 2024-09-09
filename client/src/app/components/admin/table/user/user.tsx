

// interface TableRow {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   createdAt?: string;
// }

import { FC } from "react";

// const data: TableRow[] = [
//   { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", createdAt: "2021-10-01" },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     role: "Editor",
//     createdAt: "2021-10-01",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     role: "Viewer",
//     createdAt: "2021-10-02",
//   },
//   // Ajoute plus de lignes de données ici si nécessaire
// ];

interface IProps {
  data: [];
}

export const AdminUserTable: FC<IProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-gray-600"></th>
            <th className="py-2 px-4 text-left text-gray-600">Username</th>
            <th className="py-2 px-4 text-left text-gray-600">Email</th>
            <th className="py-2 px-4 text-left text-gray-600">Role</th>
            <th className="py-2 px-4 text-left text-gray-600">Created at</th>
            <th className="py-2 px-4 text-left text-gray-600"></th>
            <th className="py-2 px-4 text-left text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index) => (
            <tr key={row.id} className="border-b">
              <td className="py-2 px-4 text-gray-700 text-sm">{index+1}</td>
              <td className="py-2 px-4 text-gray-700 text-sm">{row.username}</td>
              <td className="py-2 px-4 text-gray-700 text-sm">{row.email}</td>
              <td className="py-2 px-4 text-gray-700 text-sm">{row.roles}</td>
              <td className="py-2 px-4 text-gray-700 text-sm">{row.createdAt}</td>
              <td className="py-2 px-4 text-gray-700 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </td>
              <td className="py-2 px-4 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};