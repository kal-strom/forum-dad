// background request to check if a session exists or not

// if it exists, we dynamically toggle 'login' to 'logout'

// Once a user selects 'log out' we want to display a popup
// message asking the user if they are sure if they want to
// log out.

// A 'Yes' will destroy the session and redirect the user back to
// the home page.

// A 'No' will close the window. 


sessionCheckAndLogout();

async function sessionCheckAndLogout() {
    const checkSession = await fetch('/api/session');

    try {
        if (!checkSession.ok) {
            throw new Error("No active session--user not logged in.")
        }
        const logoutButton = document.querySelector('#log');
        logoutButton.innerHTML = "Log out";

        console.log(checkSession);

        logout = document.querySelector('#log');

        logout.addEventListener('click', async event => {
            event.preventDefault();

            const resLogout = await fetch('/api/logout');

            location.replace("http://localhost:3000/");

            // this is where a logout banner needs to be implemented
            console.log(resLogout);
        })

    } catch(err) {
        console.err(err);
    }
}





/*fetch('/api/session', {
    method: 'GET'
})
.then(res => {
    if (!res.ok) {
         throw new Error("Server message: No active session--user not logged in.");  
    }
    // changing 'login' to 'log out' for active session 
    const logoutButton = document.querySelector('#log');
    logoutButton.innerHTML = "Log out";

    return res.json();
})
.then(data => console.log(data))
.catch(error => console.log(error));
*/
