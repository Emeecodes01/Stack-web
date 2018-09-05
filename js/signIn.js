const init = () =>{

    const url = 'http://localhost:5000/api/v1/auth/login'


    const signInBtn = document.getElementById("sign_in_btn1")
    signInBtn.onclick = async () => {
        const userEmail = document.getElementById('email').value 
        const password = document.getElementById('password').value

        const user = {
            email: userEmail, 
            password: password
        }
        try{
            const rawResponse = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(user)
        })

        const jsonResponse = await rawResponse.json()
        //check if the response is successful
        if(rawResponse.ok){
            const token = rawResponse.headers.get('x-auth-token')

            //save the token and user info for later use 
            localStorage.setItem('token', token)
            localStorage.setItem('userInfo', jsonResponse)

            //open the questions page
           // window.location.replace('file:///C:/Users/Emmanuel%20Ozibo/Desktop/Andela%20LTF%20Accessment/StackoverflowLite%20web/qestions.html?')
            window.location.href = 'file:///C:/Users/Emmanuel%20Ozibo/Desktop/Andela%20LTF%20Accessment/StackoverflowLite%20web/qestions.html?'
           // window.location.replace('../qestions.html')
        }else{
            alert(jsonResponse.message)
        }
        
        console.log(jsonResponse)
        }catch(ex){
            console.log(ex)
        }
        
    }

}
onload = init
