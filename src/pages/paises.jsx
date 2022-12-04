import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Nav from '../templates/Nav';

export default function Countries() {
    const router = useRouter()

    const [route, setRoute] = useState()
    const [countriesName, setCountriesName] = useState([])
    const [countriesData, setCountriesData] = useState([])
    const [countriesBackup, setCountriesBackup] = useState([])
    
    useEffect(() => {
        const options = {
            headers: new Headers({ 
                'X-RapidAPI-Key': process.env.key,
                'X-RapidAPI-Host': process.env.host,
            })
        }
        fetch('https://covid-193.p.rapidapi.com/countries', options)
            .then(resp => resp.json())
            .then(obj => {
                const countries = obj.response.filter(country => !(['Guam','Puerto-Rico','US-Virgin-Islands','Diamond-Princess-', 'MS-Zaandam-'].includes(country)))
                setCountriesName(countries)
                setRoute(countries[0])
                fetch(`https://covid-193.p.rapidapi.com/statistics`, options)
                    .then(resp => resp.json())
                    .then(obj => {
                        const data = obj.response.filter(country => (countries.includes(country.country)))
                        setCountriesData(data)
                        setCountriesBackup(data)
                })
            })
    }, [])
    
    const filterSearch = (e, search) => {
        if (search === 'Todos')
            setCountriesData(countriesBackup)
        else
            setCountriesData(countriesBackup.filter(countryData => countryData.country.charAt(0) === search))
    }

    const renderCountriesOptions = () => {
        return countriesName.map((country, idx) => {
            return (
                <option key={idx} value={country}>
                    {country}
                </option>
            )
        })
    }

    const renderLettersOptions = () => {
        const letters = ['Todos','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Y','Z']
        return letters.map((letter, idx) => {
            return (
                <button key={idx} onClick={e => filterSearch(e, e.target.value)} value={letter}
                    className="text-2xl font-semibold text-indigo-900 hover:text-indigo-600 transition duration-300 ease-in-out mr-4">
                    {letter}
                </button>
            )
        })
    }

    const renderCountriesData = () => {
        if (!('0' in countriesData))
            return
        return countriesData.map((country, idx) => {
            const time = new Date(country.time).toLocaleString('pt-br')
            return (
                <tr key={idx} onClick={e => router.push(`paises/${country.country}`)}
                    className={`text-lg font-semibold border-t ${ idx % 2 === 1 ? 'bg-indigo-50' : false} hover:bg-indigo-900 hover:text-white cursor-pointer`}>
                    <td className='px-8 py-4'>{country.country}</td>
                    <td className='px-8 py-4'>{country.cases.total}</td>
                    <td className='px-8 py-4'>{country.deaths.total === null ? 0 : country.deaths.total}</td>
                    <td className='px-8 py-4 hidden sm:table-cell'>{country.population === null ? 0 : country.population}</td>
                    <td className='px-8 py-4 hidden lg:table-cell'>{time}</td>
                </tr>
            )
        })
    }

    const submitPage = (e) => {
        e.preventDefault()
        router.push(`paises/${route}`)
    }

    return (
        <div className="pb-14">
            <Nav page='statistics'/>
            <header className="mt-14 px-14">
                <h3 className="text-2xl font-bold text-indigo-900">Covid-19</h3>
                <h1 className="text-5xl mb-2">Estatisticas <span className="font-bold">Coronavírus</span></h1>
                <h2 className="text-xl text-gray-700 mb-2">Atualizado Diariamente</h2>
                <hr className="border-none h-1 bg-gray-400 w-[55%] mb-4"/>
                {renderLettersOptions()}
                <form onSubmit={submitPage} className='flex mt-4'>
                    <select 
                        value={route}
                        onChange={e => setRoute(e.target.value)}
                        className="block w-64 bg-gray-100 border border-indigo-900 text-gray-800 p-2 rounded focus:outline-none focus:bg-white focus:border-indigo-600">
                        {renderCountriesOptions()}
                    </select> 
                    <button type="submit" className="text-lg text-white rounded bg-indigo-900 hover:bg-indigo-600 transition duration-300 ease-in-out mx-4 px-3 flex justify-center items-center">Pesquisar</button>
                </form>
            </header>
            <main className={`flex justify-center align-center mt-6 ${countriesData.length === 0? 'pt-36' : false} px-14`}>
                { countriesData.length === 0 ? 
                    <div className={`animate-spin ease-linear rounded-full h-20 w-20 pt-14
                        border-8 border-l-gray-400 border-r-gray-400 border-b-gray-400 border-t-indigo-900`}/>
                    :
                    <table className="table-fixed bg-white shadow-2xl rounded-xl overflow-hidden text-center mt-8 w-full">
                        <thead className="bg-indigo-900 text-lg text-white">
                            <tr>
                                <th className="px-8 py-4 xl:w-[40%]">País</th>
                                <th className="px-8 py-4">Casos</th>
                                <th className="px-8 py-4">Óbitos</th>
                                <th className="px-8 py-4 hidden sm:table-cell">População</th>
                                <th className="px-8 py-4 hidden lg:table-cell">Atualização</th>
                            </tr>
                        </thead>
                        <tbody>
                            { renderCountriesData() }
                        </tbody>
                    </table>
                }
            </main>
        </div>
    )
}