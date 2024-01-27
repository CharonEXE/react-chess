import { useState, useEffect, useMemo, useCallback, forwardRef } from "react";
// import { useMediaQuery } from "react-responsive"
import './App.css'
import Game from "./game";
import CustomDialog from "./customDialog";

export default function App(){

    // TODO Add different component for different screensize based on width pixel
    // TODO https://blog.logrocket.com/using-react-responsive-to-implement-responsive-design/
    
    // const [chessboardSize, setChessboardSize] = useState(undefined);
    // const [selectedBoard, setSelectedBoard] = useState("PlayVsRandom");
  
    // useEffect(() => {
    //   function handleResize() {
    //     const display = document.getElementsByClassName("container")[0];
    //     setChessboardSize(display.offsetWidth - 20);
    //   }
  
    //   window.addEventListener("resize", handleResize);
    //   handleResize();
    //   return () => window.removeEventListener("resize", handleResize);
    // }, []);

    // const isMobileDevice = useMediaQuery({
    //     query: "(min-device-width: 480px)",
    // });

    // const isTabletDevice = useMediaQuery({
    //     query: "(min-device-width: 768px)",
    // });

    // const isLaptop = useMediaQuery({
    //     query: "(min-device-width: 1024px)",
    // });

    // const isDesktop = useMediaQuery({
    //     query: "(min-device-width: 1200px)",
    // });

    // const isBigScreen = useMediaQuery({
    //     query: "(min-device-width: 1201px )",
    // });


    // TODO with Notes 
    // Three main custom components
    // 1) User Interface features (Main Menu... bar(?), history, forward, backward)
    // 2) Game Interface (which done developed, pending improvement)
    // 3) Stockfish Interface (eval, best move, bot...) !!!

    // <MainMenuBar>

    const [stateReset, setStateReset] = useState(false);
    const [stateOver, setStateOver] = useState(null);


    useEffect(() => {
        if (stateReset) {
            setStateReset(false);
        }
    })

    const onClickReset = () => {
        if (!stateReset) {
            setStateReset(true);
        }
    }

    const onGameOver = (gameResult) => {
        setStateOver(gameResult);
    }

    const checkGameOver = useCallback((valGameOver, valCheckMate, valTurn, valDraw) => {
        if (valGameOver) {
            if (valCheckMate) {
                setStateOver(`Checkmate!!! ${valTurn === "w" ? "Black" : "White"} wins!`); 
              } else if (valDraw) {
                setStateOver("Stalemate! Draw"); 
              } else {
                setStateOver("Game over");
              }
        }
    })

    return (
        <div className="container">
            <div className="split-container">
                <div className="split-row">
                    <div className="split-column left-pane">
                        <div className='empty-container'></div>
                        <div className='log-container'>
                            <div className='main-log'></div>
                        </div>
                        <div className='main-button-container'>
                            <button className='main-button' onClick={onClickReset}>Reset Game</button>
                            <button className='main-button'>New VS Bot Game</button>
                        </div>
                        <div className='main-button-container'>
                            <button className='main-button'>Save Game</button>
                            <button className='main-button'>History</button>
                        </div>

                        <div id="evaluation" className="ai"></div>
                    </div>
                    <div className="split-column right-pane">
                        <div className="chessgame">
                            {}
                            {}
                            {}
                            {}
                            {}
                            <Game 
                                stateReset={stateReset}
                                onGameOver={onGameOver}/>  
                            <CustomDialog
                                open={Boolean(stateOver)}
                                title={"Game Over"}
                                contentText={stateOver}
                                handleRestart={() => {
                                    onClickReset();
                                    setStateOver(null);
                                }}
                                handleContinue={() => {
                                    setStateOver(null);
                                }}
                            />  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
}