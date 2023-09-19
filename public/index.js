const form = document.getElementById('formBox');
let username = document.getElementById('userInput');
let pwd = document.getElementById('pwdInput');
const getData = document.getElementById('getData');
let showDetails = document.getElementById('details');
let alertMessage = document.querySelector('.text');

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    let userName = username.value;  
    let password = pwd.value;

    console.log('submitting form....')
    try{
        let response = await fetch('/api/v1/login', {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "username" : userName,
                "password" : password
            })
        })

        let json = await response.json();
        username.value = '';
        pwd.value = '';
        
        localStorage.setItem('token', json.token)
        showDetails.innerHTML = '';
        alertMessage.innerHTML = json.msg;
        alertMessage.style.display = 'block';
        alertMessage.classList.add('success');
    
        setTimeout(() => {
            alertMessage.style.display = 'none';
        }, 3000);

  

    }
   catch(err){
    console.log(err);
    showDetails.innerHTML = '';
    alertMessage.classList.remove('success');
    localStorage.removeItem('token');
   }

})

getData.addEventListener('click', async()=>{
    const token = localStorage.getItem('token');
    try {
        let response = await fetch('/api/v1/dashboard', {
           headers: {
             Authorization : `Bearer ${token}`
           }
        })

        let data = await response.json();
        showDetails.innerHTML = `<h5>${data.msg}!</h5><p>${data.secret}</p>`
        
        data.secret;
        
    } catch (error) {
        localStorage.removeItem('token');
        showDetails.innerHTML = `<p>${error.msg}</p>`
    }
})

