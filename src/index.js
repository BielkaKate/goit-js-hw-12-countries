import './sass/main.scss';
import fetchCountries from "./js/fetchCountries"
import countriesTmpl from "./templates/countriesTmpl.hbs"

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const { debounce, result } = require("lodash")

const inputEl = document.querySelector(".input_country")
const articleEl = document.querySelector(".countries_list")

inputEl.addEventListener("input", debounce(onInput, 500))
function onInput(e){
    fetchCountries(e.target.value)
    // .then(appendContriesMarkup)
    .then((array) => {
        if(array.length === 1){
            const countryMarkup = array.map((item) => {
                console.log(item); 
                return `<li class = "country-descr"><h1>${item.name}</h1></li>
                <li class = "country-descr"><b>Capital: </b>${item.capital}</li>
                <li class = "country-descr"><b>Population: </b>${item.population}</li>
                <li class = "country-descr"><b>Languages: </b>
                    <ul>
                        <li>${item.languages[0].nativeName}</li>
                    </ul>
                </li>
                <li class = "flag"><img src = ${item.flag} width = "250"></img></li>`})
                return countryMarkup;
        } else {if (array.length >= 10){
            error({ text: 'To many mathes found. Enter a more specific query, please!'})
            return null;
        }
        console.log(array);
        const markup = array.map((item) => {
        console.log(item.name); 
        return `<li>${item.name}</li>`})
        return markup.join("");
    }})
.then((markup) => {
    console.log(markup);
    articleEl.innerHTML = markup;
})
 .catch((error) => {alert('Nothing found')})}

// function appendContriesMarkup(countries){
//     articleEl.insertAdjacentHTML('beforeend', countriesTmpl(countries))
// }
