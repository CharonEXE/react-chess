import { useState, useMemo, useCallback } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Engine } from "./engine.js"
import CustomDialog from "./customDialog";

export default function Game() {
    // const game = useMemo(() => new Chess("r1b1k1nr/1p2bpQp/p2qp3/8/8/2N2B2/PPP2PPP/R1B1K2R b KQkq - 0 12"), []); 
    const game = useMemo(() => new Chess(), []); 
    const [over, setOver] = useState(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [fen, setFen] = useState(game.fen());
    const [squareStyle, setSquareStyle] = useState({});
    const [moveFrom, setMoveFrom] = useState(null);
    const [moveTo, setMoveTo] = useState(null);

    const engine = useMemo(() => new Engine(), []);

    function resetGame() {
        try {
            console.log("Game reseting.");
            game.reset();
            resetSelectedPiece();
            resetSquareStyle();
            setFen(game.fen());
            return;
        } catch (error) {
            console.error("Error resetting game:", error);
            return;
        }

    }

    // TODO: Stockfish can update the game thru this function
    // function safeGameMutate(modify) {
    //     console.log(modify);
    //     setGame((g) => {
    //       const update = { ...g };
    //       modify(update);
    //       return update;
    //     });
    // }

    const checkGameOver = useCallback(() => {
        try {
            if (game.isGameOver()) {
                console.log(game);
                if (game.isCheckmate()) {
                  setOver(`Checkmate!!! ${game.turn() === "w" ? "Black" : "White"} wins!`); 
                } else if (game.isDraw()) {
                  setOver("Stalemate! Draw"); 
                } else {
                  setOver("Game over");
                }
            }
        } catch (error) {
            return null;
        }
    }, [game]);

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

    function extractMoveOption(square) {
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
        // console.log(availableMove);
        // console.log(availableMoveFen);
        updateSquareStyle(square, availableMove);
        engine.evalMoves(game.fen(), availableMove, availableMoveFen);
        return true;
    }

    function resetSelectedPiece() {
        setMoveFrom(null);
        resetSquareStyle();
    }

    function updateSelectedPiece(square) {
        // Do nothing if no chess pieces are currently selected and
        // user clicked on empty square
        if (!game.get(square)) {
            return
        }
        setMoveFrom(square);
        extractMoveOption(square);
        return;
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
            if (result) {
                resetSquareStyle();
                setMoveFrom(null);
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
            <CustomDialog
                open={Boolean(over)}
                title={"Game Over"}
                contentText={over}
                handleRestart={() => {
                    resetGame();
                    setOver(null);
                }}
                handleContinue={() => {
                    setOver(null);
                }}
            />
        </div>
        );
}