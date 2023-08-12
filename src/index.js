import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import CurencyService from './services/currencyService';

// function getCurrency(country1, country2) {

// }

function createDropDowns(currencies) {
  let dropDown1 = document.createElement("select");
  let dropDown2 = document.createElement("select");
  const exchangeForm = document.getElementById("exchange");
  exchangeForm.append(dropDown2);
  exchangeForm.append(dropDown1);
  for (let currency in currencies) {
    let option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    dropDown1.append(option);
    dropDown2.append(option.cloneNode(true));//this is a deep clone so that the option is not removed from the first dropDown.
  }
}

window.addEventListener("load", async () => {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
    if (!response.ok) {
      throw Error(`Error fetching rates: ${response.status} ${response.statusText}`);
    }
    const jsonifiedResponse = await response.json();
    const currencies = await jsonifiedResponse.conversion_rates;
    createDropDowns(currencies);
  }
  catch(error) {
    let result = document.querySelector("#result");
    result.innerText = error.message;
  }
});