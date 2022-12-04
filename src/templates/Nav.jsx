import Link from 'next/link';

export default function Nav(props) {
    return (
        <nav className="sticky shadow-xl top-0 z-50 px-14 py-4 flex justify-between items-center bg-indigo-900 text-gray-200">
            <span className="text-4xl">Covid-19 <span className='hidden md:inline'>Estatísticas</span></span>
            <div className='text-2xl'>
                <Link href="/" className={`mr-8 md:mr-24 lg:mr-80 ${props.page === 'home' ? 'underline' : '' } hover:text-white hover:underline underline-offset-4`}>Home</Link>
                <Link href="/paises" className={`${props.page === 'statistics' ? 'underline' : '' } hover:text-white mr-2 hover:underline underline-offset-4`}>Estatísticas</Link>
            </div>
        </nav>
    )
}