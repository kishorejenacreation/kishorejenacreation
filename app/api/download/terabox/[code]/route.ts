import { NextRequest, NextResponse } from "next/server"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const redirectUrl = `https://teraboxapp.com/s/${params.id}`
  return NextResponse.redirect(redirectUrl)
}
