import { FaExternalLinkAlt } from 'react-icons/fa'

import tmdbLogo from '@/public/images/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg'
import Image from 'next/image'

export default function Footer()
{
    return <footer className='p-4 border-t border-white/10'>
        <p className='font-light text-white text-sm text-center'>
            Made with ❤️ by Davendra Jayasingam. Source code available on <a href='https://github.com/davendrajayasingam/popcorntime' className='underline inline-flex items-center' target='_blank'>GitHub <FaExternalLinkAlt /></a>.
        </p>
        <Image
            src={tmdbLogo}
            alt='Powered by TMDB'
            className='mx-auto mt-2'
            width={200}
        />
        <p className='mt-2 font-light text-white text-sm text-center'>
            This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
    </footer>
}