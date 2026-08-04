import { parseNIK } from "@/lib/nik/parse";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nik } = await req.json();
    if (!nik || typeof nik !== "string") {
      return NextResponse.json({ error: "NIK is required" }, { status: 400 });
    }
    const result = parseNIK(nik);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
