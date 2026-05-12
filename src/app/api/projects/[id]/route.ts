import { AppError } from "@/src/lib/back/errors";
import { safeHandler } from "@/src/lib/back/handler";
import { projectServiceServer } from "@/src/server/services/project.service";
import { NextRequest } from "next/server";
import { projectUpdateSchema } from "../schema";

/**
 * GET /api/projects/[id]
 * Récupère un projet spécifique par son ID
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return safeHandler(async () => {
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      throw new AppError("Invalid project ID", 400);
    }

    return projectServiceServer.getProjectById(projectId);
  });
}

/**
 * PUT /api/projects/[id]
 * Met à jour un projet
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return safeHandler(async () => {
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      throw new AppError("Invalid project ID", 400);
    }

    const body = await req.json();

    const parsed = projectUpdateSchema.safeParse(body);
    if (!parsed.success) {
      throw new AppError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }

    return projectServiceServer.updateProject(projectId, parsed.data);
  });
}

/**
 * DELETE /api/projects/[id]
 * Supprime un projet
 */
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return safeHandler(async () => {
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      throw new AppError("Invalid project ID", 400);
    }

    await projectServiceServer.deleteProject(projectId);
    return { message: `Project ${projectId} deleted successfully` };
  });
}

