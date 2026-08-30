import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

type BaseFieldProps = {
    name?: string;
    label?: string;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & BaseFieldProps;

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & BaseFieldProps;

function Input({
    name = "",
    label = "",
    className = "",
    ...props
}: InputProps) {
    return (
        <div className="my-2">
            {label && (<label htmlFor={name} className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>)}
            <input
                className={`w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all outline-none text-sm ${className}`}
                name={name}
                id={name}
                {...props}
            />
        </div>
    )
}

function TextArea({
    name = "",
    label = "",
    className = "",
    ...props
}: TextAreaProps) {
    return (
        <div className="my-2">
            {label && (<label htmlFor={name} className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>)}

            <textarea
                className={`w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all outline-none text-sm ${className}`}
                name={name}
                id={name}
                {...props}
            />
        </div >
    )
}

function Checkbox({
    name = "",
    label = "",
    className = "",
    ...props
}: InputProps) {
    return (
        <label htmlFor={name} className="flex items-center gap-2 my-2 cursor-pointer w-fit">
            <input
                type="checkbox"
                className={`h-4 w-4 rounded border-neutral-300 text-accent-600 focus:ring-accent-500 ${className}`}
                name={name}
                id={name}
                {...props}
            />
            {label && (<span className="text-sm font-medium text-neutral-700">{label}</span>)}
        </label>
    )
}

export { Input, TextArea, Checkbox };