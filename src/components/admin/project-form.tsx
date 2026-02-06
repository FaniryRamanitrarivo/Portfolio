"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { projectFormSchema, ProjectFormSchema } from "@/src/lib/back/validation/project-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import MultipleInput from "../ui/mutliple-input";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
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

    const { register, handleSubmit, control, formState } = form;

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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
        >
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-6">Basic Information</h2>
                <div className="space-y-4">
                    <Input required label="Project Title *" placeholder="E-Commerce Price Monitoring System" {...register("title")} />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input required label="Client *" placeholder="Company Name" {...register("client")} />
                        <Input required label="Your Role *" placeholder="Lead Developer" {...register("role")} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input required label="Duration *" placeholder="3 months" {...register("duration")} />
                        <Input required label="Category *" placeholder="Category" {...register("category")} />
                    </div>
                    <Input required label="Overview *" placeholder="Brief one-line description for the project card" {...register("overview")} />
                    <Input required label="Full Description *" placeholder="Detailed project overview" {...register("description")} />
                    <Input required label="Image URL *" placeholder="https://example.com/image.jpg" {...register("image")} />

                </div>
            </div>

            <MultipleInput
                title="Key Results"
                fieldArray={keyResultsFieldArray}
                register={register}
                name="keyResults"
                placeholder="Measurable achievement or impact"
            />

            <MultipleInput
                title="Challenges"
                fieldArray={challengesFieldArray}
                register={register}
                name="challenges"
                placeholder="Technical or business challenge faced"
            />

            <MultipleInput
                title="Solutions"
                fieldArray={solutionsFieldArray}
                register={register}
                name="solutions"
                placeholder="Solution or approach implemented"
            />

            <MultipleInput
                title="Technologies"
                fieldArray={technologiesFieldArray}
                register={register}
                name="technologies"
                placeholder="Technology or tool used"
            />

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-6">External Links</h2>
                <div className="space-y-4">
                    <Input required label="Source Code URL" placeholder="https://github.com/username/repo" {...register("github")} />
                    <Input required label="Live Demo URL" placeholder="https://example.com" {...register("link")} />
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
                    disabled={formState.isSubmitting}
                    className="px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors cursor-pointer whitespace-nowrap">
                    {defaultValues ? "Update project" : "Create project"}
                </button>

            </div>

        </form>
    )
}
