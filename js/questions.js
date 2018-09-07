onload =async ()=>{
    const questionUrl = 'http://localhost:5000/api/v1/questions'


    const ul = document.getElementById('list')


    document.getElementById('ask_btn').addEventListener('click', () => {
        const questionAsked = document.getElementById('questions_input').value

        const Ques = {
            question: questionAsked
        }
        askQuestion(Ques)
        
        
    })

    try{
        const rawResponse = await fetch(questionUrl,{
                method: 'GET', 
                headers:{
                    'x-auth-token':`${localStorage.getItem('token')}`
                }
        })

        const jsonBody = await rawResponse.json()
        let questionsTem = []
        let questions = []


        console.log(`${jsonBody.length}`)
        for(let i = 0; i < jsonBody.length; i++){
            questions.push(jsonBody[i])

            const questionId = jsonBody[i].id
            const username = jsonBody[i].username
            const ques = jsonBody[i].question

            const questionItem = new QuestionItem(ques, questionId, username, (position) =>{
                localStorage.setItem('question_id', position)
                console.log(position)
                const array = questions.reverse()
                const question = array[position - 1].question
                localStorage.setItem('question', question)
                //go to answers page
                window.location.href = 'file:///C:/Users/Emmanuel%20Ozibo/Desktop/Andela%20LTF%20Accessment/StackoverflowLite%20web/answers.html?'
            }).createQuestionItem()
            ul.appendChild(questionItem)
        }

        //console.log(questionsTem)

        ul.addEventListener('click', (event) => {
            const target = getEventTarget(event)
            const item = target.innerHTML
            
        })
    }catch(ex){
        console.log(ex)
    }
   
}

getEventTarget = (e) => {
    e = e || window.event;
    return e.target || e.srcElement; 
}



askQuestion  =async (question) => {
    console.log('asked questions')
    console.log(question)
    const url  = 'http://localhost:5000/api/v1/questions'

    try {
        const response = await fetch(url,{
        method: 'POST', 
        headers: {
            'Content-Type':'application/json',
            'x-auth-token':`${localStorage.getItem('token')}`
        }, 
        body: JSON.stringify(question)
        }
    )

    if(response.ok){
        alert('Your question was posted successfully')
        location.reload(true)
        const jsonBody = await response.json()
        console.log(jsonBody)
    }

    } catch (error) {
        console.log(error)
    }
}