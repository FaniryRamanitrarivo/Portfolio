import { ReactNode } from "react";

type TableProps = {
    children: ReactNode;
    className?: string;
}

function TableContainer({ children, className = '' }: TableProps) {
    return (
        <table className={`w-full ${className}`}>
            {children}
        </table>
    )
}

function TableHeader({ children, className = '' }: TableProps) {
    return (
        <thead className={`bg-neutral-50 border-b border-neutral-200 ${className}`}>
            {children}
        </thead>
    )
}

function TableTitle({ children, className = '' }: TableProps) {
    return (
        <th className={`px-6 py-4 ${className}`}>
            {children}
        </th>
    )
}

function TableRow({ children, className = '' }: TableProps) {
    return (
        <tr className={`hover:bg-neutral-50 transition-colors ${className}`}>
            {children}
        </tr>
    )
}

function TableBody({ children, className = '' }: TableProps) {
    return (
        <tbody className={`divide-y divide-neutral-200 ${className}`}>
            {children}
        </tbody>
    )
}

function TableCol({ children, className = '' }: TableProps) {
    return (
        <td className={`px-6 py-4 ${className}`}>
            {children}
        </td>
    )
}

export const Table = {
    Container: TableContainer,
    Header: TableHeader,
    Title: TableTitle,
    Body: TableBody,
    Col: TableCol,
    Row: TableRow,
};