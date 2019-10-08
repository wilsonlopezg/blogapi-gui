function register(){
    
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var data ={
        name: username,
        email: email,
        password: password
    };

    console.log(data);

    fetch(`${API_PACH}/register`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}

window.onload = function(){
    // btnSaludar
    document.getElementById("btnRegister")
    .addEventListener('click', function(){
       register();
    });
}