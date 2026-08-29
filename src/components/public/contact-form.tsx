"use client";

import { Input, TextArea } from "../ui/input";
import Button from "../ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFormData, contactSchema } from "@/src/lib/back/validation/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaPaperPlane } from "react-icons/fa6";

export default function ContactForm() {

    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const messageValue = watch("message") || "";
    const characterCount = {
        current: messageValue.length,
        max: 500,
        isOverLimit: messageValue.length > 500,
    }

    const onSubmit = async (data: ContactFormData) => {
        setServerMessage(null)

        const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        })


        if (!res.ok) {
            toast.error("An error occured during the process. Please try again");
            setServerMessage("Une erreur est survenue.")
            return
        }

        toast.success("Message sent successfully");
        setServerMessage("Message envoyé avec succès ✅")
        reset()
    }

    return (
        <form
            id="contact-form" data-readdy-form="true"
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <Input
                        placeholder="John Doe"
                        label="Your Name"
                        {...register("name")}
                        className={errors.name ? "border-red-300" : ""}
                    />
                    {errors.name && (<p className="text-red-500 text-sm">{errors.name.message}</p>)}
                </div>
                <div>
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder="john@doe.com"
                        label="Email Address"
                        className={errors.email ? "border-red-300" : ""}
                    />
                    {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
                </div>
            </div>

            <Input
                placeholder="Project Inquiry"
                label="Subject"
                {...register("subject")}
            />

            <TextArea
                {...register("message")}
                placeholder="Tell me more about your project..."
                maxLength={500}
                rows={6}
                label="Message"
            />
            {errors.message && (<p className="text-red-500 text-sm">{errors.message.message}</p>)}

            <div className="mb-4 sm:mb-6">
                <p
                    className={`text-xs mt-2 ${
                        characterCount.isOverLimit
                        ? "text-red-500"
                        : "text-neutral-500"
                    }`}
                >
                    {characterCount.current}/{characterCount.max} characters
                </p>
            </div>
            <Button
                className="bg-accent-600 text-white hover:bg-accent-700 hover:shadow-lg hover:shadow-accent-600/30 "
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {"Sending your Message..."}
                    </>
                ) : (
                    "Send Message"
                )}
                <FaPaperPlane className="ml-2" />
            </Button>
        </form>
    );
}
