const usuarios=[] 
async function getAll(){

    await fetch("http://localhost:8081/login")
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            usuarios.push(user);
        });
    });
}
getAll()
console.log(usuarios)
