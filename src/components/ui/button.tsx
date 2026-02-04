import { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
    children?: ReactNode;
}


export default function Button({ className, children }: ButtonProps) {
    return(
        <button 
            className={`w-full flex px-6 sm:px-8 py-3 sm:py-4 font-medium rounded-lg transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap ${className}`}
            >
            {children}
        </button>
    )
}