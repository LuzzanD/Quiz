import Answer from "./Answer"

function Question(props){

    function decodeHTMLEntities(text) {
        let textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
      }

    const pureQuestion = decodeHTMLEntities(props.question)

    const renderAnswers = props.answers.map(ans => (
        <Answer
            key={ans.id}
            id={ans.id}
            answer={ans.a}
            isSelected={ans.isSelected}
            isCorrect={ans.isCorrect}
            handleClick={props.handleSelect}
            isQuizGoing={props.isQuizGoing}
        />
    ))
        
    return (
         <div className="question-container">
            <h4 className="question-title">{pureQuestion}</h4>
            <div className="answers-container">
                {renderAnswers}
            </div>
         </div>
    )
}

export default Question