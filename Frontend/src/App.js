import { createContext, useEffect, useState } from 'react';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import TabView from './components/TabView/TabView';
import { eurojackpotData } from './eurojackpot-data';
import { vikingData } from './vikingData';
import Results from './components/Results/Results';
import Frequency from './components/NumbersFrequency/Frequency';
import Statistics from './components/Statistics/Statistics';
import Home from './components/Home/Home';
import Loader from './components/Loader/Loader';

export const AppContext = createContext()

function App() {

  // const []
  const [data, setData] = useState([])
  const [blurBackground, setBlurBackground] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [category, setCategory] = useState("Home")

  useEffect(() => {
    let endpoint = ''
    if (activeTab === 0) {
      endpoint = "viking"
    } else {
      endpoint = "eurojackpot"
    }

    fetch(`http://localhost:5500/${endpoint}`)
      .then(res => {return res.json()})
      .then(dbData => setData(dbData))
      .catch(err => console.log(err))


    // const fetchData = async () => {
    //   const res = await fetch(`http://localhost:5000/${endpoint}`)
    //   const numbers = await res.json()
      
    //   if (res.ok) {
    //     setData(numbers)
    //   }
    // } 
    // fetchData()
  }, [activeTab])


  const component = (
    <> 
      {category 
        ? (
            category === "Home" 
              ? <Home /> 
              : (category === "Results" 
                  ? <Results /> 
                  : (category === "Statistics"
                      ? <Statistics />
                      : (category === "Number Frequency"
                          ? <Frequency />
                          : <span>No data</span>
                        )
                    )
                )
          )
        : <span>No data</span>
      }
        
      </>
  )  

 

  return (
    <AppContext.Provider value={{ activeTab, setActiveTab, blurBackground, setBlurBackground, data, setData, category, setCategory  }}>
      <div className="App">
        <div className="wrapper">
          <div className='left'>
            <Sidebar />
          </div>
          <div className='right'>
            {data.length > 0 
              ? <TabView tabs={[{ name: "Viking Lotto", content: component }, { name: "Eurojackpot", content: component }]}/>
              : <Loader />
            }
          </div>
        </div>      
      </div>
    </AppContext.Provider>
  );
}

export default App;
