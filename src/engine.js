export class Engine {
    constructor() {
        this.stockfish = new Worker("./stockfish.js");

        // Init engine
        this.stockfish.postMessage("uci");
        this.stockfish.postMessage("isready");
    }

    stop() {
        this.stockfish.postMessage("stop"); // Run when changing positions
    }
    quit() {
        this.stockfish.postMessage("quit"); // Good to run this before unmounting.
    }


    async evalMoves(currentFen, moves, fens) {
        for (let i = 0; i < moves.length; i++) {
            await this.evalMove(currentFen, moves[i], fens[i]);
        }
        console.log("");
    }

    async evalMove(currentFen, nextMove, nextFen) {
        return new Promise(async (resolve) => {
            
            // Define the Event Handler function
            const handleMessageEval = (event) => {
                if (event["data"].includes("Total Evaluation")) {
                    const score = event["data"].slice(18).split(' (')[0];
                    console.log(`${nextMove.to}: ${score}`);
                    this.stockfish.removeEventListener("message", handleMessageEval);
                    resolve();
                }
            };
            // Set up an event listener to handle the response from the worker.
            this.stockfish.addEventListener("message", handleMessageEval); 

            const nextBestMove = await this.getBestMove(nextFen, 17);

            // this.stockfish.postMessage(`ucinewgame`);

            // console.log(`position fen ${currentFen} moves ${nextMove.from}${nextMove.to} ${nextBestMove}`);
            // this.stockfish.postMessage(`position fen ${currentFen} moves ${nextMove.from}${nextMove.to} ${nextBestMove}`);

            console.log(`position fen ${nextFen} moves ${nextBestMove}`);
            this.stockfish.postMessage(`position fen ${nextFen} moves  ${nextBestMove}`);
            this.stockfish.postMessage("eval");

        })
    }

    // TODO Complete this function
    getBestMove(fen, depth) {
        // TODO Return bestMove
        return new Promise((resolve) => {

            const handleMessageBestMove = (event) => {
                if (event["data"].includes("bestmove")) {
                    const bestMove = event["data"].split(" ")[1];
                    this.stockfish.removeEventListener("message", handleMessageBestMove);
                    resolve(bestMove);
                }
            };

            this.stockfish.addEventListener("message", handleMessageBestMove);

            // this.stockfish.postMessage(`ucinewgame`);
            this.stockfish.postMessage(`position fen ${fen}`);
            this.stockfish.postMessage(`go depth ${depth}`);
        })
    }

    // TODO A method to eval current position



      
    evaluatePositionOri(fen, depth) {
        this.stockfish.postMessage(`position fen ${fen}`);
        this.stockfish.postMessage(`go depth ${depth}`);
    }

    evalPos(fen) {
        this.stockfish.postMessage(`position fen ${fen}`);
        this.stockfish.postMessage(`eval`);
    }

    evalBestMove(fen, moves) {
        this.stockfish.postMessage(`go depth 20`);
    }

    handleMessage(message) {
        if (message["data"].includes("Total Evaluation") || message["data"].includes("bestmove")) {
            console.log(`${message["data"]}`);
        }

        if (message["data"].includes("bestmove")) {
            const bestMove = message["data"].slice(9);
            console.log(bestMove);
        }

    }



}
