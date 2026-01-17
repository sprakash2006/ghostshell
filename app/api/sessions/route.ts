import { NextResponse } from "next/server";
import { getSessions, createSession } from "@/lib/db";

export async function GET() {
    const sessions = await getSessions();
    return NextResponse.json(sessions);
}

export async function POST(request: Request) {
    const { id } = await request.json();
    const newSession = await createSession(id);
    return NextResponse.json(newSession);
}
