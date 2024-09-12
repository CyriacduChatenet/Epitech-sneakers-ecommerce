import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Size } from "../../../types/size.type";
import SizeService from "../../../services/size.service";

interface IProps {
  edit: boolean;
  size?: Size;
  setState?: Dispatch<SetStateAction<Size[]>>
}

interface SizeFormData {
  size: string;
}

export const AdminSizeForm: FC<IProps> = ({ edit, size, setState }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SizeFormData>();

  const sizeService = new SizeService();

  const onSubmit = async (data: SizeFormData) => {
    if (size && edit && setState) {
      const updatedsize = await sizeService.update(size.id ?? '', data);
      if (updatedsize) {
        setState((prev) =>
          prev.map((u) => (u.id === size.id ? updatedsize : u) as Size)
        );
      }
    } else {
      const newsize = await sizeService.create(data);
      if (newsize && setState) {
        setState((prev) => [...prev, newsize.data]);
      }
    }
  };

  useEffect(() => {
    if (size && edit) {
      setValue("size", size.size);
    }
  }, [size, setValue]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="size"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          size
        </label>
        <div className="mt-2">
          <input
            id="size"
            type="text"
            {...register("size", { required: true })}
            autoComplete="size"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          {errors.size && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          {edit ? "Edit size" : "Add new size"}
        </button>
      </div>
    </form>
  );
};
