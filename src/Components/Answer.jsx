
function Answer(props){
    
    function decodeHTMLEntities(text) {
        let textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
      }

    const pureAnswer = decodeHTMLEntities(props.answer)

    let classString
    if (props.isQuizGoing) {
        classString = props.isSelected ? 'selected-answer' : 'rendered-answer'
    } else {
        classString = props.isCorrect ? 'correct' : props.isSelected ? 'incorrect' : 'not-selected'
    }

    return (
        <div 
            className={`question-answer ${classString}`}
            onClick={() => props.handleClick(props.id)}
        >
            {pureAnswer}
        </div>
    )
}

export default Answer