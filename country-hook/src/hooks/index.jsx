import { useState, useEffect } from 'react'
import CountriesService from '../services/countriesService'

export const useCountry = (name)=> {
    const [country, setCountry] = useState(null)

    useEffect(() => {
      if (name != '') {
         CountriesService.getByName(name).then(data=>{
           setCountry(data)
         })
         
      }
     
    },[name])
  
    return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}


