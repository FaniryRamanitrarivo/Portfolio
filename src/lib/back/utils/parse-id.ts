import { AppError } from "../errors";

export function parseId(id: string): number {
    const parsed = Number(id);

    if(Number.isNaN(parsed) || parsed <= 0) {
        throw new AppError("Invalid project ID", 400)
    }

    return parsed;
}