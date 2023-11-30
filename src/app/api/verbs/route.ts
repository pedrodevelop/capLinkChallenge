import { NextResponse } from "next/server";

import { verbs } from "@/data/constants/verbs";

export async function GET() {
  return NextResponse.json(verbs, { status: 200 });
}
