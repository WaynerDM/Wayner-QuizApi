import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./Quiz.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [validated, setValidated] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_JSONBIN_API_KEY;
    console.log('JSONBin key loaded:', apiKey?.slice(0, 10) + '...');

    fetch("https://api.jsonbin.io/v3/b/69e3dc99856a6821894aa9ee", {
      headers: {
        'X-Master-Key': apiKey,
      },
    })
      .then((res) => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          return res.json().then((data) => {
            const message = data?.message || 'Error desconocido';
            throw new Error(`${res.status} ${message}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log('Data from API:', data);
        setQuestions(data.record || data || []);
      })
      .catch((err) => {
        console.log('Error fetching:', err);
        setError(err.message);
        setQuestions([]);
      });
  }, []);

  const launchConfetti = () => {
    const baseSettings = {
      particleCount: 50,
      startVelocity: 40,
      spread: 140,
      ticks: 220,
      gravity: 0.75,
      decay: 0.92,
    };

    confetti({
      ...baseSettings,
      origin: { x: 0.5, y: 0.2 },
      colors: ['#f97316', '#22c55e', '#38bdf8', '#a855f7', '#f43f5e'],
      angle: 90,
    });
    confetti({
      ...baseSettings,
      origin: { x: 0.2, y: 0.3 },
      colors: ['#fde68a', '#60a5fa', '#34d399', '#f472b6'],
      angle: 60,
    });
    confetti({
      ...baseSettings,
      origin: { x: 0.8, y: 0.3 },
      colors: ['#f87171', '#8b5cf6', '#38bdf8', '#fb7185'],
      angle: 120,
    });
  };

  const handleAnswer = (index) => {
    if (validated) return;

    setSelected(index);
    setValidated(true);

    if (index === questions[current].correctAnswer) {
      launchConfetti();
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
          <h1 className="quiz-page-title">Quiz</h1>
          <h2 className="quiz-titulo">¡Bienvenido al Quiz!</h2>
          <p className="quiz-texto">¿Estás listo para probar tus conocimientos y divertirte?</p>
          <button className="startButton" onClick={() => setStarted(true)}>
            Iniciar Quiz
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <h2 className="loading">Error al cargar el quiz</h2>
          <p>{error}</p>
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