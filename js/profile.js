onload = () => {
    const userInfo =JSON.parse(localStorage.getItem('user_info')) 

    document.getElementById('user_name').innerHTML = userInfo.username
    document.getElementById('email').innerHTML = userInfo.email

    getPlatformInfo()

}




getPlatformInfo = async () =>{
    const urlQuestions = 'https://soflite.herokuapp.com/api/v1/questions/user/questions'
    const urlAnswers = 'https://soflite.herokuapp.com/api/v1/questions/user/answers'

    try {
        //get all nessery stuffs here
        const quetionsInfo =await fetch(urlQuestions, {
            method: 'GET',
            headers: {
                'x-auth-token': `${localStorage.getItem('token')}`
            }
        })
    
    
        const answerInfo = await fetch(urlAnswers, {
            method: 'GET', 
            headers: {
                'x-auth-token': `${localStorage.getItem('token')}`
            }
        })

        const questions = await quetionsInfo.json()
        const answers = await answerInfo.json()

        console.log(`answers: ${answers.count} \n questions: ${questions.count}`)
        polulateUiWithQuetionsAsked(questions)
        polulateUiWithAnswers(answers)
    
    } catch (error) {
        console.log(error)
    }
}




polulateUiWithQuetionsAsked = (questions) => {
    const count = questions.count
    const quesArray = questions.data

    document.getElementById('no_questions').innerHTML = `${count}`

    //get the ui elements by their ids
    const ul = document.getElementById('r_asked_list')
    quesArray.forEach(quesion => {
        const li = getQuesListItem(quesion)
        ul.appendChild(li)
    })
    
}



polulateUiWithAnswers = (answers) => {
    const count = answers.count
    const ansArray = answers.answers

    document.getElementById('no_answers').innerHTML = `${count}`

    const ul = document.getElementById('m_answer_list')
    ansArray.forEach(answer => {
        const li = getAnsListItem(answer)
        ul.appendChild(li)
    });

}




getQuesListItem = (value) => {
    const p = document.createElement('p')
    const li = document.createElement('li')

    p.innerHTML = value.question
    li.appendChild(p)

    return li
}



getAnsListItem = (value) => {
    const p = document.createElement('p')
    const li = document.createElement('li')

    p.innerHTML = value.answer
    li.appendChild(p)

    return li
}