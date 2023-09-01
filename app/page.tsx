import { headers } from 'next/headers'

type Time = {
  datetime: string
}

const getTime = async (): Promise<Time> =>
{
  const res = await fetch('https://worldtimeapi.org/api/timezone/asia/singapore',
    {
      method: 'GET',
      next: { revalidate: 10 }
    }
  )

  const data = await res.json()
  return data
}

export default async function Home() 
{
  const countryCode = headers().get('x-pt-country')!

  const [time] = await Promise.all([getTime()])

  return (
    <main className='text-white'>
      <p>Coming soon.</p>
      <p>
        Time: {time.datetime}
      </p>
    </main>
  )
}