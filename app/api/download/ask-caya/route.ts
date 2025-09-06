import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`, // ✅ Don't hardcode it
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are CAYA, a helpful assistant from Kishore Jena Creation." },
        { role: "user", content: prompt },
      ],
    }),
  })

  const data = await res.json()
  const reply = data.choices?.[0]?.message?.content || "❌ Sorry, I couldn’t find an answer."

  return NextResponse.json({ reply })
}
