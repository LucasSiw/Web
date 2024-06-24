document.addEventListener('DOMContentLoaded', function() {
    function loadFinanceData() {
        let financeEntries = JSON.parse(localStorage.getItem('financeEntries')) || [];
        const monthSelect = document.getElementById('monthSelect');
        const financeData = document.getElementById('financeData');

        
        function filterByMonth(entries, month) {
            if (month === 'all') {
                return entries;
            } else {
                return entries.filter(entry => {
                    const entryMonth = new Date(entry.date).getMonth();
                    return entryMonth === months[month];
                });
            }
        }

        const months = {
            'january': 0, 'february': 1, 'march': 2,
            'april': 3, 'may': 4, 'june': 5,
            'july': 6, 'august': 7, 'september': 8,
            'october': 9, 'november': 10, 'december': 11
        };

        function renderTable(entries) {
            financeData.innerHTML = '';

            entries.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.date}</td>
                    <td>${entry.category}</td>
                    <td>${entry.description}</td>
                    <td>${entry.value}</td>
                `;
                financeData.appendChild(row);
            });
        }

        monthSelect.addEventListener('change', function() {
            const selectedMonth = this.value;
            const filteredEntries = filterByMonth(financeEntries, selectedMonth);
            renderTable(filteredEntries);
        });

        renderTable(financeEntries);
    }

    loadFinanceData();
});
