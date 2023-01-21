import React,{useEffect,useState} from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
  const [questions,setQuestions] = useState([])
  function handleDelete(id){
    fetch(`http://localhost:4000/questions/{id}`,{
      method:"DELETE"
    })
    .then(resp => resp.json())
    .then(()=>{
      const updateQuiz = questions.filter((question)=>question.id !==id);
      setQuestions(updateQuiz)
    } )
  }
  useEffect(()=>{
    fetch(`http://localhost:4000/questions`)
    .then(resp => resp.json())
    .then(data => setQuestions(data))
;  },[])
  function handleNewAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(resp => resp.json())
      .then((updatedQuestion) => {
        const updatedQuiz = questions.map((item) => {
          if (item.id === updatedQuestion.id) return updatedQuestion;
          return item;
        });
        setQuestions(updatedQuiz);
      });
  }
  const quizlist = questions.map((item)=>{
    return <QuestionItem 
    key={item.id}
    question={item}
    onNewAnswer={handleNewAnswer}
    onQuizDelete={handleDelete}
     />
   })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quizlist}</ul>
    </section>
  );
}

export default QuestionList;
