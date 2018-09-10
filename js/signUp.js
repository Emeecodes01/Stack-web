onload = () => {
    
    const sign_up_btn = document.getElementById('sign_up_btn')
    sign_up_btn.addEventListener('click', () => {

        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const user = {
            username: username, 
            email: email, 
            password: password
        }

        signUpUser(user)

    })


}

signUpUser = async (user) => {
    const signUpUrl = 'https://soflite.herokuapp.com/api/v1/auth/signup'

    try {
    
        const signUpResponse = await fetch(signUpUrl, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    
        if(signUpResponse.ok){
            const token = signUpResponse.headers.get('x-auth-token')
            localStorage.setItem('token', token)
            const signUpBody = await signUpResponse.json()
            localStorage.setItem('user_info', JSON.stringify(signUpBody.data))
            location.href = 'https://stormy-bayou-76678.herokuapp.com/qestions.html?'
            console.log(signUpBody)
        }

    } catch (error) {
        console.log(error)
    }

    
}