import { NextRequest } from "next/server";
import { projectSchema } from "./schema";
import { safeHandler } from "@/src/lib/back/handler";
import { AppError } from "@/src/lib/back/errors";
import { projectQuerySchema } from "@/src/lib/back/validation/query.schema";
import { projectService } from "@/src/lib/back/projects/service";


export async function GET(req: NextRequest) {
  return safeHandler(async () => {

    //Validation et extraction des paramètres dans l'URL
    const parsed = projectQuerySchema.safeParse(
      Object.fromEntries(req.nextUrl.searchParams)
    );

    if(!parsed.success) {
      throw new AppError(
        parsed.error.issues.map(i => i.message).join(', '),
        400
      );
    }

    const { start, limit, view, order, popular } = parsed.data;

    return projectService.getProjects({
      start,
      limit,
      view,
      order,
      popular
    });

  });
}

export async function POST(req: NextRequest) {
  return safeHandler(async () => {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if(!parsed.success) {
      throw new AppError(
        parsed.error.issues.map(i => i.message).join(', '),
        400
      );
    }

    return projectService.create(parsed.data);
  });
}