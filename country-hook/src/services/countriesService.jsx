import axios from 'axios'
const baseUrl ='https://studies.cs.helsinki.fi/restcountries/'
const getByName = (name) => {
    return axios.get(`${baseUrl}/api/name/${name}`)
    .then(response =>{
        console.log(response)
        return { found: true,  data : { name : response.data.name.common, capital : response.data.capital, population : response.data.population, flag : response.data.flags.png} };
    }).catch((error) => {
        console.log(error)
        return { found: false };
    })

}


export default { getByName }