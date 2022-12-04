import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Image from "next/image";
import Nav from '../../templates/Nav'


export default function CountryDetail() {
    const router = useRouter()

    const [country, setCountry] = useState({})
    const [date, setDate] = useState('')
    
    useEffect(() => {
        if (!router.isReady)
            return
        const options = {
            headers: new Headers({ 
                'X-RapidAPI-Key': process.env.key,
                'X-RapidAPI-Host': process.env.host,
            })
        }
        const date = new Date().toISOString('en-us').substring(0, 10)
        setDate(date)
        fetch(`https://covid-193.p.rapidapi.com/history?country=${router.query.pais}&day=${date}`, options)
            .then(resp => resp.json())
            .then(obj => setCountry(obj.response[0]))
    }, [router.isReady])
    
    const submitDate = e => {
        e.preventDefault()

        const options = {
            headers: new Headers({ 
                'X-RapidAPI-Key': process.env.key,
                'X-RapidAPI-Host': process.env.host,
            })
        }
        fetch(`https://covid-193.p.rapidapi.com/history?country=${router.query.pais}&day=${date}`, options)
            .then(resp => resp.json())
            .then(obj => {
                if (obj.response.length !== 0) 
                    setCountry(obj.response[0])
                else
                    setCountry({ error: '' })
            })
    }

    const changeFormateDate = oldDate => oldDate.split("-").reverse().join("-")

    return (
        <div className={`h-screen ${ Object.keys(country).length === 0 ? 'flex justify-center items-center' : ''}`}>
            { Object.keys(country).length === 0 ?
            <div className={`animate-spin ease-linear rounded-full h-40 w-40 pt-14
            border-8 border-l-gray-400 border-r-gray-400 border-b-gray-400 border-t-indigo-900`}/> :
            ( Object.keys(country).length === 1 ?
            <>
                <Nav />
                <div className="grid lg:grid-cols-2 text-center lg:text-start">
                    <div className="mb-8 lg:mb-0">
                        <header className='px-14 mt-14'>
                            <h1 className="text-5xl mb-2">Painel Covid-19:</h1>
                            <h2 className="text-xl text-gray-700 mb-2">Informações do dia { changeFormateDate(date) }</h2>
                            <hr className="border-none h-1 bg-gray-400 lg:w-[100%] mb-4"/>
                            <form onSubmit={submitDate} className='flex text-lg justify-center lg:justify-start items-center'>
                                <label htmlFor="date" className="font-semibold mr-4">Outros dias:</label>
                                <input type="date" name="date" id="date" value={date} onChange={e => setDate(e.target.value)} 
                                    min='2020-06-02' max={new Date().toISOString('en-us').substring(0, 10)}
                                    className='bg-gray-100 border border-indigo-900 text-gray-800 p-2 rounded focus:outline-none focus:bg-white focus:border-indigo-600'/>
                                <button type="submit" className='text-gray-200 rounded bg-indigo-900 hover:bg-indigo-600 transition duration-300 ease-in-out ml-2 px-4 py-2'>
                                    Pesquisar
                                </button>
                            </form>
                        </header>
                        <main className='px-14 mt-2 text-lg font-semibold'>
                            <p>Não Há Dados Cadastrados Sobre este Dia!</p>
                        </main>
                    </div>
                    <div className="place-self-center px-4 lg:px-2 mb-4 pt-0 lg:pt-3">
                        <Image src="/imgs/statisticsCovid.png" alt="statistics" width={550} height={800} priority={true}/>
                    </div>
                </div>
            </>
            :
            <>
                <Nav />
                <div className="grid lg:grid-cols-2 text-center lg:text-start">
                    <div className="mb-8 lg:mb-0">
                        <header className='px-14 mt-14'>
                            <h1 className="text-5xl mb-2">Painel Covid-19: <span className="font-bold">{ country.country }</span></h1>
                            <h2 className="text-xl text-gray-700 mb-2">Informações do dia { changeFormateDate(country.day) }</h2>
                            <hr className="border-none h-1 bg-gray-400 lg:w-[100%] mb-4"/>
                            <form onSubmit={submitDate} className='flex text-lg justify-center lg:justify-start items-center'>
                                <label htmlFor="date" className="font-semibold mr-4">Outros dias:</label>
                                <input type="date" name="date" id="date" value={date} onChange={e => setDate(e.target.value)} 
                                    min='2020-06-02' max={new Date().toISOString('en-us').substring(0, 10)}
                                    className='bg-gray-100 border border-indigo-900 text-gray-800 p-2 rounded focus:outline-none focus:bg-white focus:border-indigo-600'/>
                                <button type="submit" className='text-gray-200 rounded bg-indigo-900 hover:bg-indigo-600 transition duration-300 ease-in-out ml-2 px-4 py-2'>
                                    Pesquisar
                                </button>
                            </form>
                        </header>
                        <main className='px-14 mt-2 text-lg font-semibold'>
                            <div className="mb-6 lg:mb-4">
                                <p className="text-4xl font-semibold mb-2">Casos</p>
                                <hr className="border-none h-1 bg-indigo-900 mb-2 mx-auto lg:mx-0 w-[50%] lg:w-[70%]"/>
                                <p className="mb-2">Total: {country.cases.total ? country.cases.total : 0}</p>
                                <p className="mb-2">Ativos: {country.cases.active ? country.cases.active : 0}</p>
                                <p className="mb-2">Novos: {country.cases.new ? country.cases.new : '+0'}</p>
                                <p className="mb-2">Recuperados: {country.cases.recovered ? country.cases.recovered : 0}</p>
                                <p>Críticos: {country.cases.critical ? country.cases.critical : 0}</p>
                            </div>
                            <div className="mb-6 lg:mb-4">
                                <p className="text-4xl font-semibold mb-2">Óbitos</p>
                                <hr className="border-none h-1 bg-indigo-900 mb-2 mx-auto lg:mx-0 w-[50%] lg:w-[70%]"/>
                                <p className="mb-2">Total: {country.deaths.total ? country.deaths.total : 0}</p>
                                <p>Novos: {country.deaths.new ? country.deaths.new : 0}</p>
                            </div>
                            <div className="mb-0 lg:mb-6">
                                <p className="text-4xl font-semibold mb-2">Testes</p>
                                <hr className="border-none h-1 bg-indigo-900 mb-2 mx-auto lg:mx-0 w-[50%] lg:w-[70%]"/>
                                <p>Total: {country.tests.total ? country.tests.total : 0}</p>
                            </div>
                        </main>
                    </div>
                    <div className="place-self-center px-4 lg:px-2 mb-4 pb:0 lg:pb-16">
                        <Image src="/imgs/statisticsCovid.png" alt="statistics" width={550} height={800} priority={true}/>
                    </div>
                </div>
            </>
            )
            }
        </div>
    )
}