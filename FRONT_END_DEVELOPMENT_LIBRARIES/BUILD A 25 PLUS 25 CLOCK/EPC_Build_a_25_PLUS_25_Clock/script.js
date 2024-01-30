const { useState, useEffect, useRef } = React;
const { render } = ReactDOM;


function App() {

  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerOn, setTimerOn] = useState(false);
  const [breakOn, setBreakOn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
 
  const [audio, setAudio] = useState("https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav");


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    },
  [darkMode]);
  

  const timeFormat = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  

  const handleIncrementDecrement = (type, amount) => {

    const isValidLength = (length) => length > 1 && length < 60;
  
    if (type === "break" && isValidLength(breakLength)) {
      setBreakLength((prev) => prev + amount);
    } else if (type === "session" && isValidLength(sessionLength)) {
      setSessionLength((prev) => {
        setDisplayTime((prev + amount) * 60);
        return prev + amount;
      });
    }
  };
  

  const startTimer = () => {
    let breakOnVar = breakOn;
    if (timerOn) {
      clearInterval(timerOn);
      setTimerOn(false);
    } else if (!timerOn) {
      let interval = setInterval(() => {
        setDisplayTime((prev) => {
          if (prev === 0 && !breakOnVar) {
            playAudio();
            breakOnVar = true;
            setBreakOn(true);
            return breakLength * 60;
          } else if (prev === 0 && breakOnVar) {
            playAudio();
            breakOnVar = false;
            setBreakOn(false);
            return sessionLength * 60;
          }
          {
            return prev - 1;
          }
        });
      }, 1000);
      setTimerOn(interval);
    }
  };

 
  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setDisplayTime(25 * 60);
    setTimerOn(false);
    setBreakOn(false);
    clearInterval(timerOn);
    clearInterval(breakOn);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };


  const audioRef = useRef();

  const playAudio = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };



  const getTimerClassName = () => (displayTime < 60) ? "timedisplay-flash" : "";


  return (
    <div className="timer">
      <h1 className="text-center m-5 title">
        25 + 5 Clock
        <button
          className="btn btn-lg float-end p-3 drkmdbtn"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>
      </h1>
      <div className="settetrs d-flex max-vh-100 max-vw-100 justify-content-evenly">
        <div className="box row justify-content-evenly">
          <h2 className="text-center" id="break-label">
            Break
          </h2>
          <button
            className="btn col more"
            id="break-increment"
            onClick={() => handleIncrementDecrement("break", 1)}
          >
            <i class="fa-solid fa-angles-up"></i>
          </button>
          <h2 className="col text-center" id="break-length">
            {breakLength}
          </h2>
          <button
            className="btn col less"
            id="break-decrement"
            onClick={() => handleIncrementDecrement("break", -1)}
          >
            <i class="fa-solid fa-angles-down"></i>
          </button>
        </div>

        <div className="box row justify-content-evenly">
          <h2 className="text-center" id="session-label">
            Session
          </h2>
          <button
            className="btn col more"
            id="session-increment"
            onClick={() => handleIncrementDecrement("session", 1)}
          >
          <i class="fa-solid fa-angles-up"></i>
          </button>
          <h2 className="col text-center" id="session-length">
            {sessionLength}
          </h2>
          <button
            className="btn col less"
            id="session-decrement"
            onClick={() => handleIncrementDecrement("session", -1)}
          >
            <i class="fa-solid fa-angles-down"></i>
          </button>
        </div>
      </div>

      <div className="pt-5 d-flex max-vh-100 max-vw-100 justify-content-center">
        <div className="container mt-3">
          <h2 className="mt-2" id="timer-label">
            {breakOn ? "Break" : "Session"}
          </h2>
          <audio ref={audioRef} src={audio} id="beep" />
          <div className="col p-3 mb-3">
            <h1
              className={`timedisplay ${getTimerClassName()} `}
              id="time-left"
            >
              {timeFormat(displayTime)}
            </h1>
          </div>
            <button className="btn less" id="start_stop" onClick={startTimer}>
              {timerOn ? (
                // <i className=" fa-solid fa-pause"></i>
                <i class="fa-solid fa-pause"></i>
              ) : (
                // <i className=" fa-solid fa-play "></i>
                <i class="fa-solid fa-play"></i>
              )}
            </button>
            <button className="btn more" id="reset" onClick={reset}>
              <i class=" fa-solid fa-rotate"></i>
            </button>
          </div>
      </div>
      <div className="footer mt-5">
        25 + 5 Clock (c) 2024
      </div>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));