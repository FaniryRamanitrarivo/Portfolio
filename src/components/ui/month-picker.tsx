"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { cn } from "@/src/lib/front/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

const MONTHS = Array.from({ length: 12 }, (_, i) => format(new Date(2000, i, 1), "MMM"));

type MonthPickerProps = {
    value?: Date | null;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    hasError?: boolean;
    id?: string;
};

// A month/year picker: the education & experience "start/end date" fields
// only ever need month + day-of-month granularity, and the public timeline
// only ever displays "MMM yyyy" — so selection is constrained to month/year
// (day is always normalized to the 1st) instead of a full day-grid calendar.
function MonthPicker({
    value,
    onChange,
    placeholder = "Select a month",
    disabled = false,
    hasError = false,
    id,
}: MonthPickerProps) {
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(() => (value ?? new Date()).getFullYear());

    return (
        <Popover
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (nextOpen) setViewYear((value ?? new Date()).getFullYear());
            }}
        >
            <PopoverTrigger asChild>
                <button
                    type="button"
                    id={id}
                    disabled={disabled}
                    className={cn(
                        "w-full flex items-center gap-2 px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all outline-none text-sm text-left disabled:opacity-50 disabled:cursor-not-allowed",
                        !value && "text-neutral-400",
                        hasError && "border-red-300"
                    )}
                >
                    <FiCalendar className="h-4 w-4 text-neutral-400 shrink-0" />
                    {value ? format(value, "MMMM yyyy") : placeholder}
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-3">
                <div className="flex items-center justify-between mb-3">
                    <button
                        type="button"
                        onClick={() => setViewYear((y) => y - 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 transition-colors"
                        aria-label="Previous year"
                    >
                        <FiChevronLeft className="h-4 w-4" />
                    </button>

                    <span className="text-sm font-semibold text-neutral-900">{viewYear}</span>

                    <button
                        type="button"
                        onClick={() => setViewYear((y) => y + 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 transition-colors"
                        aria-label="Next year"
                    >
                        <FiChevronRight className="h-4 w-4" />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                    {MONTHS.map((label, i) => {
                        const isSelected =
                            value?.getFullYear() === viewYear && value?.getMonth() === i;
                        const isCurrent =
                            new Date().getFullYear() === viewYear && new Date().getMonth() === i;

                        return (
                            <button
                                key={label}
                                type="button"
                                onClick={() => {
                                    onChange(new Date(viewYear, i, 1));
                                    setOpen(false);
                                }}
                                className={cn(
                                    "h-9 rounded-lg text-sm font-medium transition-colors",
                                    isSelected
                                        ? "bg-accent-600 text-white hover:bg-accent-600"
                                        : "text-neutral-700 hover:bg-neutral-100",
                                    !isSelected && isCurrent && "text-accent-600 font-semibold"
                                )}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export { MonthPicker };
