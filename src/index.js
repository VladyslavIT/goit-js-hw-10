import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries.js';

const inputEl = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

const onSearchCountry = (event) => {
    const name = event.target.value;
    console.log(name);
    fetchCountries(name).then(data => console.log(data));
}



inputEl.addEventListener('input', onSearchCountry);