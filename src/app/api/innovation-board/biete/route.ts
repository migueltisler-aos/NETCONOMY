import fs from 'fs'
import path from 'path'

interface BieteEntry {
  id: string
  name: string
  technologie: string
  zielgruppe: string
  losung: string
  email: string
  website: string
  timestamp: string
}

const DATA_DIR = path.join(process.cwd(), 'data', 'biete')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

export async function POST(request: Request) {
  try {
    const { name, technologie, zielgruppe, losung, email, website } = await request.json()

    if (!name || !technologie || !zielgruppe || !losung || !email) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const entry: BieteEntry = {
      id: Date.now().toString(),
      name,
      technologie,
      zielgruppe,
      losung,
      email,
      website: website || '',
      timestamp: new Date().toISOString(),
    }

    // Save to file
    const filepath = path.join(DATA_DIR, `${entry.id}.json`)
    fs.writeFileSync(filepath, JSON.stringify(entry, null, 2))

    // TODO: Send email notification to startup when matching SUCHE comes in
    console.log(`New BIETE entry: ${JSON.stringify(entry)}`)

    return Response.json({
      success: true,
      entry,
    })
  } catch (error) {
    console.error('Error processing BIETE:', error)
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const files = fs.readdirSync(DATA_DIR)
    const entries: BieteEntry[] = files.map((file) => {
      const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8')
      return JSON.parse(content)
    })

    return Response.json({ entries })
  } catch (error) {
    console.error('Error reading BIETE entries:', error)
    return Response.json({ entries: [] })
  }
}
