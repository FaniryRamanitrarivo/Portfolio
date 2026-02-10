"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { projectFormSchema, ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import MultipleInput from "../ui/mutliple-input";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useRouter } from "next/router";

type Props = {
    defaultValues?: Partial<ProjectFormSchema>;
    onSubmit: (data: ProjectFormSchema) => Promise<void>;
};

export function ProjectForm({ defaultValues, onSubmit }: Props) {

    const router = useRouter();

    const form = useForm<ProjectFormSchema>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            popular: false,
            responsibilities: [],
            keyResults: [],
            challenges: [],
            solutions: [],
            technologies: [],
            ...defaultValues,
        },
    });

    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = form;

    const responsibilitiesFieldArray = useFieldArray({
        control,
        name: "responsibilities",
    });

    const keyResultsFieldArray = useFieldArray({
        control,
        name: "keyResults",
    });

    const challengesFieldArray = useFieldArray({
        control,
        name: "challenges",
    });

    const solutionsFieldArray = useFieldArray({
        control,
        name: "solutions",
    });

    const technologiesFieldArray = useFieldArray({
        control,
        name: "technologies",
    });

    useEffect(() => {
        const arrays = [responsibilitiesFieldArray, keyResultsFieldArray, challengesFieldArray, solutionsFieldArray, technologiesFieldArray];
        arrays.forEach(field => {
            if (field.fields.length === 0) field.append({ value: "" });
        });
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
        >
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-6">Basic Information</h2>
                <div className="space-y-4">

                    <Input required label="Project Title *" className={errors.title ? "border-red-300" : ""} placeholder="E-Commerce Price Monitoring System" {...register("title")} />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                    <div className="grid sm:grid-cols-2 gap-4">

                        <Input required label="Client *" className={errors.client ? "border-red-300" : ""} placeholder="Company Name" {...register("client")} />
                        {errors.client && <p className="text-red-500 text-sm">{errors.client.message}</p>}

                        <Input required label="Your Role *" className={errors.role ? "border-red-300" : ""} placeholder="Lead Developer" {...register("role")} />
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">

                        <Input required label="Duration *" className={errors.duration ? "border-red-300" : ""} placeholder="3 months" {...register("duration")} />
                        {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}

                        <Input required label="Category *" className={errors.category ? "border-red-300" : ""} placeholder="Category" {...register("category")} />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

                    </div>

                    <Input required label="Overview *" className={errors.overview ? "border-red-300" : ""} placeholder="Brief one-line description for the project card" {...register("overview")} />
                    {errors.overview && <p className="text-red-500 text-sm">{errors.overview.message}</p>}

                    <Input required label="Full Description *" className={errors.description ? "border-red-300" : ""} placeholder="Detailed project overview" {...register("description")} />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                    <Input required label="Image URL *" className={errors.image ? "border-red-300" : ""} placeholder="https://example.com/image.jpg" {...register("image")} />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

                </div>
            </div>

            <MultipleInput
                title="Responsabilities"
                fieldArray={responsibilitiesFieldArray}
                register={register}
                name="responsibilities"
                placeholder="Responsabilities"
                errors={errors}
            />

            <MultipleInput
                title="Key Results"
                fieldArray={keyResultsFieldArray}
                register={register}
                name="keyResults"
                placeholder="Measurable achievement or impact"
                errors={errors}
            />

            <MultipleInput
                title="Challenges"
                fieldArray={challengesFieldArray}
                register={register}
                name="challenges"
                placeholder="Technical or business challenge faced"
                errors={errors}
            />

            <MultipleInput
                title="Solutions"
                fieldArray={solutionsFieldArray}
                register={register}
                name="solutions"
                placeholder="Solution or approach implemented"
                errors={errors}
            />

            <MultipleInput
                title="Technologies"
                fieldArray={technologiesFieldArray}
                register={register}
                name="technologies"
                placeholder="Technology or tool used"
                errors={errors}
            />

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-6">External Links</h2>
                <div className="space-y-4">

                    <Input required label="Source Code URL" className={errors.github ? "border-red-300" : ""} placeholder="https://github.com/username/repo" {...register("github")} />
                    {errors.github && <p className="text-red-500 text-sm">{errors.github.message}</p>}

                    <Input required label="Live Demo URL" className={errors.link ? "border-red-300" : ""} placeholder="https://example.com" {...register("link")} />
                    {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}

                </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">

                <button
                    onClick={() => router.back()}
                    type="button"
                    className="px-6 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors cursor-pointer whitespace-nowrap">
                    {defaultValues ? "Update project" : "Create project"}
                </button>

            </div>

        </form>
    )
}
