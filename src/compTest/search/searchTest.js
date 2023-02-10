import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { geoApiOptions, GEO_API_URL } from "./searchApis";



const SearchTest = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

//   01 create handleOnChange 
    const handleOnChange = (newData) => {
        setSearch(newData)
        onSearchChange(newData)
}
    

    //03 fetch Data by the cities
    const loadOptions = (inputValue) => {
        return fetch(
          //this is a filtering by optional criteria : by minPopulation and namePrefix
          `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
          geoApiOptions
        )
            .then((response) => response.json())
            .then((response) => {


              //we create this one on Object cauz 'AsyncPaginate' needs an object response
              /*In JavaScript, return { hello } returns an
            //object with a property named hello with the
            value of the hello variable.return hello simply returns the value of the hello variable.
              - we use a return {} when we fetch data from an API/DB we return and empty object if the data not exist we return it instead to return null or undefined
            */
                    return {
                options: response.data.map((city) => {
                  return {
                    value: `${city.latitude}, ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                  };
                }),
              };
            }
             
            )
        .catch((err) => console.log(err)) 

     }



  return (
    <>
      <AsyncPaginate
        placeholder="search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        //02
        loadOptions={loadOptions}
      />

      </>
  );
};

export default SearchTest