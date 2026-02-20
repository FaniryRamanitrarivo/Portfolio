"use client";

import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { Table } from "../ui/table";
import { api } from "@/src/lib/front/api/api";// Import your new component
import { ProjectTableBody } from "./project-table-body";
import useSWR from "swr";

const fetcher = () => api.projects.latest(6);

export default function AdminProject() {
    const { data: projects, mutate } = useSWR("/projects/latest", fetcher);

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900">Projects</h2>
                    <p className="text-neutral-600 mt-1">Manage your portfolio projects</p>
                </div>
                <Link href="/admin/projects/new" className="px-6 py-3 bg-neutral-900 text-white rounded-lg flex items-center space-x-2">
                    <MdAdd className="mr-1" />
                    Add New Project
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
                <div className="overflow-x-auto">
                    <Table.Container>
                        <Table.Header>
                            <Table.Row>
                                <Table.Title>Project</Table.Title>
                                <Table.Title>Client</Table.Title>
                                <Table.Title>Role</Table.Title>
                                <Table.Title>Duration</Table.Title>
                                <Table.Title>Category</Table.Title>
                                <Table.Title className="text-center">Action</Table.Title>
                            </Table.Row>
                        </Table.Header>
                        {/* Render the Client Component here */}
                        <ProjectTableBody projects={projects || []} />
                    </Table.Container>
                </div>
            </div>
        </div>
    );
}