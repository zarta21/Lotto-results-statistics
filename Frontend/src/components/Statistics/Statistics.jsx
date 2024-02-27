import React, { useContext, useEffect, useState } from 'react'
import './statistics.scss'
import { AppContext } from '../../App'
import PlotChart from '../ChartJS/PlotChart'
import Chart from 'chart.js/auto';

const Statistics = () => {

    const context = useContext(AppContext)
    const [arr, setArr] = useState([])
    const [games, setGames] = useState(10)
    const [combinationLength, setCombinationLength] = useState(0)
    const [groupedNumbers, setGroupedNumbers] = useState([])


    useEffect(() => {
        setArr(context.data.slice(context.data.length - games).map(item => [item.numbers]))
        setCombinationLength(context.data.map(item => item.numbers).map(el => el.split(','))[0].length)
        setGroupedNumbers(groupNumbersByCustomBins(context.data.slice(Math.max(context.data.length - games, 1)).toReversed().map(num => num.numbers).map(item => item.split(","))))
        if(games > 100) {
            setGames(context.data.length)
        }
    }, [context.data, games])
    

    const stirngsToNumbers = (arrayOfArrays) => {
       return arrayOfArrays.flat(2).map(item => { 
            let newArr = item.split(","); 
            for(let i = 0; i < newArr.length; i++) {
                newArr[i] = parseInt(newArr[i], 10)
            } 
            return newArr
        })
    }


    function findConsecutiveNumbers(arrayOfArrays) {
        let consecutiveNumbers = [];
      
        for (let array of arrayOfArrays) {
            let start = array[0];
            let end = array[0];
            let currentSequence = [start];
          
            for (let i = 1; i < array.length; i++) {
                if (array[i] === end + 1) {
                    end = array[i];
                    currentSequence.push(array[i]);
                } else {
                    if (currentSequence.length > 1) {
                        consecutiveNumbers.push(currentSequence);
                    }
                    start = array[i];
                    end = array[i];
                    currentSequence = [start];
                }
            }

            if (currentSequence.length > 1) {
                consecutiveNumbers.push(currentSequence);
            }
        }

        return consecutiveNumbers;
    }


    function countConsecutiveSequenceOccurrences(arrayOfArrays) {
        let sequenceCounts = {};
        let consecutiveNumbers = findConsecutiveNumbers(arrayOfArrays);

        for (let sequence of consecutiveNumbers) {
            let sequenceKey = sequence.join(',');
            if (sequenceCounts.hasOwnProperty(sequenceKey)) {
                sequenceCounts[sequenceKey]++;
            } else {
                sequenceCounts[sequenceKey] = 1;
            }
        }

        return sequenceCounts;
    }


    function groupNumbersByCustomBins(arrayOfArrays) {
        let bins = {
            "1-10": [],
            "11-20": [],
            "21-30": [],
            "31-40": [],
            "41-50": []
        };

        function determineBinKey(number) {
            let bin = Math.floor(number / 10); 
            if (bin >= 4) bin = 4; 
            return (bin * 10 + 1) + "-" + ((bin + 1) * 10);
        }

        bins = arrayOfArrays.reduce((acc, array) => {
            array.forEach(num => {
                let number = parseInt(num);
                let binKey = determineBinKey(number);

                if (acc.hasOwnProperty(binKey)) {
                    acc[binKey].push(number);
                } else {
                    acc[binKey] = [number];
                }
            });
            return acc;
        }, bins);

        return bins;
    }

    const indexOfMax = () => {
       const index = Object.entries(groupedNumbers)
                        .map(item => Math.round(item[1].length / (combinationLength * games) * 100))
                        .indexOf(
                            Math.max(...Object.entries(groupedNumbers).map(item => Math.round(item[1].length / (combinationLength * games) * 100)))
                        )

        const labels = ["1 - 10", "11 - 20", "21 - 30", "31 - 40", "41 - 50"]

        return labels[index]
    }


    const lineChartConfig = {
        type: 'line',
        data: {
            labels: context.data.slice(Math.max(context.data.length - games, 1)).map(item => item.date),
            datasets: [
                {
                label: "Sum of Numbers",
                data: context.data.slice(Math.max(context.data.length - games, 1)).map(item => item.sumOfNumbers),
                backgroundColor: "#818cf8",
                borderColor: "#818cf8",
                borderRadius: 6,
                pointRadius: 0,
                tension: 0.5,
                }
            ]
        },
        options: {            
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
                legend: false
            },
            scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Game Date',
                            font: {
                                size: 16,
                                weight: 'bold',
                                family: 'Arial'
                            },
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Sum',
                            font: {
                                size: 16,
                                weight: 'bold',
                                family: 'Arial'
                            },
                        },
                        beginAtZero: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Values',
                        }
                    }
                }
        }
    }
    

    const horizontalBarChartConfig = {
        type: 'bar',
        data: {
            labels: ["1 - 10", "11 - 20", "21 - 30", "31 - 40", "41 - 50"],
            datasets: [
                {
                    label: "%",
                    data: Object.entries(groupedNumbers).map(item => Math.round(item[1].length / (combinationLength * games) * 100)),
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#818cf8","#c45850"],
                }
            ]
        },
        options: {            
            indexAxis: 'y',
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: false
            },
            title: {
                display: true,
                text: "`% of numbers by  tens in last ${games} games`",
            }
        }
    }


  return (
    <div className='statistics'>
        <h1>Statistics</h1>
        <div className="select-data">
            <span>Select the number of last games you want to see:</span>
            <select className='select' name="games" id="games" onChange={(e) => setGames(e.target.value)} defaultValue={games}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value={context.data.length}>All</option>
            </select>
        </div>
        <div className="chart">
            <div className="chart-data info">
                <span>Sum of numbers chart in the last {games} games</span>
            </div>
            <PlotChart data={lineChartConfig.data} type={lineChartConfig.type} options={lineChartConfig.options}/>
            <div className="description">
                <p>
                    The sum of numbers is the sum of all main numbers drawn in the game ({context.data[context.data.length - 1].numbers.split(',').join("+")}).
                </p>
            </div>
        </div>
        <div className="chart">
            <div className="chart-data info">
                <span>Percentage (%) view of groups of tens in the last {games} games</span>
            </div>
            <PlotChart data={horizontalBarChartConfig.data} type={horizontalBarChartConfig.type} options={horizontalBarChartConfig.options} />
        </div>
        <div className="description">
            <p>
                Numbers are grouped by category of tens. First category "1-10" has numbers from 1 to 10. Second category "11-20"
                contains numbers from 11 to 20. And so on. Chart shows how many percantages of all numbers contain each group.
                We can see from chart that most draw numbers from the last {games} games are from group {indexOfMax()}.
            </p>
        </div>
        <div className="consecutive-numbers info">
            <span>Consecutive numbers pairs</span>
            <div className="description">
                <p>
                   Two numbers that follow each other in order are called two consecutive numbers. For example, 1 and 2 are two consecutive numbers.
                   Below, you can see which consecutive pairs appear in the last {games} games.
                </p>
            </div>
            <div className="header">
                <span>Number</span>
                <span></span>
                <span>Frequency</span>
            </div>
            {context.data && Object.entries(
                countConsecutiveSequenceOccurrences(stirngsToNumbers(arr)))
                    .sort(([,a], [,b]) => b - a)
                    .map((item, index) => (
                        <div className="numbers-sequency" key={index}>
                            <span className='numbers-pair'>{item[0].split(",").map((num, index) => <span key={index} className='number'>{num}</span>)}</span>
                            <span className='x'>x</span>
                            <span className='times'>{item[1]}</span>
                        </div>
                    ))
            }
        </div>
    </div>
  )
}

export default Statistics
