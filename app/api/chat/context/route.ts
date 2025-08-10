import { and, desc, eq } from "drizzle-orm";

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userContexts } from "@/lib/schema";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response("Unauthorized", { status: 401 });
  const userId = session.user.id;
  const data = await db
    .select()
    .from(userContexts)
    .where(eq(userContexts.userId, userId))
    .orderBy(desc(userContexts.updatedAt), desc(userContexts.createdAt));
  const latest = data[0] ?? null;
  return Response.json({ context: latest, history: data });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response("Unauthorized", { status: 401 });
  const userId = session.user.id;
  const { content } = await req.json();
  if (!content) return new Response("Bad Request", { status: 400 });
  await db
    .update(userContexts)
    .set({ isActive: false })
    .where(and(eq(userContexts.userId, userId), eq(userContexts.isActive, true)));
  const [row] = await db
    .insert(userContexts)
    .values({ userId, content, isActive: true })
    .returning();
  return Response.json({ context: row });
}
