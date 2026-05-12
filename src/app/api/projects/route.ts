import { NextRequest } from "next/server";
import { projectSchema } from "./schema";
import { safeHandler } from "@/src/lib/back/handler";
import { AppError } from "@/src/lib/back/errors";
import { projectQuerySchema } from "@/src/lib/back/validation/query.schema";
import { projectServiceServer } from "@/src/server/services/project.service";

/**
 * GET /api/projects
 * Récupère la liste des projets avec filtres
 * Query params: view, limit, start, order, popular
 */
export async function GET(req: NextRequest) {
  return safeHandler(async () => {
    // Validation des paramètres de query
    const parsed = projectQuerySchema.safeParse(
      Object.fromEntries(req.nextUrl.searchParams)
    );

    if (!parsed.success) {
      throw new AppError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }

    const { start, limit, view, order, popular } = parsed.data;

    return projectServiceServer.getProjects({
      start,
      limit,
      view,
      order,
      popular,
    });
  });
}

/**
 * POST /api/projects
 * Crée un nouveau projet
 */
export async function POST(req: NextRequest) {
  return safeHandler(async () => {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError(
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }

    return projectServiceServer.createProject(parsed.data);
  });
}
