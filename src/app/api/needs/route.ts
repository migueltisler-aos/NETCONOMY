import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const needsDir = path.join(process.cwd(), 'data', 'innovation_needs')

    // Falls Verzeichnis nicht existiert
    if (!fs.existsSync(needsDir)) {
      return NextResponse.json({
        total: 0,
        needs: [],
        message: 'Keine gesammelten Bedarfe vorhanden.'
      })
    }

    // Lese alle JSON-Dateien aus dem Verzeichnis
    const files = fs.readdirSync(needsDir).filter(f => f.endsWith('.json'))

    const needs = files
      .map(file => {
        try {
          const content = fs.readFileSync(path.join(needsDir, file), 'utf-8')
          return JSON.parse(content)
        } catch {
          return null
        }
      })
      .filter(item => item !== null)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json({
      total: needs.length,
      needs,
      lastUpdated: needs.length > 0 ? needs[0].timestamp : null
    })
  } catch (error) {
    console.error('Error reading needs:', error)
    return NextResponse.json(
      { error: 'Fehler beim Lesen der Daten' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID erforderlich' },
        { status: 400 }
      )
    }

    const filepath = path.join(process.cwd(), 'data', 'innovation_needs', `need_${id}.json`)

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
      return NextResponse.json({ deleted: true })
    } else {
      return NextResponse.json(
        { error: 'Bedarf nicht gefunden' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error deleting need:', error)
    return NextResponse.json(
      { error: 'Fehler beim Löschen' },
      { status: 500 }
    )
  }
}
