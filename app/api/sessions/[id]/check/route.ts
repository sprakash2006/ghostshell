import { NextResponse } from "next/server";
import { getSessions, addCommandToSession, terminateSession } from "@/lib/db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const sessions = await getSessions();
    const session = sessions.find((s) => s.id === id);

    if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(session);
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const command = await request.json();

    const updatedSession = await addCommandToSession(id, command);

    if (!updatedSession) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSession);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const terminatedSession = await terminateSession(id);

    if (!terminatedSession) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(terminatedSession);
}
