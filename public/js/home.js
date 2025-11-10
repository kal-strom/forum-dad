// background request to check if a session exists or not

// if it exists, we dynamically toggle 'login' to 'logout'

// if it doesn't exist, we make no changes to the index.html
// page that is served to the user

fetch('/api/session', {
    method: 'GET'
})
.then(res => {
    if (!res.ok) {
         throw new Error("Server message: No active session--user not logged in.");  
    }
    return res.json();
})
.then(data => console.log(data))
.catch(error => console.log(error));

