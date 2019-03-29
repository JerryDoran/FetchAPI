/* jshint esversion: 6 */

document.querySelector('#getText').addEventListener('click', getText);
document.querySelector('#getUsers').addEventListener('click', getUsers);
document.querySelector('#getPosts').addEventListener('click', getPost);
document.querySelector('#addPost').addEventListener('submit', addPost);

function getText() {
  // fetch returns a 'promise' (placeholder for a response)
  // fetch('sample.txt').then(function(res) {
  //   return res.text();
  // }).then(function(data) {
  //   console.log(data);
  // });

  // Using arrow functions to get data from text file
  fetch('sample.txt').then((res) => res.text()).then((data) => console.log(data));

  // Insert the data into the DOM
  fetch('sample.txt').then((res) => res.text()).then((data) => {
    document.getElementById('output').innerHTML = data;
  }).catch((err) => console.log(err));

}

function getUsers() {
  fetch('users.json').then((res) => res.json()).then((data) => {
    let output = '<h2 class="mb-4">Users</h2>';
    data.forEach(function(user) {
      output += `
        <ul class="list-group mb-3">
          <li class="list-group-item">ID: ${user.id}</li>
          <li class="list-group-item">Name: ${user.name}</li>
          <li class="list-group-item">Email: ${user.email}</li>
        </ul>
      `;
    });
    document.getElementById('output').innerHTML = output;
  });
}

function getPost(){
  // fetch('http://jsonplaceholder.typicode.com/posts')
  fetch('http://data.consumerfinance.gov/api/views.json').then((res) => res.json()).then((data) => {
    let output = '<h2 class="mb-4">Posts</h2>';
    data.forEach(function(post) {
      output += `
        <div class="card card-body mb-3">
          <h3>${post.name}</h3>
          <p>${post.description}</P>
        </div>
      `;
    });
    document.getElementById('output').innerHTML = output;
  });
}

function addPost(e) {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let body = document.getElementById('body').value;

  // fetch('http://jsonplaceholder.typicode.com/posts'
  fetch('http://data.consumerfinance.gov/api/views.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body:JSON.stringify({title:title, body:body})
  }).then((res) => res.json()).then((data) =>console.log(data));
}
