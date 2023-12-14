function fetchHolidays(year, countryCode) {
    return new Promise((resolve, reject) => {
        fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function getHolidays() {
    const yearInput = document.getElementById('yearInput');
    const countryCodeInput = document.getElementById('countryCodeInput');

    const year = yearInput.valueAsNumber || 2023; // Default to 2023 if no valid year provided
    const countryCode = countryCodeInput.value.toUpperCase(); // Get user input and convert to uppercase

    fetchHolidays(year, countryCode)
        .then(data => {
            const holidayData = document.getElementById('holidayData');
            holidayData.innerHTML = ''; // Clear previous data

            data.forEach(holiday => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${holiday.date}</td>
                    <td>${holiday.name}</td>
                    <td>${holiday.localName}</td>
                `;
                holidayData.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
