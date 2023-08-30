import { headers } from 'next/headers'

export default async function Home() 
{
  return (
    <main className='text-white'>
      <p>Coming soon.</p>
      <p>Country: {headers().get('x-pt-country')}</p>
      <p>Region: {headers().get('x-pt-region')}</p>
      <p>{JSON.stringify(headers(), null, 2)}</p>
    </main>
  )
}