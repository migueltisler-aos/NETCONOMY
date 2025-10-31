import { NextResponse } from 'next/server'
import { Groq } from 'groq-sdk'
import fs from 'fs'
import path from 'path'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const clusterData = [
  {
    actor_id: 1,
    name: 'TU Berlin',
    type: 'Forschung',
    topic: '5G',
    district: 'Charlottenburg',
    keywords: ['5g', 'netzwerk', 'telekommunikation', 'funk', 'wireless']
  },
  {
    actor_id: 2,
    name: 'HTW IoT Lab',
    type: 'Forschung',
    topic: 'IoT',
    district: 'Treptow',
    keywords: ['iot', 'sensor', 'internet', 'things', 'embedded', 'daten']
  },
  {
    actor_id: 3,
    name: 'Startup VoltIQ',
    type: 'Unternehmen',
    topic: 'Energie',
    district: 'Kreuzberg',
    keywords: ['energie', 'strom', 'batterie', 'solar', 'power', 'nachhaltig']
  },
  {
    actor_id: 4,
    name: 'Miguel Tisler',
    type: 'Experte',
    topic: 'Automation',
    district: 'Neukölln',
    keywords: ['automation', 'logistik', 'robotik', 'prozess', 'effizienz', 'optimierung']
  },
  {
    actor_id: 5,
    name: 'Berlin Tech Hub',
    type: 'Institution',
    topic: 'Innovation',
    district: 'Mitte',
    keywords: ['innovation', 'startup', 'netzwerk', 'verbindung', 'ökosystem', 'mentoring']
  },
  {
    actor_id: 6,
    name: 'AI Research Lab',
    type: 'Forschung',
    topic: 'Künstliche Intelligenz',
    district: 'Spandau',
    keywords: ['ki', 'ai', 'machine learning', 'neural', 'intelligence', 'deep learning']
  }
]

const KI_SYSTEM_PROMPT = `Du bist die sachliche KI-Assistenz von "Innovation Connect Berlin".
Deine Aufgabe ist es, Innovationsbedarf von Unternehmen, Forschungseinrichtungen und Organisationen zu verstehen und relevant Partner in Berlin vorzuschlagen.

Analysiere die Eingabe und erkenne:
1. **Rolle**: Wer ist die Person? (Forschungsleiter, Startup-Gründer, Unternehmer, Manager, etc.)
2. **Bedarf**: Was ist das konkrete Problem oder die Herausforderung?
3. **Themenfelder**: Welche Technologien oder Fachbereiche sind relevant? (KI, IoT, 5G, Automation, Energie, etc.)

Gib dann:
1. Eine kurze, praxisorientierte Antwort mit konkreten Vorschlägen
2. Ein Beispiel aus einem Berliner Praxisprojekt, das ähnliche Brücken zwischen Industrie und Technologie geschaffen hat (fiktiv, aber plausibel)
3. Strukturierte Daten in JSON-Format mit: rolle, bedarf, themenfeld (Array), status
4. Verwende ausschließlich die fiktiven Berliner Organisationsnamen aus dem Cluster

Antworte nur auf Deutsch und in einem sachlichen, hilfreichen Ton.`

async function extractDataWithKI(query: string) {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: KI_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const content = response.choices[0].message.content || ''

    // Extrahiere JSON aus der Antwort
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    let structuredData = {
      rolle: 'Unbekannt',
      bedarf: 'Zusammenarbeit',
      themenfeld: ['Technologie'],
      status: 'new'
    }

    if (jsonMatch) {
      try {
        structuredData = JSON.parse(jsonMatch[0])
      } catch {
        // Falls JSON-Parsing fehlschlägt, nutze default
      }
    }

    return {
      aiResponse: content,
      structuredData
    }
  } catch (error) {
    console.error('Groq API Error:', error)
    throw error
  }
}

function findMatches(query: string, structuredData: any) {
  const lowerQuery = query.toLowerCase()
  const themenfeldArray = Array.isArray(structuredData.themenfeld)
    ? structuredData.themenfeld
    : [structuredData.themenfeld]

  const scores = clusterData.map(actor => {
    let score = 0

    // Keyword-basiertes Scoring
    actor.keywords.forEach(keyword => {
      if (lowerQuery.includes(keyword)) {
        score += 2
      }
    })

    // Topic-Matching basierend auf erkannten Themenfeldern
    themenfeldArray.forEach((thema: string) => {
      if (actor.topic.toLowerCase().includes(thema.toLowerCase())) {
        score += 3
      }
      if (actor.keywords.some(k => k.includes(thema.toLowerCase()))) {
        score += 1
      }
    })

    return { ...actor, score }
  })

  return scores
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score, ...actor }) => actor)
}

function saveNeedToFile(need: any) {
  try {
    const needsDir = path.join(process.cwd(), 'data', 'innovation_needs')

    // Erstelle Verzeichnis, falls nicht vorhanden
    if (!fs.existsSync(needsDir)) {
      fs.mkdirSync(needsDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `need_${timestamp}.json`
    const filepath = path.join(needsDir, filename)

    fs.writeFileSync(filepath, JSON.stringify(need, null, 2))

    return {
      saved: true,
      id: timestamp,
      file: filename
    }
  } catch (error) {
    console.error('Error saving need:', error)
    return { saved: false, error: 'Fehler beim Speichern' }
  }
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // KI-Verarbeitung
    const { aiResponse, structuredData } = await extractDataWithKI(query)

    // Matching basierend auf Themenfeldern
    const matches = findMatches(query, structuredData)

    // Speichern des Bedarfs
    const need = {
      timestamp: new Date().toISOString(),
      originalQuery: query,
      ...structuredData,
      matches: matches.map(m => ({ actor_id: m.actor_id, name: m.name, type: m.type })),
    }

    const saveResult = saveNeedToFile(need)

    return NextResponse.json({
      aiResponse,
      matches,
      structured_data: structuredData,
      saved: saveResult.saved,
      needId: saveResult.id
    })
  } catch (error) {
    console.error('Matching error:', error)
    return NextResponse.json(
      { error: 'Fehler bei der KI-Verarbeitung. Bitte versuche es später erneut.' },
      { status: 500 }
    )
  }
}
