import React, { useState } from 'react'
import {AsyncPaginate} from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions } from './Api'


const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null)
    
    //02
    const handleOnChange = (searchData) => {
      setSearch(searchData);
      onSearchChange(searchData);
    };

    //03 fetch Data by the cities
    const loadOptions = (inputValue) => {

        //we will filter our application by the minPopulation and the namePrefix
        return fetch(
          `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
          geoApiOptions
        )
          .then((response) => response.json())
            .then((response) => {
              //04
                return {
                    options: response.data.map((city) => {
                        //The response should be an object
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                          // label: `${city.name}, ${city.codeCountry}`
                          label: `${city.name}, ${city.country}`
                      }
                  })
              }
          })
                    
            .catch((err) => console.error(err));

    }
       

    return (
        //01
      <AsyncPaginate
        placeholder="search for city"
        debounceTimeout={600} //the response time will be 600ms
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    );
}

export default Search 