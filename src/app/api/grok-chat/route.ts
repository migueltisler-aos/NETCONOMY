import { Groq } from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROK_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: systemPrompt || 'Du bist ein hilfreicher Assistent.',
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2048,
    })

    const content = response.choices[0]?.message?.content || 'Keine Antwort erhalten'

    return Response.json({
      response: content,
      status: 'success',
    })
  } catch (error) {
    console.error('Grok API Error:', error)

    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten',
        status: 'error',
      },
      { status: 500 }
    )
  }
}
