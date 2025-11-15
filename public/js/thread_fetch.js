
document.addEventListener('DOMContentLoaded', async event => {
    try {
        const threadsResponse = await fetch('/api/threads');

        if(!threadsResponse.ok) {
            console.log(`Status: ${threadsResponse.status}`)
        }
        else {
            const data = await threadsResponse.json();
            console.log(data);
        }
    }catch(error){
        console.log(error);
    }
})
