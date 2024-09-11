import { Dispatch, FC, SetStateAction, useState } from "react";

import { User } from "../../../types/user.type";
import { Modal } from "../../common/modal/modal";
import UserService from "../../../services/user.service";
import { AdminUserForm } from "../forms/user-form";

interface IProps {
    data: User[];
    setData: Dispatch<SetStateAction<User[]>>
  }

export const UserTable: FC<IProps> = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const userService = new UserService();

  const deleteUser = async (id: string) => {
    await userService.delete(id);
    setData(data.filter((user: User) => user.id !== id));
  }

  const editUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  }

  return (
    <>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 w-2/10 text-left"></th>
            <th className="p-2 w-2/10 text-left">Username</th>
            <th className="p-2 w-2/10 text-left">Email</th>
            <th className="p-2 w-2/10 text-left">Role</th>
            <th className="p-2 w-1/10 text-left"></th>
            <th className="p-2 w-1/10 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((user: User, index: number) => (
            <tr className="border-t">
              <td className="p-2 w-2/10">{index + 1}</td>
              <td className="p-2 w-2/10">{user.username}</td>
              <td className="p-2 w-2/10 text-gray-500">{user.email}</td>
              <td className="p-2 w-2/10 text-gray-500">{user.roles}</td>
              <td className="p-2 w-1/10">
                <button
                  onClick={() => editUser(user)}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Edit
                </button>
              </td>
              <td className="p-2 w-1/10">
                <button className="flex justify-center items-center" onClick={() => deleteUser(user.id)}>
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
          )) : <p className="ml-6 py-4">No users found here !</p>}
        </tbody>
      </table>
      {showModal ? (
        <Modal title="Edit user">
          <AdminUserForm edit={true} user={selectedUser} />
        </Modal>
      ) : null}
    </>
  );
};
