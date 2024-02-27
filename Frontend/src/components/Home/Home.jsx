import React from 'react'
import './home.scss'

const Home = () => {
  return (
    <div className='home'>
        <h1>Lottery Numbers Statistics</h1>
         <div className="numbers-container">
            <div className="description">
                <p>
                    Welcome to the website for Lottery Numbers Statistics. Here, 
                    find comprehensive historical data, frequency of numbers, hot and cold numbers, 
                    and various statistics for <strong>Viking Lotto</strong> and <strong>Eurojackpot</strong> games! 
                </p>
            </div>
        </div>
    </div>
  )
}

export default Home
