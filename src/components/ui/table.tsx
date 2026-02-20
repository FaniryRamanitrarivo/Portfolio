import React, { ReactNode } from "react";

// Using a generic type that extends standard HTML attributes 
// This allows the components to accept all native table props (id, style, aria-tags, etc.)
type TableElementProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
    children: ReactNode;
    className?: string;
};

const TableContainer = ({ children, className = '', ...props }: TableElementProps<'table'>) => (
    <div className="w-full overflow-x-auto rounded-lg border border-neutral-200">
        <table className={`w-full text-left text-sm text-neutral-600 ${className}`} {...props}>
            {children}
        </table>
    </div>
);

const TableHeader = ({ children, className = '', ...props }: TableElementProps<'thead'>) => (
    <thead className={`bg-neutral-50 text-xs font-semibold uppercase text-neutral-700 border-b border-neutral-200 ${className}`} {...props}>
        {children}
    </thead>
);

const TableRow = ({ children, className = '', ...props }: TableElementProps<'tr'>) => (
    <tr className={`border-b border-neutral-200 last:border-0 hover:bg-neutral-50/50 transition-colors ${className}`} {...props}>
        {children}
    </tr>
);

const TableTitle = ({ children, className = '', ...props }: TableElementProps<'th'>) => (
    <th className={`px-6 py-4 font-medium whitespace-nowrap ${className}`} {...props}>
        {children}
    </th>
);

const TableBody = ({ children, className = '', ...props }: TableElementProps<'tbody'>) => (
    <tbody className={`divide-y divide-neutral-200 bg-white ${className}`} {...props}>
        {children}
    </tbody>
);

const TableCol = ({ children, className = '', ...props }: TableElementProps<'td'>) => (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
        {children}
    </td>
);

export const Table = {
    Container: TableContainer,
    Header: TableHeader,
    Title: TableTitle,
    Body: TableBody,
    Col: TableCol,
    Row: TableRow,
};