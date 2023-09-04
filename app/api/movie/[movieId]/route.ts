import { NextRequest, NextResponse } from 'next/server'
import { getMovie } from '@/utils/helpers/tmdbApiHelper'

export async function GET(req: NextRequest, { params }: { params: { movieId: string } })
{
    const movieId = params.movieId
    const payload = await getMovie(movieId)
    return NextResponse.json(payload)
}