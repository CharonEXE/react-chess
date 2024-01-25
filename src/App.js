import { useState, useEffect, useMemo, useCallback, forwardRef } from "react";
import { useMediaQuery } from "react-responsive"
import './App.css'
import Game from "./game";

export default function App(){
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



    return (
        <div className="container">
            <div className="split-container">
                <div className="split-row">
                    <div className="split-column left-pane">
                        <div id="evaluation" className="ai"></div>
                    </div>
                    <div className="split-column right-pane">
                        <div className="chessgame">
                            {}
                            {}
                            {}
                            {}
                            {}
                            <Game />    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
}