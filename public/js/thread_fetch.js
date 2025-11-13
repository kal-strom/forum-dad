
document.addEventListener('DOMContentLoaded', async event => {
    try {
        const threadsResponse = await fetch('/api/threads');

        if(!threadsResponse.ok) {
            console.log(`Status: ${threadsResponse.status}`)
        }
        else {
            console.log(threadsResponse);
        }
    }catch(error){
        console.log(error);
    }
})
