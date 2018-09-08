onload = async () => {
    const question = localStorage.getItem('question')
    const questionId = localStorage.getItem('question_id')



    const ol = document.getElementById('answers_list')
    document.getElementById('question').innerHTML = question

    //get all answers to a question
    const url = `http://localhost:5000/api/v1/questions/${questionId}`


    const answer_btn = document.getElementById('answer_btn')
    answer_btn.addEventListener('click', () => {
        const answerToQuestion = document.getElementById('answers_input').value
        console.log(answerToQuestion)
        const answer = {
            answer: answerToQuestion
        }

        postAnswer(answer)

    })

    //delete button listener
    document.getElementById('delete_btn').addEventListener('click', () => {
        deleteQuestion()
    })


    try {
        const response = await fetch(url,{
            method: 'GET', 
            headers: {
                'x-auth-token':`${localStorage.getItem('token')}`
            }, 
        })
    
        if(response.ok){
            let answers = []
            const body = await response.json()
            answers = body.answers
    
            

            for(let i = 0; i < answers.length; i++){
                const author = answers[i].username
                const text = answers[i].answer
                const status = answers[i].status
                const answerId = answers[i].id
                const upVotes = answers[i].upvotes
                const downVotes = answers[i].downvotes

                ol.appendChild(createAnswerItem(answerId, text, author, status,upVotes, downVotes, (clickedPosition) => {
                    console.log(clickedPosition)
                    //save in local storage and then open the answers page(which shows comments)
                    localStorage.setItem('answer_id', clickedPosition)
                    location.href = 'file:///C:/Users/Emmanuel%20Ozibo/Desktop/Andela%20LTF%20Accessment/StackoverflowLite%20web/comment.html?'
                })) 

            }
            
        }else{
            console.log('there was an error getting answers')
        }
    } catch (error) {
        console.log(error)
    }
    
}


function createAnswerItem(id, text, author, status,upvotes, downvotes, callback){
        const div = document.createElement('div')
        const innerDiv = document.createElement('div')
        const p = document.createElement('p')
        const p_answer_info = document.createElement('p')
        const li = document.createElement('li')
        const votesDiv = document.createElement('div')
        const upvotesP = document.createElement('p')
        const downvotesP = document.createElement('p')


        //sets the css style
        div.className = 'wrapper'
        p.className = 'text_style'
        if(status){
            innerDiv.className = 'info_wrapper_sec'
        }else{
            innerDiv.className = 'info_wrapper'
        }
        p_answer_info.className = 'answer_info'
        votesDiv.className = 'votes_div'
        upvotesP.className = 'up_votes_p'
        downvotesP.className = 'down_votes_p'

        //set properties
        p.innerHTML = text
        p_answer_info.innerHTML = author
        upvotesP.innerHTML = `${upvotes} upvotes`
        downvotesP.innerHTML = `${downvotes} downvotes`

        //forms the structure
        this.append(li, div)
        this.append(div, p)
        this.append(div, votesDiv)
        this.append(votesDiv, upvotesP)
        this.append(votesDiv, downvotesP)
        this.append(div, innerDiv)
        this.append(innerDiv, p_answer_info)

        //set an event listener for the list item
        li.addEventListener('click', () => {
            callback(id)
        })

        return li
    
}

append = (parent, child)=>{
    parent.appendChild(child)
}


postAnswer = async (answer) => {
    
    const questionId = localStorage.getItem('question_id')
    
    const url = getAnswersUrl(questionId)
    console.log(url)
    console.log(answer)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'x-auth-token': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(answer)
        })

        if(response.status === 200 || response.ok){
            const resBody = await response.json()
            document.location.reload(true)
            console.log(resBody)
            
        }else{
            console.log('Things gone wrong')
            alert('cant post your answer')
        }
        
    } catch (error) {
        console.log(error)
        alert('something went wrong!!')
    }
}

getAnswersUrl = (questionId) =>{
    return `http://localhost:5000/api/v1/questions/${questionId}/answers`
}



deleteQuestion = async () => {
    const questionId = localStorage.getItem('question_id')
    const deleteurl = `http://localhost:5000/api/v1/questions/${questionId}`

    try {
        const deleteResponse =await fetch(deleteurl, {
            method: 'DELETE', 
            headers: {
                'x-auth-token':`${localStorage.getItem('token')}`
            }
        })

        if(deleteResponse.ok){
            const deleteBody =await deleteResponse.json()
            console.log(deleteBody)
            alert('Question deleted')
            location.href = 'file:///C:/Users/Emmanuel%20Ozibo/Desktop/Andela%20LTF%20Accessment/StackoverflowLite%20web/qestions.html'
        }else if(deleteResponse.status == 401){
            alert('No token provided!')
        }else{
            //no authrization
            alert('You dont have the authorization to delete this question')
        }
        
    } catch (error) {
        console.log(error)
    }
}

updateQuestion =() => {

}