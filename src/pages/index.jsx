import Link from 'next/link';
import Image from "next/image";
import Nav from '../templates/Nav';

export default function Home() {
  return (
    <div className="h-screen">
      <Nav page="home"/>
      <div className='grid lg:grid-cols-2 place-items-center text-center lg:text-start mt-8'>
        <header className='px-10 lg:px-14 mt-6 lg:mt-0 mb-12'>
            <div>
              <h1 className='text-8xl text-indigo-900 mb-2'>Covid-19</h1>
              <h2 className='text-7xl font-thin'>Dados e Estatísticas</h2>
            </div>
            <hr className='border-none h-2 bg-gray-900 my-5'/>
            <h3 className='text-2xl break-normal lg:pr-14 mb-14'>
              Descubra os novos dados atualizados diariamente sobre a Covid-19 de todos os países do mundo, 
              contendo diversas informações de estatísticas como: novos casos, total de casos, recuperados, etc.
            </h3>
            <Link href="/paises" className='text-2xl text-white rounded bg-indigo-900 hover:bg-indigo-600 transition duration-300 ease-in-out shadow-lg px-14 py-4'> 
              Começar
            </Link>
        </header>
        <div className="flex justify-center items-center px-4 mr-3 mb-2 lg:px-0">
          <Image src="/imgs/logoCovid.png" alt="Logo" width={600} height={800} priority={true} className='animate-bounce-less'/>
        </div>
      </div>
    </div>
  )
}