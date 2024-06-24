google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            const month = new URLSearchParams(window.location.search).get('month');
            const financeEntries = JSON.parse(localStorage.getItem('financeEntries')) || [];

            const monthMapping = {
                january: 0,
                february: 1,
                march: 2,
                april: 3,
                may: 4,
                june: 5,
                july: 6,
                august: 7,
                september: 8,
                october: 9,
                november: 10,
                december: 11
            };

            const filteredEntries = financeEntries.filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate.getMonth() === monthMapping[month];
            });

            if (filteredEntries.length === 0) {
                document.getElementById('donutchart').innerHTML = '<p class="text-center">Sem dados para exibir</p>';
                return;
            }

            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Categoria');
            data.addColumn('number', 'Valor');

            const summary = filteredEntries.reduce((acc, entry) => {
                if (!acc[entry.category]) {
                    acc[entry.category] = 0;
                }
                acc[entry.category] += parseFloat(entry.value);
                return acc;
            }, {});

            for (const category in summary) {
                data.addRow([category, summary[category]]);
            }

            const options = {
                title: 'Distribuição de Gastos por Categoria',
                pieHole: 0.4,
                width: '100%',
                height: '500px'
            };

            const chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
        }