import Link from 'next/link'

export default function Header()
{
    return (
        <header className='p-4 border-b border-white/10'>

            <div className='max-w-screen-xl mx-auto'>
                <Link
                    href='/'
                    className='font-bold text-xl text-white hover:underline'
                >
                    🍿 <span className='text-amber-400'>Popcorn Time</span>
                </Link>
            </div>

        </header>
    )
}