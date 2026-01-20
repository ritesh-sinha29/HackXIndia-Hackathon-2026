/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { retrivalServer } from "@/lib/functions/pineconeQuery";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userQuery } = body;

    if (!userQuery) {
      return NextResponse.json(
        { error: "Missing userQuery parameter" },
        { status: 400 }
      );
    }

    const result = await retrivalServer(userQuery);

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Error in retrieval API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
