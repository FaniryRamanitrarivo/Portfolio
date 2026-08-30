"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Controller,
    useFieldArray,
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import MultipleInput from "../ui/mutliple-input";
import { Input, TextArea } from "../ui/input";
import { IconPicker } from "../ui/icon-picker";

import { serviceFormSchema } from "@/src/lib/back/validation/service-form.schema";

type ServiceFormValues = z.input<typeof serviceFormSchema>;

type Props = {
    defaultValues?: Partial<ServiceFormValues>;
    onSubmit: SubmitHandler<ServiceFormValues>;
};

export function ServiceForm({
    defaultValues,
    onSubmit,
}: Props) {
    const router = useRouter();

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceFormSchema),

        defaultValues: {
            title: "",
            icon: "FiDatabase",
            description: "",
            link: "",
            lists: [],

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

    const listsFieldArray = useFieldArray({
        control,
        name: "lists",
    });

    useEffect(() => {
        if (listsFieldArray.fields.length === 0) {
            listsFieldArray.replace([{ value: "" }]);
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
                        <Input
                            required
                            label="Title *"
                            className={errors.title ? "border-red-300" : ""}
                            placeholder="Full-Stack Web Development"
                            {...register("title")}
                        />

                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title.message}
                            </p>
                        )}

                        <Controller
                            control={control}
                            name="icon"
                            render={({ field }) => (
                                <IconPicker
                                    name="icon"
                                    label="Icon *"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.icon?.message}
                                />
                            )}
                        />

                        <div>
                            <TextArea
                                required
                                label="Description *"
                                className={errors.description ? "border-red-300" : ""}
                                placeholder="Short description shown on the card"
                                {...register("description")}
                            />

                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Input
                                label="Link"
                                className={errors.link ? "border-red-300" : ""}
                                placeholder="https://example.com"
                                {...register("link")}
                            />

                            {errors.link && (
                                <p className="text-red-500 text-sm">
                                    {errors.link.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <MultipleInput
                    title="List items"
                    fieldArray={listsFieldArray}
                    register={register}
                    name="lists"
                    placeholder="Bullet point shown on the card"
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
                                    ? "Update service"
                                    : "Create service"}
                            </>
                        )}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
