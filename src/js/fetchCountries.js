import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
export default fetchCountries;


function fetchCountries(query){
        let url = `https://restcountries.eu/rest/v2/name/${query}`
        return fetch(url)
        .then(response => {
            if (response.status === 200){
                return response.json();
                
            } else {
                // alert('Nothing found');
                throw Error(response.status);               
            }
        })
        .catch((error) => {
            console.log(error);
        })
        
            // .catch((error) => {console.log(error);
            //     alert('Nothing found')
            // if (query === ''){alert.clear()}})
  }

