"use client";

import SectionTitle from "../ui/section-title";
import { MdOutlineEmail } from "react-icons/md";
import { SocialLink } from "../ui/link";
import { FaGithub, FaLinkedinIn, FaPaperPlane } from "react-icons/fa6";
import { Input, TextArea } from "../ui/input";
import Button from "../ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFormData, contactSchema } from "@/src/lib/back/validation/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const socialsMediaLinks = {
    'email': 'faniryram0@gmail.com',
    'linkedin': 'https://www.linkedin.com/in/faniriniaina-andry-ramanitrarivo-59b47b249',
    'github': 'https://github.com/FaniryRamanitrarivo',
}

export default function Contact() {

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
        <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-accent-50/30 to-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <SectionTitle name="Get In Touch" title="Let's Build Something Amazing" />
                    <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                        Have a project in mind? Let's discuss how I can help bring your ideas to life
                    </p>
                </div>
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 mb-4">
                            Quick Response Guaranteed
                        </h3>
                        <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                            Have a project in mind? Let's discuss how I can help bring your ideas to life
                        </p>
                        <div className="space-y-4">
                            <SocialLink
                                href={`mailto:${socialsMediaLinks.email}`}
                                label="Email"
                                icon={<MdOutlineEmail />}
                                description={socialsMediaLinks.email}
                            />
                            <SocialLink
                                href={socialsMediaLinks.linkedin}
                                label="LinkedIn"
                                icon={<FaLinkedinIn />}
                                description="Connect with me"
                            />
                            <SocialLink
                                href={socialsMediaLinks.github}
                                label="GitHub"
                                icon={<FaGithub />}
                                description="View my code"
                            />
                        </div>
                        <div className="pt-4">
                            <p className="text-sm text-neutral-500 mb-3">Available for:</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">Freelance Projects</span>
                                <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">Consulting</span>
                                <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">Long-term Contracts</span>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="lg:col-span-3">
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
                    </div>
                </div>
            </div>
        </section>
    )
}