import fs from 'fs'
import path from 'path'

interface SucheEntry {
  id: string
  technologie: string
  branche: string
  beschreibung: string
  ruckrufnummer: string
  timestamp: string
}

const DATA_DIR = path.join(process.cwd(), 'data', 'suche')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

export async function POST(request: Request) {
  try {
    const { technologie, branche, beschreibung, ruckrufnummer } = await request.json()

    if (!technologie || !branche || !beschreibung || !ruckrufnummer) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const entry: SucheEntry = {
      id: Date.now().toString(),
      technologie,
      branche,
      beschreibung,
      ruckrufnummer,
      timestamp: new Date().toISOString(),
    }

    // Save to file
    const filepath = path.join(DATA_DIR, `${entry.id}.json`)
    fs.writeFileSync(filepath, JSON.stringify(entry, null, 2))

    // TODO: Send email notification to Miguel or admin
    console.log(`New SUCHE entry: ${JSON.stringify(entry)}`)

    return Response.json({
      success: true,
      entry,
    })
  } catch (error) {
    console.error('Error processing SUCHE:', error)
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const files = fs.readdirSync(DATA_DIR)
    const entries: SucheEntry[] = files.map((file) => {
      const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8')
      return JSON.parse(content)
    })

    return Response.json({ entries })
  } catch (error) {
    console.error('Error reading SUCHE entries:', error)
    return Response.json({ entries: [] })
  }
}
