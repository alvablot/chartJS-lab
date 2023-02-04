import { useState, useEffect } from "react"
//import { Data } from "./Data"
import "./App.css"
import PieChart from "./components/PieChart"
import { BarChart } from "./components/BarChart"

function App() {
  let CD = 0,
    DVD = 0,
    LP = 0

  const [items, setItems] = useState([])
  const [chartData, setChartData] = useState([])
  const [cdAmount, setCdAmount] = useState(0)
  const [dvdAmount, setDvdAmount] = useState(0)
  const [lpAmount, setLpAmount] = useState(0)

  useEffect(() => {
    const fetchAllitems = async () => {
      const data = await fetch("https://examensarb.herokuapp.com/items")
      const response = await data.json()
      response.map((el) => {
        if (el.category === "CD") CD++
        if (el.category === "DVD") DVD++
        if (el.category === "LP") LP++
      })
      setCdAmount(CD)
      setDvdAmount(DVD)
      setLpAmount(LP)
      setItems([...response])
    }
    fetchAllitems()
  }, [])

  useEffect(() => {
    const Data = [
      {
        id: 1,
        category: "CD",
        userGain: cdAmount,
        userLost: 0,
      },
      {
        id: 2,
        category: "DVD",
        userGain: dvdAmount,
        userLost: 0,
      },
      {
        id: 3,
        category: "LP",
        userGain: lpAmount,
        userLost: 0,
      },
    ]

    setChartData({
      labels: Data.map((data) => data.category),
      datasets: [
        {
          label: "Users Gained ",
          data: Data.map((data) => data.userGain),
          backgroundColor: [
            "rgba(75,192,192,0.1)",
            "#c04bbc",
            "#f4c003",
            "#00ff11",
            "#ffffff",
          ],
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    })
  }, [items, cdAmount])

  if (!items[1]) return <>Loading</>

  return (
    <div className="App">
      Antal CD: {cdAmount} <br />
      Antal DVD: {dvdAmount} <br />
      Antal LP: {lpAmount} <br />
      <PieChart chartData={chartData} />
      <BarChart chartData={chartData} />
    </div>
  )
}

export default App
