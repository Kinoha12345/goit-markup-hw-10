import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    ul: document.querySelector('.country-list'),
    div: document.querySelector('.country-info')
}
let inputValue = '';

refs.input.addEventListener('input', debounce(getInput, DEBOUNCE_DELAY))

function contryList (data){
  const markup = data
  .map(
    item => `<li>
    <div class ="block"><img src="${item.flags.svg}" alt="">
    <p class ="text-name"><b> ${item.name.common}</b></p></div>
</li>`).join('');
return markup;
}

function dataItem (data){
  const dataItem = data
  .map(
    item => `<div class ="block"><img src="${item.flags.svg}" alt="">
    <p class ="text-name"><b> ${item.name.common}</b></p></div>
    <p><b>Capital:</b> ${item.capital}</p>
    <p><b>Population:</b> ${item.population}</p>
    <p><b>Languages:</b> ${Object.values(item.languages)}</p>`).join('');
    return dataItem;
}

function getInput() {
  inputValue = refs.input.value.trim();
  if (inputValue === '') {
    refs.ul.innerHTML ='';
    refs.div.innerHTML = '';
    return};
    fetchCountries(inputValue).then(data => {
   
      if (data.length >= 10) {
        refs.ul.innerHTML = '';
        refs.div.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
      }
    if (data.length > 1) {
      refs.ul.innerHTML ='';
      refs.div.innerHTML = '';
      refs.ul.insertAdjacentHTML('afterbegin', contryList(data));
      return;
    }
    refs.ul.innerHTML = '';
    
    refs.div.innerHTML = dataItem(data);
  }).catch(()=>{
    Notiflix.Notify.failure("Oops, there is no country with that name");
  })
}