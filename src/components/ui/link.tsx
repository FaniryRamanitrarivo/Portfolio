"use client";


import Link from "next/link";
import { AnchorHTMLAttributes, cloneElement, ReactElement } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  label?: string;
  description?: string;
  icon: ReactElement<{ className?: string }>;
  className?: string;
};

type NavigationProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  label?: string;
  className?: string;
  isActive?: boolean;
};

function CustomLink({
  href = "#",
  label = "Start a project",
  icon,
  className = "",
  ...props
}: Props) {

  const isHidden = className.includes('hidden')

  return (
    <Link
      href={href}
      className={`
        ${!isHidden ? 'inline-flex': ''} items-center gap-2
        font-medium
        transition-transform transition-colors
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-accent-500
        ${className}
      `}
      {...props}
    >
      {label}
      {icon && <span aria-hidden>{icon}</span>}
    </Link>
  );
}

function SocialLink({
    href = "#",
    label = "",
    icon,
    description,
    className = "",
    ...props
  }: Props) {
    return(
      <Link href={href} className="flex space-x-4 p-4 bg-white rounded-xl border border-neutral-200 hover:border-accent-300 transition-all duration-300 hover:shadow-md cursor-pointer group">
          <div className="w-12 h-12 flex items-center justify-center bg-accent-100 rounded-xl group-hover:bg-accent-600 transition-colors">
            {cloneElement(icon, {
                className: `text-2xl text-accent-600 group-hover:text-white transition-colors ${className ?? ''}`,
            })}
          </div>
          <div className="min-w-0">
              <p className="text-sm text-neutral-500">{label}</p>
              <p className="font-medium text-neutral-900 truncate">{description}</p>
          </div>
      </Link>
    )
}

function NavigationLink({
    href = "#",
    label = "",
    className = "",
    isActive = false,
    ...props
  }: NavigationProps) {
  
  return(
    <li className={`
      relative capitalize px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${isActive ? 'text-accent-600': 'text-neutral-700'}
      `}>
        <Link href={href} {...props}>{label}</Link>
        <span
          className={`
            absolute bottom-0 left-0 right-0 h-0.5 bg-accent-600
            origin-center transform transition-transform duration-300
            ${isActive ? "scale-x-100" : "scale-x-0"}
          `}
        />
    </li>
  )
}

export { CustomLink, SocialLink, NavigationLink };