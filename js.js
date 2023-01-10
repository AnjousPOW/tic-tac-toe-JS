//крестики нулик
//именование
const CROSS = 0;
const NOUGHT = 1;
const FREE = -1;

//Начальное состояние, поле свободно, ходит кркстики
move = CROSS;
grid = [[FREE, FREE, FREE],
        [FREE, FREE, FREE],
        [FREE, FREE, FREE]];
        //массив строк таблици
game_grid = document.getElementById('game_grid').children[0].children; 

//функция возращает победившего игрока или не кто не победил
function getWinner(){
    //Проверка горизонтали
    for(let i = 0; i < 3; ++i){  
        let hVert = true;
        let hwin = true;
        let winnerHorizontal = grid[i][0];
        let winnerVertical = grid[0][i];
            
         //если после цикла , то победа по горозонтали
        for(let j = 0; j < 3; ++j){
            if(grid[i][j] != grid[i][0] || grid[i][j] == FREE){
                hwin = false;
            }
            //проверка вертикали
            if(grid[j][i] != grid[0][i] || grid [j][i] == FREE){
                    hVert = false;
            }
        }
        //победа 
        if(hwin){
            return winnerHorizontal;
        }
        else if(hVert){
            return winnerVertical;
        }
        
    }
    //Диагональ
    let firstDiag = true; //флаг для главной
    let secondDiag = true; //флаг для побочной 
    for(let i = 0; i < 3; ++i){
        if(grid[i][i] != grid [0][0] || grid[i][i] == FREE){
                firstDiag = false;
        }
        if(grid[i][2-i] != grid[0][2] | grid [i][2-i] == FREE){
                secondDiag = false;
            }   
    }
 
    if(firstDiag || secondDiag){
        return grid[1][1];//цетеральный элемент
    }
    return FREE; // не кто пока не победил
}
//Функция возращает если ничья
function isDraw(){
    for(let i = 0; i < 3; ++i){
        for(let j = 0; j < 3; ++j){
            if(grid[i][j] == FREE){
                return false;
            }          
        }
    }
    return true;
}
//Функция которая возращает кто победитл или ничья
function gameOver(){
    //Если есть победитель - игра закончена 
    if(getWinner() != FREE){
        return true;
    }
    // проверка на нечью
    return isDraw();
} 
//функцимя которая проверяет можно или нет сходить в данную клетку
function canMove(row, column){
    //проверк выхода за границы
    if(row < 0 || row > 2 || column < 0 || column > 2){
        return false;
    }
    return grid[row][column]  == FREE;
}

//Функция которая принимает текущего игрока (и ставит  крестик или нулик)
function makeMove(player, row, column){
   grid[row][column] = player;    
}

//функция которая отрисовывает  игровое поле
function drawGrid(){
    for(let i = 0; i < 3; ++i){
        for(let j = 0; j < 3; ++j){
            if(grid[i][j] == CROSS){
                game_grid[i].children[j].innerHTML = 'X';
            } else if(grid[i][j] == NOUGHT){
                game_grid[i].children[j].innerHTML = '0';
            } else{
                game_grid[i].children[j].innerHTML = '';
            }
            
        }
    }   

}

//Очистить поле и начать новую игру
function newGame(){
    for(let i =0; i < 3; ++i){
        for(let j = 0; j < 3; ++j){
            grid[i][j] = FREE;
        }
    }
    move = CROSS;
    document.getElementById('text').innerHTML = '';
}
//обработчик событий 
for(let i =0; i < 3; ++i){
    for(let j = 0; j < 3; ++j){
        game_grid[i].children[j].addEventListener('click', function(e){
            if(gameOver()){
                return false;
            }                      
            if(canMove(i, j)){
                makeMove(move, i, j);
                move = move ^1;
                drawGrid();
                if(move === 0){
                    document.getElementById('winner').innerHTML = "Сейчас ход 'X'";
                } else if(move === 1){
                    document.getElementById('winner').innerHTML = "Сейчас ход '0'";
                }

            }
            if(gameOver()){
                document.getElementById('text').innerHTML = "GAME OVER!";
                document.getElementById('winner').innerHTML = "ПОБЕДИЛА ДРУЖБА!";
                if(getWinner() === 1){
                    document.getElementById('text').innerHTML = "GAME OVER!";
                    document.getElementById('winner').innerHTML = "Победил Нулик!";
                } else if(getWinner() === 0) {
                    document.getElementById('text').innerHTML = "GAME OVER!";
                    document.getElementById('winner').innerHTML = "Победил Крестик!";
                }
            }
            
        });
    }
}

//Обрабочик событий на кнопку
document.getElementById('new_game').addEventListener('click', function(e){
    newGame();
    drawGrid();
});

////добавитбь стили
/// добавить кто ходит

/// кто победил