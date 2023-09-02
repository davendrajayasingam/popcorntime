export const reconstructSearchParams = (searchParams: SearchParams): string =>
{
    let newSearchParams = '?'

    // rebuild the old search params
    for (const currentKey in searchParams)
    {
        if (Array.isArray(searchParams[currentKey]))
        {
            for (const param of searchParams[currentKey]!)
            {
                newSearchParams += `&${currentKey}=${param}`
            }
        }
        else
        {
            newSearchParams += `&${currentKey}=${searchParams[currentKey]}`
        }
    }

    return newSearchParams
}

export const cleanupSearchParams = (searchParams: string): string =>
{
    const cleanSearchParams = searchParams.replace('?&', '?')
    if (cleanSearchParams === '?')
    {
        return ''
    }
    return cleanSearchParams
}

export const getSearchParams = (searchParams: SearchParams): string =>
    cleanupSearchParams(reconstructSearchParams(searchParams))