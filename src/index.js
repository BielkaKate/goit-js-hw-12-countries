import './sass/main.scss';
import fetchCountries from "./js/fetchCountries"
import countriesTmpl from "./templates/countriesTmpl.hbs"
import countryTmpl from './templates/countryTmpl.hbs'

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const { debounce, result } = require("lodash")

const inputEl = document.querySelector(".input_country")
const countriesList = document.querySelector(".countries_list")
const countryInfo = document.querySelector(".country")

inputEl.addEventListener("input", debounce(onInput, 500))
function onInput(e){
    fetchCountries(e.target.value)
    .then(array => {
        if(array.length === 1){
            countriesList.innerHTML = ""
            return (countryInfo.innerHTML = countryTmpl(...array))
            
        }
        if(array.length >= 2 && array.length <= 10){
            countryInfo.innerHTML = ""
            return (countriesList.innerHTML = countriesTmpl(array))
            
        }
        error({ text: 'To many mathes found. Enter a more specific query, please!'})
    })
    .catch(error => {
     alert('Nothing found');
});
}

