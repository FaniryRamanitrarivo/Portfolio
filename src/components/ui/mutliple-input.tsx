import { Input } from "./input";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FieldArrayPath, FieldErrors, FieldValues, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";


interface Props<T extends FieldValues> {
    title: string;
    name: string; // Plus précis que ArrayPath
    placeholder?: string;
    fieldArray: UseFieldArrayReturn<T, FieldArrayPath<T>, "id">;
    register: UseFormRegister<T>;
    // On utilise FieldErrors<T> pour extraire exactement la structure liée au champ 'name'
    errors?: FieldErrors<T>;
}

export default function MultipleInput<T extends FieldValues>({
    title,
    name,
    placeholder,
    fieldArray,
    register,
    errors = {}
}: Props<T>) {

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
                                {...register(`${name}.${index}`)}
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
                    onClick={() => append("")}
                    className="px-4 py-2 flex items-center text-sm text-accent-600 hover:bg-accent-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                    <IoMdAdd className="inline-block mr-1" />
                    <span>Add Result</span>
                </button>
            </div>

            {errors[name]?.message && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                    {/* On s'assure que le message est une string */}
                    {String(errors[name]?.message)}
                </p>
            )}

            {Array.isArray(errors[name]) &&
                errors[name].map((err, i) =>
                    err.message ? (
                        <p key={i} className="text-red-500 text-sm">
                            Challenge #{i + 1}: {err.message}
                        </p>
                    ) : null
                )}

        </div>
    )
}
