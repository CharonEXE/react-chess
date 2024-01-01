import React, { useState } from 'react';
import './chessboard.css';

function Chessboard(){
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [positions, setPositions] = useState({
        a1: 'rookWhite',
        b1: 'knightWhite',
        c1: 'bishopWhite',
        d1: 'queenWhite',
        e1: 'kingWhite',
        f1: 'bishopWhite',
        g1: 'knightWhite',
        h1: 'rookWhite',

        a2: 'pawnWhite',
        b2: 'pawnWhite',
        c2: 'pawnWhite',
        d2: 'pawnWhite',
        e2: 'pawnWhite',
        f2: 'pawnWhite',
        g2: 'pawnWhite',
        h2: 'pawnWhite',

        a7: 'pawnBlack',
        b7: 'pawnBlack',
        c7: 'pawnBlack',
        d7: 'pawnBlack',
        e7: 'pawnBlack',
        f7: 'pawnBlack',
        g7: 'pawnBlack',
        h7: 'pawnBlack',

        a8: 'rookBlack',
        b8: 'knightBlack',
        c8: 'bishopBlack',
        d8: 'queenBlack',
        e8: 'kingBlack',
        f8: 'bishopBlack',
        g8: 'knightBlack',
        h8: 'rookBlack'
    });

    const handlePieceClick = (position) => {
        if (selectedPiece === null) {
            setSelectedPiece(position);
        } else {
            // If a piece is selected and clicked on a different position, move the piece
            if (position !== selectedPiece) {
                const updatedPositions = { ...positions };
                updatedPositions[position] = positions[selectedPiece];
                updatedPositions[selectedPiece] = null; // Empty the previously selected position
                setPositions(updatedPositions);
            }
            setSelectedPiece(null); // Reset selected piece
        }
    };

    return (
        <table class="chessboard">
            <tr class="chessboard" id="8">
                <td class="chessboard"><span>a8</span>
                    <div id='a8'><img src="assets\rookBlack.png" 
                        alt="piece"
                        onClick={() => handlePieceClick('a1')}/></div></td>
                <td class="chessboard"><span>b8</span>
                    <div id='b8'><img src="assets\knightBlack.png" /></div></td>
                <td class="chessboard"><span>c8</span>
                    <div id='c8'><img src="assets\bishopBlack.png" /></div></td>
                <td class="chessboard"><span>d8</span>
                    <div id='d8'><img src="assets\queenBlack.png" /></div></td>
                <td class="chessboard"><span>e8</span>
                    <div id='e8'><img src="assets\kingBlack.png" /></div></td>
                <td class="chessboard"><span>f8</span>
                    <div id='f8'><img src="assets\bishopBlack.png" /></div></td>
                <td class="chessboard"><span>g8</span>
                    <div id='g8'><img src="assets\knightBlack.png" /></div></td>
                <td class="chessboard"><span>h8</span>
                    <div id='h8'><img src="assets\rookBlack.png" /></div></td>
            </tr>
            <tr class="chessboard" id="7">
                <td class="chessboard"><span>a7</span>
                    <div id='a7'><img src="assets\pawnBlack.png" /></div></td>
                <td class="chessboard"><span>b7</span>
                    <div id='b7'><img src="assets\pawnBlack.png" /></div></td>
                <td class="chessboard"><span>c7</span>
                    <div id='c7'><img src="assets\pawnBlack.png" /></div></td>
                <td class="chessboard"><span>d7</span>
                    <div id='d7'><img src="assets\pawnBlack.png" /></div></td>
                <td class="chessboard"><span>e7</span>
                    <div id='e7'><img src="assets\pawnBlack.png" /></div></td>
                <td class="chessboard"><span>f7</span>
                    <div id='f7'><img src="assets\pawnBlack.png" /></div></td>
                <td class="chessboard"><span>g7</span>
                    <div id='g7'><img src="assets\pawnBlack.png" /></div></td>
                <td class="chessboard"><span>h7</span>
                    <div id='h7'><img src="assets\pawnBlack.png" /></div></td>
            </tr>
            <tr class="chessboard" id="6">
                <td class="chessboard"><span>a6</span><div id='a6'></div></td>
                <td class="chessboard"><span>b6</span><div id='b6'></div></td>
                <td class="chessboard"><span>c6</span><div id='c6'></div></td>
                <td class="chessboard"><span>d6</span><div id='d6'></div></td>
                <td class="chessboard"><span>e6</span><div id='e6'></div></td>
                <td class="chessboard"><span>f6</span><div id='f6'></div></td>
                <td class="chessboard"><span>g6</span><div id='g6'></div></td>
                <td class="chessboard"><span>h6</span><div id='h6'></div></td>
            </tr>
            <tr class="chessboard" id="5">
                <td class="chessboard"><span>a5</span><div id='a5'></div></td>
                <td class="chessboard"><span>b5</span><div id='b5'></div></td>
                <td class="chessboard"><span>c5</span><div id='c5'></div></td>
                <td class="chessboard"><span>d5</span><div id='d5'></div></td>
                <td class="chessboard"><span>e5</span><div id='e5'></div></td>
                <td class="chessboard"><span>f5</span><div id='f5'></div></td>
                <td class="chessboard"><span>g5</span><div id='g5'></div></td>
                <td class="chessboard"><span>h5</span><div id='h5'></div></td>
            </tr>
            <tr class="chessboard" id="4">
                <td class="chessboard"><span>a4</span><div id='a4'></div></td>
                <td class="chessboard"><span>b4</span><div id='b4'></div></td>
                <td class="chessboard"><span>c4</span><div id='c4'></div></td>
                <td class="chessboard"><span>d4</span><div id='d4'></div></td>
                <td class="chessboard"><span>e4</span><div id='e4'></div></td>
                <td class="chessboard"><span>f4</span><div id='f4'></div></td>
                <td class="chessboard"><span>g4</span><div id='g4'></div></td>
                <td class="chessboard"><span>h4</span><div id='h4'></div></td>
            </tr>
            <tr class="chessboard" id="3">
                <td class="chessboard"><span>a3</span><div id='a3'></div></td>
                <td class="chessboard"><span>b3</span><div id='b3'></div></td>
                <td class="chessboard"><span>c3</span><div id='c3'></div></td>
                <td class="chessboard"><span>d3</span><div id='d3'></div></td>
                <td class="chessboard"><span>e3</span><div id='e3'></div></td>
                <td class="chessboard"><span>f3</span><div id='f3'></div></td>
                <td class="chessboard"><span>g3</span><div id='g3'></div></td>
                <td class="chessboard"><span>h3</span><div id='h3'></div></td>
            </tr>
            <tr class="chessboard" id="2">
                <td class="chessboard"><span>a2</span><div id='a2'>
                    <img src="assets\pawnWhite.png" /></div></td>
                <td class="chessboard"><span>b2</span><div id='b2'>
                    <img src="assets\pawnWhite.png" /></div></td>
                <td class="chessboard"><span>c2</span><div id='c2'>
                    <img src="assets\pawnWhite.png" /></div></td>
                <td class="chessboard"><span>d2</span><div id='d2'>
                    <img src="assets\pawnWhite.png" /></div></td>
                <td class="chessboard"><span>e2</span><div id='e2'>
                    <img src="assets\pawnWhite.png" /></div></td>
                <td class="chessboard"><span>f2</span><div id='f2'>
                    <img src="assets\pawnWhite.png" /></div></td>
                <td class="chessboard"><span>g2</span><div id='g2'>
                    <img src="assets\pawnWhite.png" /></div></td>
                <td class="chessboard"><span>h2</span><div id='h2'>
                    <img src="assets\pawnWhite.png" /></div></td>
            </tr>
            <tr class="chessboard" id="1">
                <td class="chessboard"><span>a1</span><div id='a1'>
                    <img src="assets\rookWhite.png" /></div></td>
                <td class="chessboard"><span>b1</span><div id='b1'>
                    <img src="assets\knightWhite.png" /></div></td>
                <td class="chessboard"><span>c1</span><div id='c1'>
                    <img src="assets\bishopWhite.png" /></div></td>
                <td class="chessboard"><span>d1</span><div id='d1'>
                    <img src="assets\queenWhite.png" /></div></td>
                <td class="chessboard"><span>e1</span><div id='e1'>
                    <img src="assets\kingWhite.png" /></div></td>
                <td class="chessboard"><span>f1</span><div id='f1'>
                    <img src="assets\bishopWhite.png" /></div></td>
                <td class="chessboard"><span>g1</span><div id='g1'>
                    <img src="assets\knightWhite.png" /></div></td>
                <td class="chessboard"><span>h1</span><div id='h1'>
                    <img src="assets\rookWhite.png" /></div></td>
            </tr>
        </table>
    )
}




export default Chessboard;