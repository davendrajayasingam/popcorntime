import Link from 'next/link'

export default function Header()
{
    const showLink = (href: string, text: string) =>
        <Link
            href={href}
            className='font-medium text-white hover:underline'
        >
            {text}
        </Link>

    return (
        <header className='p-4 flex items-center justify-between space-x-4 border-b border-white/10'>

            {showLink('/', 'Popcorn Time')}

            <nav className='flex flex-row items-center space-x-4'>
                {showLink('/', 'Now Playing')}
                {showLink('/upcoming', 'Upcoming')}
                {showLink('/popular', 'Popular')}
                {showLink('/top-rated', 'Top Rated')}
            </nav>

        </header>
    )
}