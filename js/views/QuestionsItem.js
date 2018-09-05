class QuestionItem{

    constructor(text, questionId, author, callback){
        this.text = text
        this.queId = questionId
        this.author = author
        this.callback = callback
    }


    createQuestionItem(){
        const div = document.createElement('div')
        const innerDiv = document.createElement('div')
        const p = document.createElement('p')
        const p_question_info = document.createElement('p')
        const li = document.createElement('li')

        //sets the css style
        div.className = 'wrapper'
        p.className = 'text_style'
        innerDiv.className = 'info_wrapper'
        p_question_info.className = 'question_info'

        //set properties
        p.innerHTML = this.text
        p_question_info.innerHTML = this.author
        li.id = this.queId

        li.onclick = () => {
            this.callback(this.queId)
        }

        //forms the structure
        this.append(li, div)
        this.append(div, p)
        this.append(div, innerDiv)
        this.append(innerDiv, p_question_info)

        return li
    }


    append(parent, child){
        parent.appendChild(child)
    }

    

}