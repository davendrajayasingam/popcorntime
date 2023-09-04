import { NextRequest, NextResponse } from 'next/server'
import { getMovies } from '@/utils/helpers/tmdbApiHelper'

export async function POST(req: NextRequest)
{
    const query: MovieQuery = await req.json()
    const payload = await getMovies(query)
    return NextResponse.json(payload)
}