// Adding an event listener for the sign_up form
const formInput = document.querySelector('form');
// capturing the submission event
formInput.addEventListener('submit', event => {
    // prevents default form submission behavior
    event.preventDefault();
    // creating variables containing data from input fields
    const formEmail = document.querySelector('#email');
    const formUserName = document.querySelector('#username');
    const formPassword = document.querySelector('#password');
    // creating object with captured data
    const formObject = {
        email: formEmail.value,
        username: formUserName.value,
        password: formPassword.value
    };

    console.log("form submitted, sending fetch!");
    // sending HTTP request to our express endpoint: app.post('/sign_up')
    // collected data is included in the req body.
    fetch('/api/sign_up', {
        method: 'POST',
        // when we send data, we have to let the server know
        // what the format of the data will be 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formObject)
    })
    .then(res => res.json())
    .then(data => console.log("This is the message from the server: ", data))
    .catch(error => console.error(error)); 
});