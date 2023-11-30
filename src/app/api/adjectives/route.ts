import { NextResponse } from "next/server";

import { adjectives } from "@/data/constants/adjectives";

export async function GET() {
  return NextResponse.json(adjectives, { status: 200 });
}
