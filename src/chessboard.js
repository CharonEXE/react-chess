import './chessboard.css';

function Chessboard(){
    return (
        <table class="chessboard">
            <tr class="chessboard" id="8">
                <td class="chessboard" id="a8"><span>a8</span><img src="assets\rookBlack.png" /></td>
                <td class="chessboard" id="b8"><span>b8</span><img src="assets\knightBlack.png" /></td>
                <td class="chessboard" id="c8"><span>c8</span><img src="assets\bishopBlack.png" /></td>
                <td class="chessboard" id="d8"><span>d8</span><img src="assets\queenBlack.png" /></td>
                <td class="chessboard" id="e8"><span>e8</span><img src="assets\kingBlack.png" /></td>
                <td class="chessboard" id="f8"><span>f8</span><img src="assets\bishopBlack.png" /></td>
                <td class="chessboard" id="g8"><span>g8</span><img src="assets\knightBlack.png" /></td>
                <td class="chessboard" id="h8"><span>h8</span><img src="assets\rookBlack.png" /></td>
            </tr>
            <tr class="chessboard" id="7">
                <td class="chessboard" id="a7"><span>a7</span><img src="assets\pawnBlack.png" /></td>
                <td class="chessboard" id="b7"><span>b7</span><img src="assets\pawnBlack.png" /></td>
                <td class="chessboard" id="c7"><span>c7</span><img src="assets\pawnBlack.png" /></td>
                <td class="chessboard" id="d7"><span>d7</span><img src="assets\pawnBlack.png" /></td>
                <td class="chessboard" id="e7"><span>e7</span><img src="assets\pawnBlack.png" /></td>
                <td class="chessboard" id="f7"><span>f7</span><img src="assets\pawnBlack.png" /></td>
                <td class="chessboard" id="g7"><span>g7</span><img src="assets\pawnBlack.png" /></td>
                <td class="chessboard" id="h7"><span>h7</span><img src="assets\pawnBlack.png" /></td>
            </tr>
            <tr class="chessboard" id="6">
                <td class="chessboard" id="a6"><span>a6</span></td>
                <td class="chessboard" id="b6"><span>b6</span></td>
                <td class="chessboard" id="c6"><span>c6</span></td>
                <td class="chessboard" id="d6"><span>d6</span></td>
                <td class="chessboard" id="e6"><span>e6</span></td>
                <td class="chessboard" id="f6"><span>f6</span></td>
                <td class="chessboard" id="g6"><span>g6</span></td>
                <td class="chessboard" id="h6"><span>h6</span></td>
            </tr>
            <tr class="chessboard" id="5">
                <td class="chessboard" id="a5"><span>a5</span></td>
                <td class="chessboard" id="b5"><span>b5</span></td>
                <td class="chessboard" id="c5"><span>c5</span></td>
                <td class="chessboard" id="d5"><span>d5</span></td>
                <td class="chessboard" id="e5"><span>e5</span></td>
                <td class="chessboard" id="f5"><span>f5</span></td>
                <td class="chessboard" id="g5"><span>g5</span></td>
                <td class="chessboard" id="h5"><span>h5</span></td>
            </tr>
            <tr class="chessboard" id="4">
                <td class="chessboard" id="a4"><span>a4</span></td>
                <td class="chessboard" id="b4"><span>b4</span></td>
                <td class="chessboard" id="c4"><span>c4</span></td>
                <td class="chessboard" id="d4"><span>d4</span></td>
                <td class="chessboard" id="e4"><span>e4</span></td>
                <td class="chessboard" id="f4"><span>f4</span></td>
                <td class="chessboard" id="g4"><span>g4</span></td>
                <td class="chessboard" id="h4"><span>h4</span></td>
            </tr>
            <tr class="chessboard" id="3">
                <td class="chessboard" id="a3"><span>a3</span></td>
                <td class="chessboard" id="b3"><span>b3</span></td>
                <td class="chessboard" id="c3"><span>c3</span></td>
                <td class="chessboard" id="d3"><span>d3</span></td>
                <td class="chessboard" id="e3"><span>e3</span></td>
                <td class="chessboard" id="f3"><span>f3</span></td>
                <td class="chessboard" id="g3"><span>g3</span></td>
                <td class="chessboard" id="h3"><span>h3</span></td>
            </tr>
            <tr class="chessboard" id="2">
                <td class="chessboard" id="a2"><span>a2</span><img src="assets\pawnWhite.png" /></td>
                <td class="chessboard" id="b2"><span>b2</span><img src="assets\pawnWhite.png" /></td>
                <td class="chessboard" id="c2"><span>c2</span><img src="assets\pawnWhite.png" /></td>
                <td class="chessboard" id="d2"><span>d2</span><img src="assets\pawnWhite.png" /></td>
                <td class="chessboard" id="e2"><span>e2</span><img src="assets\pawnWhite.png" /></td>
                <td class="chessboard" id="f2"><span>f2</span><img src="assets\pawnWhite.png" /></td>
                <td class="chessboard" id="g2"><span>g2</span><img src="assets\pawnWhite.png" /></td>
                <td class="chessboard" id="h2"><span>h2</span><img src="assets\pawnWhite.png" /></td>
            </tr>
            <tr class="chessboard" id="1">
                <td class="chessboard" id="a1"><span>a1</span><img src="assets\rookWhite.png" /></td>
                <td class="chessboard" id="b1"><span>b1</span><img src="assets\knightWhite.png" /></td>
                <td class="chessboard" id="c1"><span>c1</span><img src="assets\bishopWhite.png" /></td>
                <td class="chessboard" id="d1"><span>d1</span><img src="assets\queenWhite.png" /></td>
                <td class="chessboard" id="e1"><span>e1</span><img src="assets\kingWhite.png" /></td>
                <td class="chessboard" id="f1"><span>f1</span><img src="assets\bishopWhite.png" /></td>
                <td class="chessboard" id="g1"><span>g1</span><img src="assets\knightWhite.png" /></td>
                <td class="chessboard" id="h1"><span>h1</span><img src="assets\rookWhite.png" /></td>
            </tr>
        </table>
    )
}

export default Chessboard;