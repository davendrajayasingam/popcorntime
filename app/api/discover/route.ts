import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest)
{
    const res = await fetch('https://worldtimeapi.org/api/timezone/asia/singapore',
        {
            method: 'GET',
            next: { revalidate: 10 }
        }
    )

    const data = await res.json()

    return NextResponse.json(data.datetime)
}