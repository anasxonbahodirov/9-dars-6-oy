const currencyConverter =
  "https://currency-converter-pro1.p.rapidapi.com/convert";
const currencies = "https://currency-converter-pro1.p.rapidapi.com/currencies";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "bf6857a44emshc592342b17fe996p146e36jsnf1d9996e2518",
    "x-rapidapi-host": "currency-converter-pro1.p.rapidapi.com",
  },
};
const form = document.querySelector('form');
const input = document.querySelector('input');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const error = document.querySelector('#error');
const result = document.querySelector('#result');

// Ma'lumot olish funksiyasi
const getData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    return null; // Agar xatolik bo'lsa, null qaytarish
  }
};

// Valyutalar ro'yxatini yaratish
const drawCurrencies = async () => {
  const currency = await getData(currencies, options);

  if (currency && currency.result) {
    from.innerHTML = '<option disabled selected>Select currency</option>';
    to.innerHTML = '<option disabled selected>Select currency</option>';

    Object.entries(currency.result).forEach(([key, value]) => {
      from.innerHTML += `<option value="${key}">${value}</option>`;
      to.innerHTML += `<option value="${key}">${value}</option>`;
    });
  } else {
    console.error("Valyutalar ma'lumotini olishda xatolik.");
    error.textContent = "Valyutalar ma'lumotini olishda xatolik.";
  }
};

// Konvertatsiya qilish funksiyasi
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Forma yuborilishini oldini olish

  const amount = input.value;
  const fromCurrency = from.value;
  const toCurrency = to.value;

  if (!amount || !fromCurrency || !toCurrency) {
    error.style.display = 'block';
    error.textContent = 'Barcha maydonlarni to\'ldiring';
    error.style.animation = 'fadeIn 0.5s ease-in-out'; // Xato ko'rsatish animatsiyasi
    return;
  }

  const url = `${currencyConverter}?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
  const conversionResult = await getData(url, options);

  if (conversionResult && conversionResult.result) {
    result.textContent = `${amount} ${fromCurrency} = ${conversionResult.result} ${toCurrency}`;
    result.style.color = 'green';
    result.style.animation = 'fadeInResult 0.8s ease-in-out'; // Natija ko'rsatish animatsiyasi
    error.style.display = 'none'; // Xatoni yashirish
  } else {
    error.style.display = 'block';
    error.textContent = 'Konvertatsiya qilishda xatolik yuz berdi';
    error.style.animation = 'fadeIn 0.5s ease-in-out';
  }
});

drawCurrencies();
