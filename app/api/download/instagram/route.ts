// app/api/download/instagram/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "Missing Instagram URL" }, { status: 400 })
  }

  try {
    // Using on4t service to generate MP4 link
    const response = await fetch(`https://iqsaved.com/video/#:~:text=Use%20same%20link%20to%20download%20videos%20from%20Instagram%3A,%E2%80%93%20no%20sign-up%2C%20no%20software%2C%20and%20completely%20free.`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ url }).toString(),
    })

    const html = await response.text()

    const mp4Match = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/)
    const mp4Url = mp4Match?.[1]

    if (!mp4Url) {
      return NextResponse.json({ error: "MP4 link not found" }, { status: 404 })
    }

    return NextResponse.redirect(mp4Url)
  } catch (error) {
    console.error("Instagram download error:", error)
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
