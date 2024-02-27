import React, { useContext, useEffect, useState } from 'react'
import './frequency.scss'
import { AppContext } from '../../App'
import PlotChart from '../ChartJS/PlotChart'
import Chart from 'chart.js/auto';

const Frequency = () => {

    const context = useContext(AppContext)

    const [numbers, setNumbers] = useState({unique: [], all: []})
    const [games, setGames] = useState(10)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [avg, setAvg] = useState(0)


    useEffect(() => {
         if(games > 100) {
            setGames(context.data.length)
        }
        getNumbersArr()
    }, [context.data, games])


    useEffect(() => {
        findMinMaxAvg(Object.entries(appearances(numbers.unique, numbers.all)).map(item => item[1]))
    }, [numbers])


    const getNumbersArr = () => {
        let arr = []
        let uniqueNumbsArr = []
        let frequencyData = []
        let freaquncyArr = []
        arr.push(context.data.map(item => item.numbers))
        arr = [... new Set(arr.flat())]
        uniqueNumbsArr.push(arr.flat(2).map(item => item.split(","))) 
        frequencyData.push(context.data.slice(context.data.length - games).map(item => item.numbers))
        frequencyData = [... new Set(frequencyData.flat())]
        freaquncyArr.push(frequencyData.flat(2).map(item => item.split(",")))
        setNumbers({unique: [... new Set(uniqueNumbsArr.flat(2).sort((a,b) => a-b))], all: freaquncyArr.flat(2)})     
    }


    const appearances = (arrUnique, arrRepeated) => arrUnique.reduce((ob, valUnique) => {
        ob[valUnique] = arrRepeated.filter(v => valUnique === v).length;
        return ob;
    }, {});


    const findMinMaxAvg = (arr) => {
        setMin(Math.min(...arr))
        setMax(Math.max(...arr))
        const sum = arr.reduce((acc, curr) => acc + curr, 0)
        setAvg(Math.round(sum / arr.length))
    }


    const barChartConfig = {
        type: 'bar',
        data: {
            labels: Object.entries(appearances(numbers.unique, numbers.all)).map(item => item[0]),
            datasets: [
                {
                label: "Frequency",
                backgroundColor: ["#c45850"],
                data: Object.entries(appearances(numbers.unique, numbers.all)).map(item => item[1])
                }
            ]
        },
        options: {            
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
                legend: false
            },
            title: {
                display: true,
                text: 'Numbers Frequency'
            }
        }
    }

    
  return (
    <div className='frequency'>
        <h1>Numbers Frequency</h1>
        <div className="select-data">
            <span>Select the number of last games you want to see:</span>
            <select className='select' name="games" id="games" onChange={(e) => setGames(e.target.value)} defaultValue={games}>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value={context.data.length}>All</option>
            </select>
        </div>
        <div className="chart">
            <PlotChart data={barChartConfig.data} type={barChartConfig.type} options={barChartConfig.options}/>
            
        </div>

        <div className="numbers-container info">
            <span>Hot and Cold numbers</span>
            <div className="description">
                <p>
                    The numbers below are sorted from the most to the least picked number. The color indicates if a number is hot or cold. 
                    Red colors show that the number is very hot, and blue shows that the number is very cold. 
                    Small bubbles on top of the main number are indicators of that number's frequency. 
                    The number inside a small bubble shows how many times this number was picked in the last {games} games.
                </p>
            </div>
            <div className="hot-cold-numbers">
                {
                    Object.entries(appearances(numbers.unique, numbers.all)).sort(([,a], [,b]) => b - a).map((item, index) => (
                        <div className='number' key={index}>
                            <span className={
                                `unique-number ${item[1] === max ? "hot" : (avg < item[1] && item[1] < max ? "warm" : (min < item[1] && item[1] <= avg ? "cold" : (item[1] === min ? "freeze" : null)))}`
                                } title={`Number ${item[0]} is ${item[1] === max ? "hot" : (avg < item[1] && item[1] < max ? "warm" : (min < item[1] && item[1] <= avg ? "cold" : (item[1] === min ? "ice cold" : null)))}`}>
                                    {item[0]}
                            </span>
                            <span className="number-frequency">{item[1]}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Frequency
