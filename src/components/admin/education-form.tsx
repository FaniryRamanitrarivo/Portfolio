"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    useFieldArray,
    useForm,
    useWatch,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import MultipleInput from "../ui/mutliple-input";
import { Checkbox, Input, TextArea } from "../ui/input";

import { educationFormSchema } from "@/src/lib/back/validation/education-form.schema";

type EducationFormValues = z.input<typeof educationFormSchema>;

type Props = {
    defaultValues?: Partial<EducationFormValues>;
    onSubmit: SubmitHandler<EducationFormValues>;
};

export function EducationForm({
    defaultValues,
    onSubmit,
}: Props) {
    const router = useRouter();

    const form = useForm<EducationFormValues>({
        resolver: zodResolver(educationFormSchema),

        defaultValues: {
            degree: "",
            school: "",
            location: "",
            startDate: "",
            endDate: "",
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
                                    label="Degree *"
                                    className={errors.degree ? "border-red-300" : ""}
                                    placeholder="Master's in Computer Science"
                                    {...register("degree")}
                                />

                                {errors.degree && (
                                    <p className="text-red-500 text-sm">
                                        {errors.degree.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    required
                                    label="School *"
                                    className={errors.school ? "border-red-300" : ""}
                                    placeholder="University of..."
                                    {...register("school")}
                                />

                                {errors.school && (
                                    <p className="text-red-500 text-sm">
                                        {errors.school.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Input
                                label="Location"
                                className={errors.location ? "border-red-300" : ""}
                                placeholder="Antananarivo, Madagascar"
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
                                <Input
                                    required
                                    type="month"
                                    label="Start Date *"
                                    className={errors.startDate ? "border-red-300" : ""}
                                    {...register("startDate")}
                                />

                                {errors.startDate && (
                                    <p className="text-red-500 text-sm">
                                        {errors.startDate.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="month"
                                    label="End Date"
                                    disabled={isOngoing}
                                    className={errors.endDate ? "border-red-300" : ""}
                                    {...register("endDate")}
                                />

                                {errors.endDate && (
                                    <p className="text-red-500 text-sm">
                                        {errors.endDate.message}
                                    </p>
                                )}

                                <Checkbox
                                    label="Currently studying here"
                                    {...register("ongoing")}
                                />
                            </div>
                        </div>

                        <div>
                            <TextArea
                                label="Description"
                                className={errors.description ? "border-red-300" : ""}
                                placeholder="Short summary of the program"
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
                    placeholder="Honors, relevant coursework, thesis..."
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
                                    ? "Update education entry"
                                    : "Create education entry"}
                            </>
                        )}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
