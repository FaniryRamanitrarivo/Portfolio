import { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  name: string;
  title?: string;
};

export default function SectionTitle({
        name, 
        title,
        className,
    }: Props) {
    return(
        <div className={className}>
            <span className="text-2xs font-semibold uppercase tracking-widest text-accent-600">
                {name}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-neutral-900 leading-tight">
                {title}
            </h2>
        </div>
    )
}