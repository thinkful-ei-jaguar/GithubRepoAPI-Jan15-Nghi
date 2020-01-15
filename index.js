const BASE_URL = 'https://api.github.com';

function printRepo(i, name, link) {
  // Generates html string for each repository
  return `
    <li id=${i}>
        <h2>${name}</h2>
        <p>${link}</p>
    </li>
    `;
}

function printRepoList(data) {
  // Print returned data
  const htmlString = data.map(repo => 
    printRepo(repo.id, repo.name, repo.html_url));
  $('#result').html(htmlString);
}

function makeAPICall(username) {
  // Fetches data
  fetch(`${BASE_URL}/users/${username}/repos`)
    .then(res => res.ok? res.json() : Promise.reject('cannot fetch user repos'))
    .then(data => printRepoList(data))
    .catch(error => console.log(error));
}

function submitEventListener() {
  // Listens to when user submit form
  $('form').on('submit', (e) => {
    e.preventDefault();
    // Stores username
    const username = $('#username').val();
    // Fetches data with the username
    makeAPICall(username);
    // Clears form
    $('form')[0].reset();
  });
}

function render() {
  // Renders the following functions
  submitEventListener();
}

$(render);