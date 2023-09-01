import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) 
{
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pt-country', request.geo?.country || 'MY')

    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })
}