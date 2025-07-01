// app/api/ask-caya/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.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}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are CAYA assistant." },
        { role: "user", content: prompt },
      ],
    }),
  })

  const data = await res.json()
  const reply = data.choices[0]?.message?.content || "Sorry, no response."
  return NextResponse.json({ reply })
}
