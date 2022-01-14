const contris = 'https://restcountries.com/v3.1/name/';
const params = '?fields=name,capital,population,flags,languages';
const fetchCountries = function fetchCountries(url) {
    console.log(url);
    return fetch(contris + url + params).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
    }
    
export default fetchCountries;