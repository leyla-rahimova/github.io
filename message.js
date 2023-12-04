document.addEventListener('DOMContentLoaded', function() {
    //say hi open button
    function openChat() {
        document.getElementById('chat').style.display = 'block';
    }

    // say hi close button
    function closeChat() {
        document.getElementById('chat').style.display = 'none';
    }

    //redirecting to home page
    if (performance.navigation.type === 2) {
        var form = document.getElementById('chat');
        if (form) {
            form.style.display = 'none';
        }

        var thankYou = document.getElementById('thanks');
        if (thankYou) {
            thanks.style.display = 'block';
            setTimeout(function() {
                thankYou.style.display = 'none';
            }, 15000);
        }
    }

    // dark mode
    function toggleDarkMode() {
        var modeIcon = document.getElementById('modeIcon');
    
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            modeIcon.classList.remove('bi-moon');
            modeIcon.classList.add('bi-brightness-high');
        } else {
            document.body.classList.add('dark-mode');
            modeIcon.classList.remove('bi-brightness-high');
            modeIcon.classList.add('bi-moon');
        }
    }

    // tic tac toe
    function startGame() {
        document.getElementById('start').style.display = 'none';
        document.getElementById('tic').classList.remove('blur');
        document.getElementById('gameBoard').classList.remove('hidden');

        var cells = document.querySelectorAll('#board td');
        cells.forEach(function (cell) {
            cell.addEventListener('click', function() {
                makeMove(cell);
            })
        })
    }
     
    var currentPlayer = 'X';
    var gameBoard = ['', '', '', '', '', '', '', '', ''];

    function makeMove(cell) {
        var index = cell.cellIndex + cell.parentNode.rowIndex * 3;

        if (gameBoard[index] === '' && !isGameFinished()) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            switchPlayer();
            checkWinner();
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    var currentPlayer = 'X';
    var gameBoard = ['', '', '', '', '', '', '', '', ''];
    var xWins = 0;
    var oWins = 0;
    
    function checkWinner() {
        var winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (var i = 0; i < winningCombinations.length; i++) {
            var [a, b, c] = winningCombinations[i];
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                alert(gameBoard[a] + ' wins!');
                restartGame();
                return;
            }
        }

        if (isBoardFull()) {
            alert('It\'s a draw!');
            restartGame();
        }
    }

    function isBoardFull() {
        return gameBoard.every(cell => cell !== '');
    }

    function isGameFinished() {
        return isBoardFull() || getWinner() !== null;
    }

    function getWinner() {
        var winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (var i = 0; i < winningCombinations.length; i++) {
            var [a, b, c] = winningCombinations[i];
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    // restart game button tic tac toe
    function restartGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
    
        var cells = document.querySelectorAll('#board td');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    document.getElementById('openChat').addEventListener('click', openChat);
    document.getElementById('closeChat').addEventListener('click', closeChat);
    document.getElementById('ModeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('restart').addEventListener('click', restartGame);
    
    // to the top button
    var button = document.getElementById('backToTop');

    document.addEventListener('scroll', function() {
        button.style.display = (window.scrollY > window.innerHeight) ? 'block' : 'none';
    });

    button.addEventListener('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});
