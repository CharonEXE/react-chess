export class AiEngine {
    constructor() {
        this.stockfish = new Worker("./stockfish.js");

        // Init engine
        this.stockfish.postMessage("uci");
        this.stockfish.postMessage("isready");
    }

    async evalMoves(moves, fens) {
        const scores = {};
        for (let i = 0; i < moves.length; i++) {
            scores[moves[i].to] = await this.evalMove(fens[i]);
            // console.log(`${moves[i].to}: ${scores[moves[i].to]}`);
        }
        return scores;
    }

    async evalMove(nextFen) {
        return new Promise(async (resolve) => {
            
            // Define the Event Handler function
            const handleMessageEval = (event) => {
                if (event["data"].includes("Total Evaluation")) {
                    const score = event["data"].slice(18).split(' (')[0];
                    this.stockfish.removeEventListener("message", handleMessageEval);
                    resolve(score);
                }
            };
            // Set up an event listener to handle the response from the worker.
            this.stockfish.addEventListener("message", handleMessageEval); 

            const nextBestMove = await this.getBestMove(nextFen, 10);

            // console.log(`position fen ${nextFen} moves ${nextBestMove}`);
            this.stockfish.postMessage(`position fen ${nextFen} moves  ${nextBestMove}`);
            this.stockfish.postMessage("eval");
        })
    }

    getBestMove(fen, depth) {
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
