import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { Table } from "../ui/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Project } from "@prisma/client";
import { api } from "@/src/lib/front/api/api";

export default async function AdminProject() {

    const projects = await api.projects.latest(6);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-display text-neutral-900">Projects</h2>
                    <p className="text-neutral-600 mt-1">Manage your portfolio projects</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="
                        px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium 
                        hover:bg-neutral-800 transition-colors 
                        cursor-pointer whitespace-nowrap flex items-center space-x-2"
                >
                    <MdAdd className="mr-1" />
                    Add New Project
                </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
                <div className="overflow-x-auto">
                    <Table.Container>
                        <Table.Header>
                            <Table.Title className="text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                                project
                            </Table.Title>
                            <Table.Title className="text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                                client
                            </Table.Title>
                            <Table.Title className="text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                                role
                            </Table.Title>
                            <Table.Title className="text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                                duration
                            </Table.Title>
                            <Table.Title className="text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                                category
                            </Table.Title>
                            <Table.Title className="text-center text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                                action
                            </Table.Title>
                        </Table.Header>
                        <Table.Body>
                            {projects.map(project => (
                                <Table.Row key={project.id}>
                                    <Table.Col>
                                        <div className="flex items-center space-x-3">
                                            <img
                                                alt="E-Commerce Price Monitoring System"
                                                className="w-12 h-12 rounded-lg object-cover object-top"
                                                src={project.image || ''}
                                            />
                                            <div>
                                                <div className="font-medium text-neutral-900">{project.title}</div>
                                                <div className="text-sm text-neutral-500 line-clamp-1">{project.overview}</div>
                                            </div>
                                        </div>
                                    </Table.Col>
                                    <Table.Col className="text-sm text-neutral-700">
                                        {project.client}
                                    </Table.Col>
                                    <Table.Col className="text-sm text-neutral-700">
                                        {project.role}
                                    </Table.Col>
                                    <Table.Col className="text-sm text-neutral-700">
                                        {project.duration}
                                    </Table.Col>
                                    <Table.Col className="text-center">
                                        <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium whitespace-nowrap">
                                            {project.category}
                                        </span>
                                    </Table.Col>
                                    <Table.Col className="text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                                                <BiEditAlt />
                                            </button>
                                            <button className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete">
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    </Table.Col>
                                </Table.Row>
                            )
                            )}
                        </Table.Body>
                    </Table.Container>
                </div>
            </div>
        </div>
    )
}