import { Input } from "./input";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FieldArrayPath, FieldErrors, FieldValues, Path, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";


interface Props<
    T extends FieldValues,
    N extends FieldArrayPath<T>
> {
    title: string;
    name: N;
    placeholder?: string;
    fieldArray: UseFieldArrayReturn<T, N, "id">;
    register: UseFormRegister<T>;
    errors?: FieldErrors<T>;
}

export default function MultipleInput<
    T extends FieldValues,
    N extends FieldArrayPath<T>
>({
    title,
    name,
    placeholder,
    fieldArray,
    register,
    errors = {}
}: Props<T, N>) {

    const { fields, append, remove } = fieldArray;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-6">{title}</h2>
            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div className="w-full flex items-center space-x-2" key={field.id}>
                        <div className="flex-1">
                            <Input
                                placeholder={placeholder}
                                // onChange={(e) => handleChange(index, e.target.value)}
                                {...register(`${name}.${index}.value` as Path<T>)}
                            />
                        </div>
                        <button type="button"
                            onClick={() => remove(index)}
                            className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex-shrink-0">
                            <IoClose size={18} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ value: "" } as T[N][number])}
                    className="px-4 py-2 flex items-center text-sm text-accent-600 hover:bg-accent-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                    <IoMdAdd className="inline-block mr-1" />
                    <span>Add Result</span>
                </button>
            </div>

            {errors[name]?.message && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                    {String(errors[name]?.message)}
                </p>
            )}

            {Array.isArray(errors[name]) &&
                (errors[name] as any[]).map((err, i) =>
                    err?.value?.message ? (
                        <p key={i} className="text-red-500 text-sm mt-1">
                            {title} #{i + 1}: {err.value.message}
                        </p>
                    ) : null
                )}

        </div>
    )
}
