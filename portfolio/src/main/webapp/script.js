/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

/*function getComments() {
  fetch('/data').then(response => response.text()).then((quote) => {
    document.getElementById('quote-container').innerText = quote;
  });
}

window.onload = getComments();*/

function loadComments() {
  fetch('/data').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
      commentListElement.appendChild(createCommentElement(comment));
    })
  });
}
// window.onload = loadComments();

function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const nameElement = document.createElement('p');
  nameElement.innerText = comment.name;

  const contentElement = document.createElement('span'); 
  contentElement.innerText = comment.content;

  
  const imgElement = document.createElement('img');
  if(comment.imageUrl.substr(1,10) == "cloudshell"){
    imgElement.src = comment.imageUrl.substr(11);
  }
  else
    imgElement.src = comment.imageUrl;
  

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