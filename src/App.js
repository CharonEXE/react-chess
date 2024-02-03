import { useState, useEffect/*, useMemo, useCallback, forwardRef*/ } from "react";
// import { useMediaQuery } from "react-responsive"
import './App.css'
import Game from "./game";
import MoveHistoryLogger from "./moveHistoryLogger";
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

    const [stateResetting, setStateResetting] = useState(false); // Signal to actually reset the game
    const [stateOver, setStateOver] = useState(false);
    const [stateReset, setStateReset] = useState(false); // State indicating reset request is made

    const [history, setHistory] = useState(null);

    const [dialogTitle, setDialogTitle] = useState(null);
    const [dialogContent, setDialogContent] = useState(null);

    useEffect(() => {
        if (stateResetting) {
            setStateResetting(false);
        }
    }, [stateResetting])

    useEffect(() => {
        if(history !== null)
        {
            console.log(history);
        }
    }, [history])

    const onClickReset = () => {
        setDialogTitle("Resetting Game");
        setDialogContent("Game will be reset. Confirm to proceed.");
        setStateReset(true);
    }

    const updateHistory = (gameHistory) => {
        setHistory(gameHistory);
    }

    const onGameReset = () => {
        if (!stateResetting) {
            setStateResetting(true);
            setHistory(null);
        }
    }

    const onGameOver = (gameResult) => {
        setDialogTitle("Game Over");
        setDialogContent(gameResult);
        setStateOver(true);
    }

    return (
        <div className="container">
            <div className="split-container">
                <div className="split-row">
                    <div className="split-column left-pane">
                        <div className='empty-container'></div>
                        <div className="log-container">
                            <div className='log-header-container'>
                                <div className="log-header">
                                    <table style={{ width: '100%'}}>
                                        <thead>
                                            <tr>
                                            <th>Move</th>
                                            <th>White</th>
                                            <th>Black</th>
                                            <th style={{ padding:"0px 7.5px 0px 7.5px"}}></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div className='log-body-container'>
                                <div className="log">
                                    <div className="MoveHistoryLogger">
                                        <MoveHistoryLogger
                                            moveHistory={history}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='main-button-container'>
                            <button className='main-button' onClick={onClickReset}>Reset Game</button>
                            <button className='main-button'>New VS Bot Game</button>
                        </div>
                        <div className='main-button-container'>
                            <button className='main-button'>Save Game</button>
                            <button className='main-button'>History</button>
                        </div>

                    </div>
                    <div className="split-column right-pane">
                        <div id="evaluator" className="ai"></div>
                        <div className="chessgame">
                            <Game 
                                stateResetting={stateResetting}
                                onGameOver={onGameOver}  
                                updateHistory={updateHistory} />
                            <CustomDialog
                                stateOver={stateOver}
                                open={stateOver}
                                title={dialogTitle}
                                contentText={dialogContent}
                                handlePositive={() => {
                                    onGameReset();
                                    setDialogContent(null);
                                    setStateOver(false);
                                }}
                                handleNegative={() => {
                                    setDialogContent(null);
                                    setStateOver(false);
                                }}
                            />  
                            <CustomDialog
                                stateReset={stateReset}
                                open={stateReset}
                                title={dialogTitle}
                                contentText={dialogContent}
                                handlePositive={() => {
                                    onGameReset();
                                    setDialogContent(null);
                                    setStateReset(false);
                                }}
                                handleNegative={() => {
                                    setDialogContent(null);
                                    setStateReset(false);
                                }}
                            />  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
}