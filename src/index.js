import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    ul: document.querySelector('.country-list'),
    div: document.querySelector('.country-info')
}

refs.input.addEventListener('input', debounce(getInput, DEBOUNCE_DELAY))


function getInput() {
    const inputValue = refs.input.value;
    fetchCountries(inputValue).then(data => {
      const markup = data
        .map(item => `<li>
     <img src="${item.flags.svg}">
   </li>`,
        )
        .join('');
      const dataItem = data
        .map(
          item => `<li>
     <img src="${item.flags.svg}">
   </li>`
        )
        .join('');
  console.log(inputValue);
      if (data.length > 1) {
        refs.ul.insertAdjacentHTML('afterbegin', markup);
      }
      if (data.length > 10) {
        alert('Too many matches found. Please enter a more specific name.');
      }
      // if (data.length === 1) {
      //   refs.div.innerHTML();
      // }
    });
  }


