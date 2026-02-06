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
    ...props
}: InputProps) {
    return (
        <div className="my-2">
            {label && (<label htmlFor={name} className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>)}
            <input
                className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all outline-none text-sm"
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
    ...props
}: TextAreaProps) {
    return (
        <div className="my-2">
            <label htmlFor={name} className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
            <textarea
                id={name}
                className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all outline-none resize-none text-sm"
                name={name}
                {...props}
            />
        </div>
    )
}

export { Input, TextArea };