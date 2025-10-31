import { NextResponse } from 'next/server'

export async function GET() {
  const trends = {
    'KI': 28,
    '5G': 19,
    'IoT': 34,
    'Blockchain': 12,
    'Automation': 22
  }

  const chartData = Object.entries(trends).map(([name, value]) => ({
    name,
    value
  }))

  return NextResponse.json(chartData)
}
