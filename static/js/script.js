document.addEventListener("DOMContentLoaded", function() {});
let num = 0;
let values = [];
function getLatestData(){
  let tempData;
  fetch('http://193.87.144.172:6789/get/data/all')
    .then(response => response.json())
    .then(data => {
      const msgDiv = document.getElementById('raw_data');
      msgDiv.innerHTML = '';

      if (Object.keys(data).length > 0){
        for (const [key, value] of Object.entries(data)){
          const element = document.createElement('p');
          element.textContent = `Zariadenie ${key}: ${value}`;
          msgDiv.appendChild(element);
        }
      } else {
        msgDiv.innerHTML = '<p>Neprišli žíadne dáta</p>';
      }

      const raw = Object.entries(data);
      tempData = raw.split(';')
    })
    .catch(error => console.error('Error fetching latest messages:', error));

  new Chart("temp_chart", {
    type: "line",
    data: {
      labels: values,
      datasets: [{
        data: tempData[1],
        borderColor: "red",
        fill: false
      }]
    },
    options: {
      legend: {display: false},
      title: {display: true, text: "Teplota"},

    }
  });
  new Chart("humi_chart", {
    type: "line",
    data: {
      labels: values,
      datasets: [{
        data: tempData[2],
        borderColor: "red",
        fill: false
      }]
    },
    options: {
      legend: {display: false},
      title: {display: true, text: "Vlhkosť"},

    }
  });
  new Chart("pres_chart", {
    type: "line",
    data: {
      labels: values,
      datasets: [{
        data: tempData[3],
        borderColor: "red",
        fill: false
      }]
    },
    options: {
      legend: {display: false},
      title: {display: true, text: "Tlak"},

    }
  });
  new Chart("inte_chart", {
    type: "line",
    data: {
      labels: values,
      datasets: [{
        data: tempData[4],
        borderColor: "red",
        fill: false
      }]
    },
    options: {
      legend: {display: false},
      title: {display: true, text: "Sila"},

    }
  });
  values.push(num);
  num++;
}
setInterval(getLatestData, 1000);