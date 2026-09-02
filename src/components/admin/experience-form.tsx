"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Controller,
    useFieldArray,
    useForm,
    useWatch,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import MultipleInput from "../ui/mutliple-input";
import { Checkbox, Input, TextArea } from "../ui/input";
import { MonthPicker } from "../ui/month-picker";

import { experienceFormSchema } from "@/src/lib/back/validation/experience-form.schema";

type ExperienceFormValues = z.input<typeof experienceFormSchema>;

type Props = {
    defaultValues?: Partial<ExperienceFormValues>;
    onSubmit: SubmitHandler<ExperienceFormValues>;
};

export function ExperienceForm({
    defaultValues,
    onSubmit,
}: Props) {
    const router = useRouter();

    const form = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceFormSchema),

        defaultValues: {
            role: "",
            company: "",
            location: "",
            startDate: undefined,
            endDate: undefined,
            ongoing: false,
            description: "",

            highlights: [],

            ...defaultValues,
        },
    });

    const {
        register,
        handleSubmit,
        control,
        formState: {
            errors,
            isSubmitting,
        },
    } = form;

    const isOngoing = useWatch({ control, name: "ongoing" });

    const highlightsFieldArray = useFieldArray({
        control,
        name: "highlights",
    });

    useEffect(() => {
        if (highlightsFieldArray.fields.length === 0) {
            highlightsFieldArray.replace([{ value: "" }]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
        >
            <fieldset
                disabled={isSubmitting}
                className="space-y-8 disabled:opacity-80"
            >
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-neutral-900 mb-6">
                        Basic Information
                    </h2>

                    <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    required
                                    label="Role *"
                                    className={errors.role ? "border-red-300" : ""}
                                    placeholder="Full-Stack Developer"
                                    {...register("role")}
                                />

                                {errors.role && (
                                    <p className="text-red-500 text-sm">
                                        {errors.role.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    required
                                    label="Company *"
                                    className={errors.company ? "border-red-300" : ""}
                                    placeholder="Company Name"
                                    {...register("company")}
                                />

                                {errors.company && (
                                    <p className="text-red-500 text-sm">
                                        {errors.company.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Input
                                label="Location"
                                className={errors.location ? "border-red-300" : ""}
                                placeholder="Remote / Antananarivo, Madagascar"
                                {...register("location")}
                            />

                            {errors.location && (
                                <p className="text-red-500 text-sm">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Start Date *
                                </label>

                                <Controller
                                    control={control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <MonthPicker
                                            value={field.value}
                                            onChange={field.onChange}
                                            hasError={!!errors.startDate}
                                        />
                                    )}
                                />

                                {errors.startDate && (
                                    <p className="text-red-500 text-sm">
                                        {errors.startDate.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    End Date
                                </label>

                                <Controller
                                    control={control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <MonthPicker
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isOngoing}
                                            hasError={!!errors.endDate}
                                        />
                                    )}
                                />

                                {errors.endDate && (
                                    <p className="text-red-500 text-sm">
                                        {errors.endDate.message}
                                    </p>
                                )}

                                <Checkbox
                                    label="Currently working here"
                                    {...register("ongoing")}
                                />
                            </div>
                        </div>

                        <div>
                            <TextArea
                                label="Description"
                                className={errors.description ? "border-red-300" : ""}
                                placeholder="Short summary of the role"
                                {...register("description")}
                            />

                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <MultipleInput
                    title="Highlights"
                    fieldArray={highlightsFieldArray}
                    register={register}
                    name="highlights"
                    placeholder="Key achievement or responsibility"
                    errors={errors}
                />

                <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                        onClick={() => router.back()}
                        type="button"
                        className="px-6 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                {defaultValues
                                    ? "Updating..."
                                    : "Creating..."}
                            </>
                        ) : (
                            <>
                                {defaultValues
                                    ? "Update experience entry"
                                    : "Create experience entry"}
                            </>
                        )}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
