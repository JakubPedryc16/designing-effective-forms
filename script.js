let clickCount = 0;

const countryInput = document.getElementById('country');
const countryCodeInput = document.getElementById('countryCode');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => ({
            name: country.name.common,
            code: country.cca2
        })).sort((a, b) => a.name.localeCompare(b.name));

        const datalist = document.getElementById('countries');
        datalist.innerHTML = ''; 

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            datalist.appendChild(option);
        });

    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

fetchAndFillCountries();


function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            if (countryInput) {
                countryInput.value = country;
                getCountryCode(country);
            }
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd pobierania danych');
            }
            return response.json();
        })
        .then(data => {
            const code = data[0]?.idd?.root + (data[0]?.idd?.suffixes?.[0] || '');
            if (code && countryCodeInput) {
                countryCodeInput.value = code;
            }
        })
        .catch(error => {
            console.error('Wystąpił błąd:', error);
        });
}

countryInput.addEventListener('change', () => {
    const selectedCountry = countryInput.value;
    getCountryCode(selectedCountry);
});

(() => {
    document.addEventListener('click', handleClick);

    fetchAndFillCountries().then(() => {
        getCountryByIP();
    });
})();

myForm.addEventListener('keydown', (event) => {
    const isEnter = event.key === 'Enter';
    const isTextarea = event.target.tagName === 'TEXTAREA';
    if (isEnter && !isTextarea) {
        event.preventDefault();
        myForm.requestSubmit();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const vatCheckbox = document.getElementById('vatUE');
    const vatSection = document.getElementById('vatSection');
    const vatInput = document.getElementById('vatNumber');

    vatSection.style.display = 'none';
    vatInput.disabled = true;

    vatCheckbox.addEventListener('change', () => {
        if (vatCheckbox.checked) {
            vatSection.style.display = 'block';
            vatInput.disabled = false;
        } else {
            vatSection.style.display = 'none';
            vatInput.disabled = true;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fillInvoiceButton = document.getElementById('fillInvoiceButton');
    const invoiceDataTextarea = document.getElementById('invoiceData');

    fillInvoiceButton.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const street = document.getElementById('street').value;
        const zipCode = document.getElementById('zipCode').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;

        const invoiceData = `
            Imię i nazwisko: ${firstName} ${lastName}
            Adres: ${street}, ${zipCode} ${city}, ${country}
        `;
        
        invoiceDataTextarea.value = invoiceData.trim(); 
    });
});




