import type { IconType } from "react-icons";
import { MdDone } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { differenceInMonths } from "date-fns";

export type TimelineItem = {
    id: number;
    title: string;
    organization: string;
    location: string | null;
    startDate: Date;
    endDate: Date | null;
    description: string | null;
    highlights: string[];
};

function formatPeriod(startDate: Date, endDate: Date | null): string {
    const format = (date: Date) =>
        new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });

    return `${format(startDate)} - ${endDate ? format(endDate) : "Present"}`;
}

function formatDuration(startDate: Date, endDate: Date | null): string {
    const totalMonths = differenceInMonths(endDate ?? new Date(), startDate) + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const parts: string[] = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);

    return parts.join(" ") || "< 1 mo";
}

type Props = {
    items: TimelineItem[];
    icon: IconType;
};

export default function JourneyTimeline({ items, icon: Icon }: Props) {
    if (items.length === 0) {
        return (
            <p className="text-neutral-500 text-sm border border-dashed border-neutral-300 rounded-2xl px-6 py-10 text-center">
                Nothing to show yet.
            </p>
        );
    }

    return (
        <ol className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent-300 via-accent-200 to-transparent" />

            {items.map((item) => (
                <li key={item.id} className="relative pl-16 pb-8 last:pb-0">
                    <span className="absolute left-0 top-0 h-10 w-10 rounded-xl bg-accent-600 ring-4 ring-white flex items-center justify-center shadow-md shadow-accent-600/20">
                        <Icon className="text-white text-lg" />
                    </span>

                    <div className="group bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent-200">
                        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                            <div>
                                <h3 className="text-lg font-bold font-display text-neutral-900">
                                    {item.title}
                                </h3>

                                <p className="text-accent-600 font-medium mt-0.5">
                                    {item.organization}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <span className="text-xs font-semibold uppercase tracking-wide text-accent-700 bg-accent-50 px-3 py-1 rounded-full whitespace-nowrap">
                                    {formatPeriod(item.startDate, item.endDate)}
                                </span>

                                <span className="text-2xs text-neutral-400">
                                    {formatDuration(item.startDate, item.endDate)}
                                </span>
                            </div>
                        </div>

                        {item.location && (
                            <p className="mt-2 flex items-center gap-1.5 text-sm text-neutral-500">
                                <LuMapPin className="text-neutral-400 shrink-0" size={14} />
                                {item.location}
                            </p>
                        )}

                        {item.description && (
                            <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                                {item.description}
                            </p>
                        )}

                        {item.highlights.length > 0 && (
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {item.highlights.map((highlight, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1.5"
                                    >
                                        <MdDone className="text-accent-600 shrink-0" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
}
