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
