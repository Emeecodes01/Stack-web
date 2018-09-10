const init = () =>{

    const url = 'https://soflite.herokuapp.com/api/v1/auth/login'


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
            localStorage.setItem('user_info', JSON.stringify(jsonResponse.data))

            //open the question
            window.location.href = 'https://stormy-bayou-76678.herokuapp.com/qestions.html?'
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
