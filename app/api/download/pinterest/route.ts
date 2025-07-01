// app/api/download/pinterest/route.ts
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")
  return url
    ? NextResponse.redirect(`https://pinterestdownloader.com?url=${url}`)
    : NextResponse.json({ error: "No URL provided" }, { status: 400 })
}
