// using querySelector to grab form 
loginForm = document.querySelector('form');

// creating eventListener for submit
loginForm.addEventListener('submit', event => {
    event.preventDefault();

    // grabbing username & password
    const userName = loginForm.querySelector('#username');
    const pass = loginForm.querySelector('#password');

    // creating object to send to endpoint
    data = {
        username: userName.value,
        password: pass.value
    };
    // sending object (turned into json string) to login endpoint
    fetch('/api/login', { 
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(res => res.json())
    .then(data => console.log('Server message:', data))
    .catch(error => console.error(error));
})


//NOTE: AFTER A SUCCESSFUL LOGIN, WE WANT TO REDIRECT THE USER BACK TO THE 
// HOME-PAGE OR ROOT.
