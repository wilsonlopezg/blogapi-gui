function loginr(){
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var data ={
        username: username,
        email: username,
        password: password
    };

    //console.log(data);

    fetch(`${API_PACH}/login`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response));
        window.location.href="mostrarPost.html";
        
      } );
}

window.onload = function(){
    // btnSaludar
    document.getElementById("btnLogin")
    .addEventListener('click', function(){
       loginr();
    });
}