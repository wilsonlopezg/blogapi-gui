function showUserProfile(e){
    var ueObject = event.target;
    console.log('show profile :' + e.target.textContent);

    var idUser = ueObject.getAttribute('data-userid');
    console.log('User id = ' +idUser);
}
var postTemplate = `
<div>
<h3>{{TITLE}}</h3>>
<h5> by: {{NAME}} - <span style="color: gray"><a href="#" data-userid="{{USERID}}" class="btn_email">{{EMAIL}}</a></span> </h5>>
<p>{{BODY}}</p>
<hr>
</div>`

var profileTempalte = `
<div>
<h3>{{TITLE}}</h3>>
<h5> by: {{NAME}} - <span style="color: gray"><a href="#" data-userid="{{USERID}}" class="btn_email">{{EMAIL}}</a></span> </h5>>
<p>{{BODY}}</p>
<hr>
</div>`

window.onload = function(){
    function showPost(){

        var dbLocal = localStorage.getItem('token');
        var token = JSON.parse(dbLocal).token;

        fetch('http://itla.hectorvent.com/api/post', {
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization' : `Bearer ` + token
            }
        })
        .then(res => res.json())
        .then(res =>{
            // console.log(res);
            var postView = '';
            res.forEach(p => {
                // console.log(p);
                postView = postView + 
                postTemplate.replace('{{BODY}}', p.body)
                             .replace('{{NAME}}', p.userName)
                                .replace('{{EMAIL}}', p.userEmail)
                                .replace('{{USERID}}', p.userId)
                                    .replace('{{TITLE}}', p.title);


                
            });
            document.getElementById('app').innerHTML = postView;
            document.getElementsByClassName('btn_email')
            var bes = document.getElementsByClassName('btn_email');

            for (i = 0; i < bes.length; i++){
                bes [i].addEventListener('click' , showUserProfile);
            }
            // .addEventListener('click', showUserProfile())
        })
        .catch(err => {
            console.log(err);
        })

        console.log('Show Post');
        
    }

    function showMyPost(){
        console.log('Show My Post');
        document.getElementById('app').innerHTML = '<h1 style= "color: red"> Post List</h1>'
    }

    function showProfile(){
        console.log('Show Profile');
    }

    this.console.log("Working...");
    this.document.getElementById("post_view").addEventListener('click', showPost);
    this.document.getElementById("mypost_view").addEventListener('click', showMyPost);
    this.document.getElementById("profile_view").addEventListener('click', showProfile);
}