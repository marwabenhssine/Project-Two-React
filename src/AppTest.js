import { WEATHER_API_KEY, WEATHER_API_URL } from "./components/search/Api"



const AppTest = () => {



  //create onSearchChange
  const handleOnSearchChange = (searchData) => {

    const [lat, lon] = searchData.value.split(" ")

    //Fetch weather for the current day
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    //Fetch Forecast for the next days
    const forescastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
    Promise.all([currentWeatherFetch, forescastFetch])
      .then((async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()
        
        setCurrentWeather
       
      })

    
      )
  }



  return (
    <div className="container">
      

    </div>
  )
}

export default AppTest