const net = require('net')
let clients = [];

const startboard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let gameboard = [...startboard];

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getWinner(gameboard, current) {
	if (gameboard[0] == current && gameboard[1] == current && gameboard[2] == current) {
		return true
	} else if (gameboard[3] == current && gameboard[4] == current && gameboard[5] == current) {
		return true
	} else if (gameboard[6] == current && gameboard[7] == current && gameboard[8] == current) {
		return true
	} else if (gameboard[0] == current && gameboard[3] == current && gameboard[6] == current) {
		return true
	} else if (gameboard[1] == current && gameboard[4] == current && gameboard[7] == current) {
		return true
	} else if (gameboard[2] == current && gameboard[5] == current && gameboard[8] == current) {
		return true
	} else if (gameboard[0] == current && gameboard[4] == current && gameboard[8] == current) {
		return true
	} else if (gameboard[6] == current && gameboard[4] == current && gameboard[2] == current) {
		return true
	}
	return false

}

function printBoard(board) {
	let string = `${board[0]}|${board[1]}|${board[2]}`;
	string += `\n-----`;
	string += `\n${board[3]}|${board[4]}|${board[5]}`;
	string += `\n-----`;
	string += `\n${board[6]}|${board[7]}|${board[8]}\n\n\n`;
	return string
}

function selector(current) {
	if (current === "X") {
		return "0";
	} else {
		return "X";
	}
}


function move(board, player, value) {
	if (checkEmptyCell(board, value)) {
		board[value - 1] = player;
		return true
	} else {
		return false
	}
}
function checkEmptyCell(board, value) {
	const cell = board[value - 1]
	return cell !== "X" || cell !== "O"
}

function currentValue(value) {
	if (isNaN(value) || value > 9 || value < 1 || value == undefined || value == null) {
		return false
	}
	return true
}
let playerO;
let playerX;
let count = 0;
let restart = false

function playerMove(firstPlayer, secondPlayer, current, value) {
	if (clients.length === 2) {
		if (currentValue(value) == true) {
			if (restart) {
				count = 1;
				gameboard = [...startboard];
				current.write(`${current} You are win!\n`)
				currentSecond.write(`${currentSecond} you are lose\n`)
				current.write(`${printBoard(gameboard)}${current}: ${value}\n`)
				currentSecond.write(`${$printBoard(gameboard)}${current}: ${value}\n`)
				currentSecond = current
				current = current;
				restart = true;
			}

			if (currentSecond = current) {
				if (move(gameboard, current, value) == true) {
					firstPlayer.write(`${printBoard(gameboard)}`)
					secondPlayer.write(`${printBoard(gameboard)}`)
					count++
					if (getWinner(gameboard, current) || count > 9) {
						if (getWinner(gameboard, current)) {
							firstPlayer.write(`Flawless victory \n`)
							current = selector(current)
							secondPlayer.write(`Oops! You are lose =(\n`)
							restart = true
						} else {
							firstPlayer.write(`nobody won\n`);
							secondPlayer.write(`nobody won\n`)
						}
					} else {
						currentSecond = selector(currentSecond);
						secondPlayer.write(`Your turn ${currentSecond}: \n`);
					}
				} else {
					firstPlayer.write(`${printBoard(gameboard)}\n`)
				}
			} else {
				firstPlayer.write(`please wait for second player is turn!\n`)
			}
		} else {
			firstPlayer.write(`Please enter valid value from!\n`)
		}
	} else restart = true;
}



const server = net.createServer(function (socket) {
	socket.write("Wellcome, wait for the game to start\r\n");
	const port = socket.remotePort;
	const ip = socket.remoteAddress

	clients.push(socket);
	socket.pipe(process.stdout);

	console.log("Connected Port:", port);
	console.log("Client IP:", ip);

	if (clients.length === 1) {
		socket.write("The game will start when a second player is connected!\n");

	} else if (clients.length === 2) {

		if (getRandomInt(10) > 5) {
			playerX = clients[0];
			playerO = clients[1];

		} else {
			playerX = clients[1];
			playerO = clients[0];
		}

		clients.forEach((clients) => {
			clients.write("Game is start\n");
		});

		playerX.write(`Your turn X. Enter a number from (1-9): \n`);
		playerO.write(`You are 0, please wait X for move \n`);
		playerX.on("data", (message) => {
			playerMove(playerX, playerO, "X", Number(message));
		});
		playerO.on("data", (message) => {
			playerMove(playerO, playerX, "0", Number(message));
		});
	}

	socket.on("close", () => {
		clients.splice(clients.indexOf(socket), 1)
		console.log("closed ", port);
	});
});

server.maxConnections = 2;
server.listen(1337, "127.0.0.1");
/*
And connect with a tcp client from the command line using netcat, the *nix
utility for reading and writing across tcp/udp network connections.
$ netcat 127.0.0.1 1337
You should see:
> Echo server
*/
