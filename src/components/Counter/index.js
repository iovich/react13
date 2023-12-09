import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("додавання");
  const [isStart, setIsStart] = useState(false);
  const [duration, setDuration] = useState(3);

  const updateCounter = () => {
    if (mode === "додавання") {
      setCount((prevCount) => prevCount + step);
    } else if (mode === "віднімання") {
      setCount((prevCount) => prevCount - step);
    }
  };

  const updateStep = (e) => {
    setStep(Number(e.target.value));
  };

  const changeMode = (e) => {
    setMode(e.target.value);
  };

  const start = () => {
    if (!isStart) {
      const intervalId = setInterval(updateCounter, 1000);
      setIsStart(true);

      setTimeout(() => {
        stop(intervalId);
      }, duration * 1000);
    }
  };

  const stop = (intervalId) => {
    clearInterval(intervalId);
    setIsStart(false);
  };

  const updateDuration = (e) => {
    setDuration(Number(e.target.value));
  };

  useEffect(() => {
    return () => {
      if (isStart) {
        stop();
      }
    };
  }, [isStart]);

  return (
    <div>
      <h2>Лічильник</h2>
      <p>Поточне значення: {count}</p>
      <button onClick={updateCounter}>
        {mode === "додавання" ? "Додати" : "Відняти"}
      </button>
      <div>
        <label>
          Крок лічильника:
          <input type="number" value={step} onChange={updateStep} />
        </label>
      </div>
      <div>
        <label>
          Режим:
          <select value={mode} onChange={changeMode}>
            <option value="додавання">Додавання</option>
            <option value="віднімання">Віднімання</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Тривалість автокліку:
          <input type="number" value={duration} onChange={updateDuration} />
        </label>
      </div>
      <button onClick={start} disabled={isStart}>
        Старт
      </button>
      <button onClick={() => stop()}>Стоп</button>
    </div>
  );
};

export default Counter;
