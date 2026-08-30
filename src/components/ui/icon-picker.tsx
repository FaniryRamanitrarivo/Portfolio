"use client";

import { ICON_KEYS, ICON_OPTIONS, type IconKey } from "@/src/lib/shared/icon-registry";

type Props = {
    name?: string;
    label?: string;
    value?: IconKey;
    onChange: (icon: IconKey) => void;
    error?: string;
};

export function IconPicker({ name = "", label = "", value, onChange, error }: Props) {
    return (
        <div className="my-2">
            {label && (<label htmlFor={name} className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>)}

            <div id={name} className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                {ICON_KEYS.map((key) => {
                    const Icon = ICON_OPTIONS[key];
                    const isSelected = value === key;

                    return (
                        <button
                            key={key}
                            type="button"
                            title={key}
                            onClick={() => onChange(key)}
                            className={`h-10 w-10 flex items-center justify-center rounded-lg border text-lg transition-colors cursor-pointer ${isSelected
                                ? "bg-accent-600 border-accent-600 text-white"
                                : "bg-white border-neutral-300 text-neutral-600 hover:border-accent-400 hover:text-accent-600"
                                }`}
                        >
                            <Icon />
                        </button>
                    );
                })}
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}
