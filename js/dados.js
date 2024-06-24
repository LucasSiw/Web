function addEntry() {
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const value = document.getElementById('value').value;
    const date = document.getElementById('date').value;

    if (category && description && value && date) {
        const entry = { category, description, value, date };
        let entries = JSON.parse(localStorage.getItem('financeEntries')) || [];
        entries.push(entry);
        localStorage.setItem('financeEntries', JSON.stringify(entries));

        document.getElementById('financeForm').reset();
        alert('Entrada adicionada com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function viewGraph() {
    const month = document.getElementById('monthSelect').value;
    window.location.href = `grafico.html?month=${month}`;
}