import React, { useContext, useEffect, useState } from 'react'
import './results.scss'
import { AppContext } from '../../App'

const Results = () => {

    const context = useContext(AppContext)

    const [filteredData, setFilteredData] = useState([])
    const [date, setDate] = useState({ year: new Date().getFullYear(), month: new Date().getMonth()+1})
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(15)
    const [extraNumbers, setExtraNumbers] = useState('')

    const headers = ["date", "numbers", `${extraNumbers}`]

    useEffect(() => {
        if (context.activeTab === 0) {
            setExtraNumbers("viking")
        } else {
            setExtraNumbers("jack")
        }
    }, [context.data, context.activeTab, context.category])


    useEffect(() => {
        resetFilters()
        setPage(0)
    }, [context.data, extraNumbers])


    const handleFilter = () => {
        setFilteredData(
            context.data.map(item => Object.keys(item).reduce((result, key) => {
                if(headers.includes(key)) {
                    result[key] = item[key]
                }
                return result
            }, {})).filter(
                item => {
                    for (let property in item) { 
                        if (item.hasOwnProperty(property) && item[property].split("/")[1] === date.month && item[property].split("/")[2] === date.year) {
                            return property
                        } else {
                            return null
                        }
                    }
                    return false
                }
            )
        )
    }

    const resetFilters = () => {
        setFilteredData(context.data.map(item => Object.keys(item).reduce((result, key) => {
        if(headers.includes(key)) {
            result[key] = item[key]
        }
        return result
    }, {})));
        setDate({ year: new Date().getFullYear(), month: new Date().getMonth()+1})
    }


    const prev = () => {
        setPage(page - 1 > -1 ? page - 1 : page)
    }


    const next = () => {
        setPage(page + 1 < filteredData.length / pageSize ? page + 1 : page)
    }


    const getYears = () => {
        let arr = []
        let yearsArr = []
        arr.push(context.data.map(item => item.date))
        arr = [...new Set(arr)]
        yearsArr.push(arr.flat(2).map(item => parseInt(item.split("/")[2], 10)))        
        
        return [...new Set(arr.flat(2).map(item => new Date(item.split('/').reverse().join('/')).toLocaleDateString("en-GB").split("/")[2]))]
    }


     const months = [
        '1 January', '2 February', '3 March', '4 April', '5 May', '6 June', '7 July', '8 August', '9 September', '10 October', '11 November', '12 December'
    ]
    
   
  return (
    <div className='results'>
        <h1>Results</h1>
        <div className="filter">
            <div className="page-rows select-data">
                <h5>Results per page:</h5>
                <select className='select' name="pageSize" id="pageSize" onChange={(e) => setPageSize(e.target.value)} defaultValue={pageSize}>
                    <option value="10" >10</option>
                    <option value="15" >15</option>
                    <option value="20" >20</option>
                    <option value="25" >25</option>
                    <option value={context.data.length} >All</option>
                </select>
            </div>
            <div className="months select-data">
                <h5>Month:</h5>
                <select className='select' name="month" id="month" onChange={(e) => setDate({...date, month: e.target.value})} defaultValue={date.month}>
                    {months.map((item, index) => (
                        <option key={index} value={item.split(" ")[0]}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="years select-data">
                <h5>Year:</h5>
                <select className='select' name="year" id="year" onChange={(e) => setDate({...date, year: e.target.value})} defaultValue={date.year}>
                    {getYears().toReversed().map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="searchBtn">
                <button onClick={handleFilter}>Search</button>
                <button onClick={resetFilters}>Reset</button>
            </div>
        <div className='table-container'>
            {context.data && (
                <>
                <table>
                    <thead>
                        <tr>
                            {headers.map((item, index) => (
                                <th key={index}>
                                    {item.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(filteredData.toReversed().slice(pageSize * page, pageSize * page + pageSize)).map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, index2) => (
                                    <td key={index2}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="buttons">
                    <button onClick={() =>setPage(0)}>{'<<'}</button>
                    <div className="centerBtn">
                        <button onClick={prev}>{'<'}</button>
                        <label>{page + 1}</label>
                        <button onClick={next}>{'>'}</button>
                    </div>
                    <button onClick={() => setPage(Math.trunc(filteredData.length / pageSize))}>{'>>'}</button>
                </div>
                </>
            )}
        </div>
        
    </div>
  )
}

export default Results
