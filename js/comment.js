onload =async ()=>{
    
    getComments()

    document.getElementById('comment_btn').addEventListener("click", () => {
        const comment = document.getElementById('comment_input').value

        //make an api call to save comment 
        const question_id = localStorage.getItem('question_id')
        const answer_id = localStorage.getItem('answer_id')
        const url = `http://localhost:5000/api/v1/questions/${question_id}/answers/${answer_id}/comment`

        console.log(comment)
        postAComment(url, {comment: comment})
    })

    document.getElementById('upvote').addEventListener("click", () => {
        //make an api call to up vote
        console.log('upvote clicked')
        const question_id = localStorage.getItem('question_id')
        const answer_id = localStorage.getItem('answer_id')
        const url = `http://localhost:5000/api/v1/questions/${question_id}/answers/${answer_id}/upvote`

        upVote(url)
    })

    document.getElementById('downvote').addEventListener("click", () => {
        //make an api call to down vote
        const question_id = localStorage.getItem('question_id')
        const answer_id = localStorage.getItem('answer_id')
        const url = `http://localhost:5000/api/v1/questions/${question_id}/answers/${answer_id}/downvote`

        downVote(url)
    })

}

getComments = async () => {

    //get all the comments 
    const question_id = localStorage.getItem('question_id')
    const answer_id = localStorage.getItem('answer_id')
    const url = `http://localhost:5000/api/v1/questions/${question_id}/answers/${answer_id}/comment`

    try {
        const commentResponse = await fetch(url,{
            method: 'GET', 
            headers: {
                'x-auth-token':`${localStorage.getItem('token')}`
            }
        })

        if(commentResponse.ok){
            console.log('comment working')
            const comments = await commentResponse.json()
            setUpListWithData(comments)
        }
    } catch (error) {
        console.log(error)
        alert('An error occured while getting questions')
    }
}


setUpListWithData = (comments) => {
    let array = []
    const ol = document.getElementById('list')

    array =  comments.comments

    for (let i = 0; i < array.length; i++) {
        const comment = array[i].comment
        const username = array[i].username
        
        const li = createListItem(comment, username)
        ol.appendChild(li)
    }
}

postAComment =async (url, comment) => {

    try {
        const comResponse = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json', 
                'x-auth-token': `${localStorage.getItem('token')}`
            }, 
            body: JSON.stringify(comment)
        })

       

        if(comResponse.status == 200){
            const commentBody = await comResponse.json()
            console.log(commentBody)
            location.reload(true)
        }
    } catch (error) {
        console.log(error)
    }
}

upVote = async (url) =>{
    try {
        const commentResponse = await fetch(url, {
            method: 'PUT', 
            headers: {
                'x-auth-token': `${localStorage.getItem('token')}`
            }
        })
    
        if(commentResponse.ok){
            alert('Up voted!!')
            const response = await commentResponse.json()
            console.log(response)
        }
    } catch (error) {
        console.log(error)
    }
    
} 



downVote = async (url) => {
    try {
        const commentRes = await fetch(url, {
            method: 'PUT', 
            headers: {
                'x-auth-token': `${localStorage.getItem('token')}`
            }
        })
    
        if(commentRes.ok){
            alert('Down voted!!')
            const comment = await commentRes.json()
            console.log(comment)
        }
    } catch (error) {
        console.log(error)
    }
    
}




createListItem = (comment, username) => {
    //create list items here
    const li = document.createElement('li')
    const wrapperDiv = document.createElement('div')
    const userDiv = document.createElement('div')
    const user_name = document.createElement('p')
    const user_comment = document.createElement('p')

    append(li, wrapperDiv)
    append(wrapperDiv, userDiv)
    append(userDiv, user_name)
    append(wrapperDiv, user_comment)

    //set the class names 
    li.className = 'list_item'
    wrapperDiv.className = 'wrapper'
    userDiv.className = 'username_div'
    user_name.className = 'user_name'

    //set the values
    user_name.innerHTML = username
    user_comment.innerHTML = comment

    return li
}


append = (parent, child) => {
    parent.appendChild(child)
}