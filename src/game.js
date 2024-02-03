import { useState, useMemo, useCallback, forwardRef, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { AiEngine } from "./engineCore.js"


// TODO Break down the feature that we want to be here

export default function Game({ stateResetting, onGameOver, updateHistory }) {
    const game = useMemo(() => new Chess(), []); 
    const [fen, setFen] = useState(game.fen());
    const [history, setHistory] = useState(game.history());

    const [moveFrom, setMoveFrom] = useState(null);
    const [moveTo, setMoveTo] = useState(null);

    const [score, setScore] = useState({});

    const aiEngine = useMemo(() => new AiEngine(), []);

    const [squareStyle, setSquareStyle] = useState({});
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    
    useEffect(() => {
        if (stateResetting) {
            resetGame();
        }
    })

    useEffect(() => {
        updateHistory(history);
    }, [history, updateHistory])

    const CustomSquareRenderer = (props, ref) => {
        const { children, square, squareColor, style } = props;
        var scoreStyle = null;
        if (score[square]) {
            scoreStyle = {
                position: "absolute",
                left: 1,
                top: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 12,
                width: 22,
                borderTopLeftRadius: 6,
                // TODO: Change color according to score
                backgroundColor: squareColor === "black" ? "#064e3b" : "#312e81",
                color: "#fff",
                fontSize: 10,
            };
        }

        return (
        <div ref={ref} style={{ ...style, position: "relative" }}>
            {children}
            <div
            style={scoreStyle}
            >
            {score[square]} 
            </div>
        </div>
        );
    };
    

  
    function resetSquareStyle() {
        setSquareStyle({});
    }

    function updateSquareStyle(clickedSquare, availableMove) {
        const squareStyleData = {};
        squareStyleData[clickedSquare] = {
            background: "rgba(255, 255, 0, 0.4)",
        }
        try {
            availableMove.map((move) => {
                squareStyleData[move.to] = {
                    background:
                        game.get(move.to) && 
                        game.get(move.to).color !== game.get(clickedSquare).color
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                    borderRadius: "50%",
                };
                return move;
            });
            setSquareStyle(squareStyleData);
        } catch (error) {
            setSquareStyle(squareStyleData);
            return;
        }
    }



    function resetGame() {
        try {
            console.log("Game reseting.");
            game.reset();
            resetSelectedPiece();
            resetSquareStyle();
            setFen(game.fen());
            setHistory(game.history());
            return;
        } catch (error) {
            console.error("Error resetting game:", error);
            return;
        }

    }

    const checkGameOver = useCallback(() => {
        try {
            if (game.isGameOver()) {
                if (game.isCheckmate()) {
                    onGameOver(`Checkmate!!! ${game.turn() === "w" ? "Black" : "White"} wins!`); 
                } else if (game.isDraw()) {
                    onGameOver("Stalemate! Draw"); 
                } else {
                    onGameOver("Game over");
                }
            }
        } catch (error) {
            return null;
        }
    }, [game, onGameOver]);



    function resetSelectedPiece() {
        setMoveFrom(null);
        resetSquareStyle();
        setScore({});
    }

    function updateSelectedPiece(square) {
        if (!game.get(square)) {
            return
        }
        setMoveFrom(square);
        extractMoveOption(square);
        return;
    }



    async function extractMoveOption(square) {
        const availableMove = game.moves({
            square,
            verbose: true,
        });

        const availableMoveFen = [];
        availableMove.map((move) => {
            let clonedGame = new Chess(game.fen());
            clonedGame.move({
                from: move.from,
                to: move.to,
            });
            availableMoveFen.push(clonedGame.fen());
            return move;
        })
        updateSquareStyle(square, availableMove);
        const newScore = await aiEngine.evalMoves(availableMove, availableMoveFen);
        setScore(newScore);
        return true;
    }


    function validateMove(square) {
        const availableMove = game.moves({
            moveFrom,
            verbose: true,
        });
        
        const foundMove = availableMove.find(
            (move) => move.from === moveFrom && move.to === square
            );

        if (!foundMove) {
            return false;
        } else {
            setMoveTo(square);
            if (validatePromotion(foundMove, square)) {
                setShowPromotionDialog(true);
                return true;
            }
            const result = game.move({
                from: moveFrom,
                to: square,
            });
            setHistory(game.history());
            if (result) {
                resetSquareStyle();
                setMoveFrom(null);
                setScore({});
                setFen(game.fen());
                checkGameOver();
                return true;
            }
        }
    }

    function validatePromotion(move, square) {
        if ((move.color === "w" && move.piece === "p" && square[1] === "8") ||
            (move.color === "b" && move.piece === "p" && square[1] === "1")) {
            return true;
        } else {
            return false;
        }
    }


    function onPromotionPieceSelect(piece) {
        if (piece) {
            game.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q", 
            });
            setHistory(game.history());
        }

        resetSelectedPiece();
        setMoveTo(null);
        setShowPromotionDialog(false);
        setFen(game.fen());
        checkGameOver();
        return true;
    }
    
    function onPieceDragStart(piece, square) {
        setMoveFrom(square);
        extractMoveOption(square);
    }

    function onPieceDrop(sourceSquare, targetSquare) {
        if (targetSquare === sourceSquare) {
            return;
        }

        if (!validateMove(targetSquare)) {
            resetSelectedPiece();
            return;
        }
    }

    function onSquareClick(square) {
        if (!moveFrom) {
            updateSelectedPiece(square);
            return;
        } else {
            // Click on the same square twice will cancel the selection
            if (square === moveFrom) {
                setMoveFrom(null);
                resetSquareStyle();
                return;
            }

            if (!validateMove(square)) {
                updateSelectedPiece(square);
                return;
            }
        }

    }

    return (
        <div> 
            <Chessboard
                customSquare={forwardRef((props,ref) => CustomSquareRenderer(
                    {
                        score: score,
                        ...props
                    },
                    ref
                ))}
                customSquareStyles={squareStyle}
                position={fen}
                onPieceDragBegin={onPieceDragStart}
                onPieceDrop={onPieceDrop}
                onSquareClick={onSquareClick}
                onSquareRightClick={resetSelectedPiece}
                onPromotionPieceSelect={onPromotionPieceSelect}
                promotionToSquare={moveTo}
                showPromotionDialog={showPromotionDialog}
            /> 
        </div>
        );
}