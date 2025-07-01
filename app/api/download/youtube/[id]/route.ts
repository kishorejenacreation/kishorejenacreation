// app/api/download/youtube/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const videoId = params.id
  const streamUrl = `https://ssyoutube.com/watch?v=${videoId}` // or your secure API
  return NextResponse.redirect(streamUrl)
}
