import { NextResponse } from 'next/server'

export async function GET() {
  const cluster = [
    {
      actor_id: 1,
      name: 'TU Berlin',
      type: 'Forschung',
      topic: '5G',
      district: 'Charlottenburg'
    },
    {
      actor_id: 2,
      name: 'HTW IoT Lab',
      type: 'Forschung',
      topic: 'IoT',
      district: 'Treptow'
    },
    {
      actor_id: 3,
      name: 'Startup VoltIQ',
      type: 'Unternehmen',
      topic: 'Energie',
      district: 'Kreuzberg'
    },
    {
      actor_id: 4,
      name: 'Miguel Tisler',
      type: 'Experte',
      topic: 'Automation',
      district: 'Neukölln'
    },
    {
      actor_id: 5,
      name: 'Berlin Tech Hub',
      type: 'Institution',
      topic: 'Innovation',
      district: 'Mitte'
    },
    {
      actor_id: 6,
      name: 'AI Research Lab',
      type: 'Forschung',
      topic: 'Künstliche Intelligenz',
      district: 'Spandau'
    }
  ]

  return NextResponse.json(cluster)
}
