import Link from 'next/link'

export default function Header()
{
    const showLink = (href: string, text: string) =>
        <Link
            href={href}
            className='font-bold text-lg text-white hover:underline'
        >
            {text}
        </Link>

    return (
        <header className='p-4 border-b border-white/10'>

            <div className='max-w-screen-xl mx-auto'>
                {showLink('/', 'Popcorn Time')}
            </div>

        </header>
    )
}