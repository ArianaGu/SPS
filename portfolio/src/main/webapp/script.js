google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Fetches world covid data and uses it to create a chart. */
function drawChart() {
  fetch('/covid-data').then(response => response.json())
  .then((covidData) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'date');
    data.addColumn('number', 'total_cases');
    Object.keys(covidData).forEach((date) => {
      data.addRow([date, covidData[date]]);
    });

    const options = {
      'title': 'Total Cases of COVID-19 Worldwide',
      'width':600,
      'height':500
    };

    const chart = new google.visualization.LineChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}

function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function loadComments() {
  fetch('/data').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
      commentListElement.appendChild(createCommentElement(comment));
    })
  });
}

function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const nameElement = document.createElement('p');
  nameElement.innerText = comment.name;
  nameElement.style.color = "#8B81C3";

  const contentElement = document.createElement('span'); 
  contentElement.innerText = comment.content;

  const imgElement = document.createElement('img');
  imgElement.style.maxWidth = "200px";
  if(comment.imageUrl.substr(1,10) == "cloudshell"){
    imgElement.src = comment.imageUrl.substr(11);
  }
  else{
    imgElement.src = comment.imageUrl;
  }

  commentElement.appendChild(nameElement);
  commentElement.appendChild(contentElement);
  commentElement.appendChild(imgElement);
  return commentElement;
}

function fetchBlobstoreUrlAndShowForm() {
  fetch('/blobstore-upload-url')
      .then((response) => {
        return response.text();
      })
      .then((imageUploadUrl) => {
        const messageForm = document.getElementById('my-form');
        messageForm.action = imageUploadUrl;
        messageForm.classList.remove('hidden');
      });
}

