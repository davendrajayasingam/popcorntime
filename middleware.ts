import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) 
{
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pt-country', request.geo?.country || 'unknown')
    requestHeaders.set('x-pt-region', request.geo?.region || 'unknown')

    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })
}