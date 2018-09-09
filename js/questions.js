onload =async ()=>{
    const questionUrl = 'https://soflite.herokuapp.com/api/v1/questions'


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
        console.log(`${jsonBody.length}`)

        jsonBody.forEach(question => {
            const questionId = question.id
            const username = question.username
            const ques = question.question

            const questionItem = new QuestionItem(ques, questionId, username, (quesId) => {
                localStorage.setItem('question_id', quesId)
                localStorage.setItem('question', ques)
                window.location.href = 'https://stormy-bayou-76678.herokuapp.com/answers.html?'
                console.log(quesId)

            }).createQuestionItem()
            ul.appendChild(questionItem)
        });
            
    }catch(ex){
        console.log(ex)
    }
   
}

getEventTarget = (e) => {
    e = e || window.event;
    return e.target || e.srcElement; 
}



askQuestion  = async (question) => {
    console.log('asked questions')
    console.log(question)
    const url  = 'https://soflite.herokuapp.com/api/v1/questions'

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