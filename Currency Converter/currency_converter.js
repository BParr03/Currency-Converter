const currencies = {
    GBP : "British Pound",
    USD : "American Dollar",
    EUR : "Euro",
    JPY : "Japanese Yen",
    AUD : "Australian Dollar",
    CAD : "Canadian Dollar",
};

const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");
primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies);

function getOptions(data) {
  return Object.entries(data)
    .map(([country, currency]) => `<option value="${country}">${country} | ${currency}</option>`)
    .join("");
}

document.getElementById("button").addEventListener("click", fetchCurrencies);
function fetchCurrencies() {
  const primary = primaryCurrency.value;
  const secondary = secondaryCurrency.value;
  const amount = document.getElementById("amount").value;
  fetch("https://v6.exchangerate-api.com/v6/ec72955bb751fdab20ccd28b/latest/" + primary)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      displayCurrency(data, primary, secondary, amount);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayCurrency(data, primary, secondary, amount) {
  const calculated = amount * data.conversion_rates[secondary];
  document.getElementById("result").setAttribute("style", "display:block");
  document.getElementById("txt-primary").innerText = amount + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText = calculated + " " + secondary;
}