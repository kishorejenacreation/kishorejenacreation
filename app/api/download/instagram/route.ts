// app/api/download/instagram/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")

  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 })

  const apiUrl = `https://downloadgram.onrender.com/download?url=${encodeURIComponent(url)}`
  return NextResponse.redirect(apiUrl)
}
