import {useState, useEffect} from "react"
import Question from "./Question"
import { nanoid } from 'nanoid'

function Quiz(){
    const [questions, setQuestions] = useState([])
    const [isQuizGoing, setIsQuizGoing] = useState(true)
    const [result, setResult] = useState(0)
    const [startQuiz, setStartQuiz] = useState(true)

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5`)
            .then(res => res.json())
            .then(data =>{ 

                const questionsArray = data.results.map(question => {
                    const correctAnswer = {a: question.correct_answer, id: nanoid(), isSelected: false, isCorrect: true}
                    const incorrectAnswers = question.incorrect_answers.map(ans => {
                        return (
                            {a: ans, id: nanoid(), isSelected: false, isCorrect: false}
                        )
                    })
                    
                    const answers = [correctAnswer, ...incorrectAnswers]
                    const shuffledAnswers = shuffleArray(answers)
                    return {Q: question.question, A: shuffledAnswers}
                })
                return questionsArray
            }).then(questionsArray => setQuestions(questionsArray))
    }, [startQuiz])
    
    function handleSelect(id){
        if (isQuizGoing) {
            setQuestions(prevQuestions => {

                const newQuestionsArray = prevQuestions.map(question => {
                    const isClicked = question.A.some(ans => ans.id === id)
                    
                    if (isClicked) {
                        const newAnswersArray = question.A.map(ans => {
                            return (ans.id === id) ? 
                            {...ans, isSelected: !ans.isSelected} :
                            {...ans, isSelected: false}
                        })
                        return {...question, A: newAnswersArray}
                    } else {
                        return question
                    }
                })
            return newQuestionsArray
            })
        }
    }

    function countCorrectAnswers() {
        return questions.filter(item => {
           return item.A.filter(ans => ans.isSelected && ans.isCorrect)[0]
        }).length
    }
    
    function handleClick(){
        
        if(isQuizGoing) {
            const res = countCorrectAnswers ()
            setResult(res) 
        } else {
            setQuestions([])
            setStartQuiz(prevValue => !prevValue)
        }
        setIsQuizGoing(prevValue => !prevValue)
    }

    const renderQuestion = questions.map((question, index) => (
        <Question
            key={index} 
            question={question.Q}
            answers={question.A}
            handleSelect={handleSelect}
            isQuizGoing={isQuizGoing}
        />
    ))

    const color = result === 5 ? 'green' : result === 4 ? 'orange' : 'red'
  
    return (
         questions.length ?
            <div className="quiz-container">
                <div className="questions-container">
                    {renderQuestion}
                </div>
                <div className="footer">
                    {isQuizGoing || <div className="result">
                                        You scored <span className={`${color}`}>{result}</span>/5 correct answers.
                                    </div>}
                    <button 
                        onClick={handleClick} 
                        className="btn"
                    >
                        {isQuizGoing ? 'Check answers' : 'Play again'}
                    </button>
                </div>
            </div> :
            <h1 className="loading">Loading quiz questions...</h1>
    )
}

export default Quiz
