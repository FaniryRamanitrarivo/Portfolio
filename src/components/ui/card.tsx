import { cloneElement, ReactElement, ReactNode } from "react";

type CardIconProps = {
    children: ReactElement<{ className?: string }>;
    className?: string;
    parentClassName?: string;
};

type CardChildrenProps = {
    children: ReactNode;
    className?: string;
};

type CardLinkProps = {
    link: string;
    className?: string
}

// function CardContainer({ children }: CardChildrenProps) {
//     return(
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {children}
//         </div>
//     )
// } 

function CardContainer({ children, className }: CardChildrenProps) {
    return(
        <div className={`group relative bg-white rounded-2xl p-6 sm:p-8 border 
            transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer sm:col-span-2 lg:col-span-1 ${className ?? ''}`}>
            {children}
        </div>
    )
} 

function CardIcon({ children, parentClassName, className }: CardIconProps) {
    return (
        <div className={`w-14 h-14 flex items-center justify-center bg-accent-100 rounded-xl mb-6 group-hover:bg-accent-600 transition-colors ${parentClassName ?? ''}`}>
            {cloneElement(children, {
                className: `text-2xl text-accent-600 group-hover:text-white transition-colors ${className ?? ''}`,
            })}
        </div>
    );
}

function CardTitle({ children }: CardChildrenProps) {
    return(
        <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 mb-3">
            { children }
        </h3>
    )
}

function CardDescription({ children }: CardChildrenProps) {
    return(
        <p className="text-sm sm:text-base text-neutral-600 mb-6 leading-relaxed">
            { children }
        </p>
    )
}

function CardListContainer({ className, children }: CardChildrenProps) {
    return(
        <ul className={className}>
            { children }
        </ul>
    )
}

function CardListItem({ className, children }: CardChildrenProps) {
    return(
        <li className={className}>
            {children}
        </li>
    )
}


export const Card = {
  Container: CardContainer,
  Icon: CardIcon,
  Title: CardTitle,
  Description: CardDescription,
  ListContainer: CardListContainer,
  ListItem: CardListItem,
};
