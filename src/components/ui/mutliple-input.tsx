import { InputHTMLAttributes, ReactEventHandler, ReactNode, useState } from "react";
import { Input } from "./input";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form";


type Props = {
    title: string;
    name: string;
    placeholder?: string;
    fieldArray: UseFieldArrayReturn<any, any>;
    register: UseFormRegister<any>;
};

export default function MultipleInput({
    title,
    name,
    placeholder,
    fieldArray,
    register,
}: Props) {

    const { fields, append, remove } = fieldArray;

    // const handleChange = (index: number, value: string) => {
    //     const newValues = [...values];
    //     newValues[index] = value;
    //     setValues(newValues);
    // }

    // const handleAdd = () => {
    //     setValues([...values, ""]);
    // };

    // const handleRemove = (index: number) => {
    //     setValues(values.filter((_, i) => i !== index));
    // };

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
        </div>
    )
}
