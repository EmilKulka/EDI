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


    // Pierwszy wykres, lata produkcji samochodów
    const ctx = document.getElementById('Chart1');
    let years = []
    
    //Wszystkie roki produkcji samochodów bez powtórzeń, posortowane
    let XAxis = []
    data.forEach(element =>{
      years.push(element.Car_Year)
        if(!XAxis.includes(element.Car_Year)){
            XAxis.push(element.Car_Year);
        }
        XAxis.sort()
    });
  // Wszystkie lata produkcji samochodów, posortowane
    let groupedCarYears = []
    years.sort()

    groupedCarYears = years.reduce((r, v, i, a) => {
        if (v === a[i - 1]) {
            r[r.length - 1].push(v);
        } else {
            r.push(v === a[i + 1] ? [v] : v);
        }
        return r;
    }, []);

  // Array ze zliczonymi powtórzeniami lat
  let countedSameYears = []

  groupedCarYears.forEach(year => {
    if (Array.isArray(year)){
      countedSameYears.push(year.length)
    }
    else {
      countedSameYears.push(1)
    }
  })

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: XAxis,
      datasets: [{
        label: 'The most frequent Car Years.',
        data: countedSameYears,
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

  // Drugi wykres, marki samochodów
  const ctx1 = document.getElementById('Chart2');
  
  //Marki samochodów bez powtórzeń
  let CarMakes = [] //bez powtórzeń
  let CarMakesAll = [] // z powtórzeniami
  data.forEach(element =>{
     CarMakesAll.push(element.Car_Year)
      if(!CarMakes.includes(element.Car_Make)){
          CarMakes.push(element.Car_Make);
      }
      CarMakes.sort()
       });
    // Wszystkie lata produkcji samochodów, posortowane
    let groupedCarMakes = []
    CarMakesAll.sort()

    groupedCarMakes = CarMakesAll.reduce((r, v, i, a) => {
        if (v === a[i - 1]) {
            r[r.length - 1].push(v);
        } else {
            r.push(v === a[i + 1] ? [v] : v);
        }
        return r;
    }, []);

  // Array ze zliczonymi powtórzeniami lat
  let CountedCarMakes = []

  groupedCarMakes.forEach(CarMakesAll => {
    if (Array.isArray(CarMakesAll)){
      CountedCarMakes.push(CarMakesAll.length)
    }
    else {
      CountedCarMakes.push(1)
    }
  })
      
  new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: CarMakes,
      datasets: [{
        label: 'The most frequent Car Makes.',
        data: CountedCarMakes,
       
      }]
    }
  });

  });

  

