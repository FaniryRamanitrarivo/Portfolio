import { AppError } from "@/src/lib/back/errors";
import { safeHandler } from "@/src/lib/back/handler";
import { projectRepository } from "@/src/lib/back/projects/repository";
import { parseId } from "@/src/lib/back/utils/parse-id";
import { NextRequest } from "next/server";
import { projectUpdateSchema } from "../schema";
import { projectService } from "@/src/lib/back/projects/service";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return safeHandler(async () => {
    const projectId = parseId(id);

    const project = await projectService.getByIdOrThrow(projectId);

    if (!project) {
      // Si aucun projet trouvé, on renvoie une erreur 404 explicite
      throw new AppError(`Project with ID ${projectId} not found`, 404);
    }

    // Retourne directement le projet
    return project;
  });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params;

  return safeHandler(async () => {
    const projectId = parseId(id);
    const existingProject  = await projectService.getByIdOrThrow(projectId);
    
    if (!existingProject ) {
      // Si aucun projet trouvé, on renvoie une erreur 404 explicite
      throw new AppError(`Project with ID ${projectId} not found`, 404);
    }

    const body = await req.json();

    const parsed = projectUpdateSchema.safeParse(body);
    if (!parsed.success) {
      throw new AppError(
        parsed.error.issues.map(i => i.message).join(", "),
        400
      );
    }

    return projectService.update(projectId, parsed.data);
  });
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params;

  return safeHandler(async () => {
    const projectId = parseId(id);
    const existingProject  = await projectService.getByIdOrThrow(projectId);
    
    if (existingProject ) {
      await projectService.delete(projectId);
      return { message: `Project ${projectId} deleted successfully` };
    }
    
  });
}
