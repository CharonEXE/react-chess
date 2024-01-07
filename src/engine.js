import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function ChessEngine() {
    const game = useMemo(() => new Chess(), []); // Use callback
    const [gameAi, setGameAi] = useState(game); // For Stockfish to update
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [fen, setFen] = useState(game.fen());
    const [squareStyle, setSquareStyle] = useState({});
    const [moveFrom, setMoveFrom] = useState(null);
    const [moveTo, setMoveTo] = useState(null);

    // TODO: Stockfish can update the game thru this function
    // function safeGameMutate(modify) {
    //     setGame((g) => {
    //       const update = { ...g };
    //       modify(update);
    //       return update;
    //     });
    //   }


    // const move = useCallback(
    //     (moveData) => {
    //         // try {
    //             const result = game.move(moveData);
    //         // } catch (error) {
    //         //     return null;
    //         // }
    //     }
    // );

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

        updateSquareStyle(square, availableMove);
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
        </div>);
}