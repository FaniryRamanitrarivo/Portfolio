import { MdDone } from "react-icons/md";

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

export default function JourneyTimeline({ items }: { items: TimelineItem[] }) {
    if (items.length === 0) {
        return <p className="text-neutral-500">Nothing to show yet.</p>;
    }

    return (
        <ol className="relative border-l-2 border-neutral-200 ml-3">
            {items.map((item) => (
                <li key={item.id} className="relative pl-6 pb-10 last:pb-0">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-accent-600 ring-4 ring-white" />

                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-lg font-bold font-display text-neutral-900">{item.title}</h3>
                        <span className="text-sm text-neutral-500 whitespace-nowrap">
                            {formatPeriod(item.startDate, item.endDate)}
                        </span>
                    </div>

                    <p className="text-accent-600 font-medium">
                        {item.organization}
                        {item.location && (
                            <span className="text-neutral-500 font-normal"> &middot; {item.location}</span>
                        )}
                    </p>

                    {item.description && (
                        <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                            {item.description}
                        </p>
                    )}

                    {item.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                            {item.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-neutral-600">
                                    <MdDone className="text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ol>
    );
}
