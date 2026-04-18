import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./Quiz.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [validated, setValidated] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/69e153c636566621a8bf9613")
      .then((res) => res.json())
      .then((data) => setQuestions(data.record))
      .catch((err) => console.log(err));
  }, []);

  const handleAnswer = (index) => {
    if (validated) return;

    setSelected(index);
    setValidated(true);

    if (index === questions[current].correctAnswer) {
      confetti();
    }
  };

  const nextQuestion = () => {
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setValidated(false);
  };

  if (!started) {
    return (
      <div className="container">
        <div className="card">
          <h1>🎯 Bienvenido al Quiz</h1>
          <p>¿Estás listo para probar tus conocimientos?</p>
          <button className="startButton" onClick={() => setStarted(true)}>
            Iniciar Quiz
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <h2 className="loading">Cargando...</h2>;
  }

  const q = questions[current];

  return (
    <div className="container">
      <div className="card">
        <h2 className="question">{q.question}</h2>

        {q.answers.map((ans, i) => {
          let className = "button";

          if (validated) {
            if (i === q.correctAnswer) {
              className = "button correct";
            } else if (i === selected) {
              className = "button incorrect";
            }
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleAnswer(i)}
            >
              {ans}
            </button>
          );
        })}

        {validated && current < questions.length - 1 && (
          <button className="nextButton" onClick={nextQuestion}>
            Siguiente →
          </button>
        )}

        {validated && current === questions.length - 1 && (
          <h3 className="finish">🎉 ¡Quiz terminado!</h3>
        )}
      </div>
    </div>
  );
}