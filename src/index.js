import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currencyService';

async function getCurrency(countryCode1, countryCode2, amount) {
  try {
    const response = await CurrencyService.getRates(countryCode1, countryCode2, amount);
    if (response.result === "error") {
      throw new Error(`Error fetching rates: ${response[`error-type`]}`);
    }
    showRates(response);
  }
  catch(error) {
    handleError(error);
  }
}

function handleError(error) {
  let result = document.querySelector("#result");
  result.innerText = error.message;
}

function showRates(response) {
  let result = document.querySelector("#result");
  result.innerText = `The coversion rate is ${response.conversion_rate} and the amount is ${response.conversion_result}`;
}

function handleFormSubmission(e) {
  e.preventDefault();
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  getCurrency(from, to, amount);
}

function createDropDowns(currencies) {
  let dropDown1 = document.createElement("select");
  let dropDown2 = document.createElement("select");
  const amount = document.getElementById("amount");
  amount.after(dropDown2);
  amount.after(dropDown1);
  dropDown1.id = "from";
  dropDown2.id = "to";
  let label1 = document.createElement("label");
  label1.innerText = "From: ";
  let label2 = document.createElement("label");
  label2.innerText = "To: ";
  dropDown1.before(label1);
  dropDown2.before(label2);
  for (let currency in currencies) {
    let option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    dropDown1.append(option);
    dropDown2.append(option.cloneNode(true));//this is a deep clone so that the option is not removed from the first dropDown.
  }
  let fakeElement = document.createElement("option");
  fakeElement.value = "fak";
  fakeElement.text = "fak";
  dropDown1.append(fakeElement);
  dropDown2.append(fakeElement.cloneNode(true));//this is a deep clone so that the option is not removed from the first dropDown.
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
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});
