import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const downloadUrl = `https://your-download-server.com/youtube/${id}.mp4`

  return NextResponse.redirect(downloadUrl)
}
