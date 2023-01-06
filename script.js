fetch('https://my.api.mockaroo.com/EDI.json?key=b01f8860')
  .then(response => response.json())
  .then(data => {
  
    const table = document.createElement('table');

    // head tabeli
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    for (const key of Object.keys(data[0])) {
      const th = document.createElement('th');
      th.textContent = key;
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    // body tabeli
    const tbody = document.createElement('tbody');
    for (const row of data) {
      const tr = document.createElement('tr');
      for (const key of Object.keys(row)) {
        const td = document.createElement('td');
        td.textContent = row[key];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    // dodanie tabeli
    document.getElementById("Tabela").appendChild(table);

    const ctx = document.getElementById('Chart1');
    
    // Roki produkcji samochodów
    let lata = []
    data.forEach(element =>{
        if(!lata.includes(element.Car_Year)){
            lata.push(element.Car_Year);
        }
        lata.sort()
    });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: lata,
      datasets: [{
        label: 'Appearences',
        data: [0,1],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  });

  


  