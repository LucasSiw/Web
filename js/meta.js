google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            const goals = JSON.parse(localStorage.getItem('financeGoals')) || [];
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Meta');
            data.addColumn('number', 'Progresso (%)');

            goals.forEach(goal => {
                data.addRow([goal.description, (goal.currentAmount / goal.targetAmount) * 100]);
            });

            const options = {
                title: 'Progresso das Metas Financeiras',
                width: '100%',
                height: '500px',
                pieHole: 0.4
            };

            const chart = new google.visualization.PieChart(document.getElementById('goal_chart'));
            chart.draw(data, options);
        }

        function addGoal() {
            const description = document.getElementById('goalDescription').value;
            const targetAmount = parseFloat(document.getElementById('goalTargetAmount').value);
            const currentAmount = parseFloat(document.getElementById('goalCurrentAmount').value);

            if (description && targetAmount && currentAmount) {
                const goal = { description, targetAmount, currentAmount };
                let goals = JSON.parse(localStorage.getItem('financeGoals')) || [];
                goals.push(goal);
                localStorage.setItem('financeGoals', JSON.stringify(goals));

                document.getElementById('goalForm').reset();
                drawChart();
                alert('Meta adicionada com sucesso!');
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        }

        function updateGoal() {
            const description = document.getElementById('updateGoalDescription').value;
            const amountToAdd = parseFloat(document.getElementById('amountToAdd').value);

            if (description && amountToAdd) {
                let goals = JSON.parse(localStorage.getItem('financeGoals')) || [];
                const goal = goals.find(goal => goal.description === description);

                if (goal) {
                    goal.currentAmount += amountToAdd;
                    localStorage.setItem('financeGoals', JSON.stringify(goals));

                    document.getElementById('updateForm').reset();
                    drawChart();
                    alert('Valor adicionado com sucesso à meta!');
                } else {
                    alert('Meta não encontrada.');
                }
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        }