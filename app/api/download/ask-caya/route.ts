import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are CAYA assistant from Kishore Jena Creation, always helpful, smart, and polite." },
          { role: "user", content: prompt },
        ],
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("OpenAI Error:", data)
      return NextResponse.json({ reply: "❌ Failed to fetch response. Please try again." }, { status: 500 })
    }

    const reply = data.choices?.[0]?.message?.content || "Sorry, I have no reply."
    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Server Error:", error)
    return NextResponse.json({ reply: "❌ Something went wrong on the server." }, { status: 500 })
  }
}
