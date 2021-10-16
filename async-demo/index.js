console.log("Before");
getUser(1, (user) => {
    getRepositories(user.username, (repos) =>{
        console.log('repos', repos);
    });
});


console.log("After");


function getUser(id, callback){
    setTimeout(() => {
        console.log("read data from database"); // wait 2s and display this message
        callback({id:id, username:"gayathribuddhika"});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log("read the username"); // wait 2s and display this message
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}