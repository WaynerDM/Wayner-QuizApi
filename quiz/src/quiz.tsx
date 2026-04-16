import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

type Question = {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
};

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [validated, setValidated] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/69e153c636566621a8bf9613")
      .then(res => res.json())
      .then(data => setQuestions(data.record))
      .catch(err => console.log(err));
  }, []);

  const handleAnswer = (index: number) => {
    if (validated) return;

    setSelected(index);
    setValidated(true);

    if (index === questions[current].correctAnswer) {
      confetti();
    }
  };

  const nextQuestion = () => {
    setCurrent(current + 1);
    setSelected(null);
    setValidated(false);
  };

  if (!started) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>😄
          <h1 style={{ fontSize: "22px" }}>🎯 Bienvenido al Quiz</h1>
          <p>¿Estás listo para probar tus conocimientos?</p>
          <button
            style={styles.startButton}
            onClick={() => setStarted(true)}
          >
            Iniciar Quiz
          </button>
        </div>
      </div>
    );
  }


  if (questions.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Cargando...</h2>;
  }

  const q = questions[current];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.question}>{q.question}</h2>

        {q.answers.map((ans, i) => {
          let style = { ...styles.button };

          if (validated) {
            if (i === q.correctAnswer) {
              style = { ...style, ...styles.correct };
            } else if (i === selected) {
              style = { ...style, ...styles.incorrect };
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={style}
            >
              {ans}
            </button>
          );
        })}

        {validated && current < questions.length - 1 && (
          <button onClick={nextQuestion} style={styles.nextButton}>
            Siguiente →
          </button>
        )}

        {validated && current === questions.length - 1 && (
          <h3 style={styles.finish}>🎉 ¡Quiz terminado!</h3>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial"
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "350px",
    textAlign: "center"
  },
  question: {
    marginBottom: "20px"
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#eee"
  },
  correct: {
    backgroundColor: "#4CAF50",
    color: "white"
  },
  incorrect: {
    backgroundColor: "#f44336",
    color: "white"
  },
  nextButton: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#667eea",
    color: "white",
    cursor: "pointer"
  },
  startButton: {
    marginTop: "20px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#667eea",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  },
  finish: {
    marginTop: "20px",
    color: "#333"
  }
};