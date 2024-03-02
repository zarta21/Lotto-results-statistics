import { createContext, useEffect, useRef, useState } from 'react';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import TabView from './components/TabView/TabView';
import Results from './components/Results/Results';
import Frequency from './components/NumbersFrequency/Frequency';
import Statistics from './components/Statistics/Statistics';
import Home from './components/Home/Home';
import Loader from './components/Loader/Loader';

export const AppContext = createContext()

function App() {

  const [data, setData] = useState([])
  const [status, setStatus] = useState({ loading: false, error: false})
  const [blurBackground, setBlurBackground] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [category, setCategory] = useState("Home")

  const abortControllerRef = useRef(null)

  useEffect(() => {
    let endpoint = ''
    if (activeTab === 0) {
      endpoint = "viking"
    } else {
      endpoint = "eurojackpot"
    }

    const fetchData = async () => {
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()

      setStatus({ loading: true })
      setCategory("Loading")

      try {
        const res = await fetch(`https://front-end-quiz.herokuapp.com/${endpoint}`, {
          signal: abortControllerRef.current?.signal
        })

        const dbData = await res.json()
        setData(dbData.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('/'))
            const dateB = new Date(b.date.split('/').reverse().join('/'))

            return dateA - dateB
        }))

      } catch (err) {
        if (err.name === "AbortError") {
          return
        }
        setStatus({ error: err })
        alert(`Ups...\n${err.message}\n\nTry again later!`)
        setCategory("Error")
      } finally {
        setStatus({ loading: false})
        setCategory(category)
      }
    }

    fetchData()

  }, [activeTab])


  const getContent = (category) => {
  const content = {
    "Loading": <Loader />,
    "Error": <span>Ups... Try again later!</span>,
    "Home": <Home />,
    "Results": <Results />,
    "Statistics": <Statistics />,
    "Number Frequency": <Frequency />,
    default: <Home />
  }

  return content[category] ?? content.default
}

 

  return (
    <AppContext.Provider value={{ activeTab, setActiveTab, blurBackground, setBlurBackground, data, setData, category, setCategory  }}>
      <div className="App">
        <div className="wrapper">
          <div className='left'>
            <Sidebar />
          </div>
          <div className='right'>
            <TabView tabs={[{ name: "Viking Lotto", content: getContent(category) }, { name: "Eurojackpot", content: getContent(category) }]}/>
          </div>
        </div>      
      </div>
    </AppContext.Provider>
  );
}

export default App;
