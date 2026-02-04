import { NextResponse } from "next/server";
import { AppError } from "./errors";

export async function safeHandler<T>(
  handler: () => Promise<T>
): Promise<NextResponse> {
  try {
    const result = await handler();
    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    const isProd = process.env.NODE_ENV === "production";

    console.error(error);

    let message = "Something went wrong.";
    let status = 500;

    if (error instanceof AppError) {
      message = error.message;
      status = error.status;
    } else if (!isProd && error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ success: false, message }, { status });
  }
}
