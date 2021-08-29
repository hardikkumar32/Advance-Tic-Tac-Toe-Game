let cell = document.querySelectorAll('[data-cell]')
let board = document.getElementById('board')
let win_msg = document.getElementById('winningMessage')
let restart = document.getElementById('restartButton')
let win_text = document.querySelector('[data-winning-msg-text]')
const CIRCLE_CLASS =  "circle"
const X_CLASS = "x"
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]
let nextTurn = true
let checkClass
cell.forEach((blocks)=>{
    blocks.addEventListener("click",handle,{once:true})
})
function handle(e){
    setNextTurnPlusHover(e)
    const currentClass = checkClass ? X_CLASS : CIRCLE_CLASS
    if(checkWin(currentClass)){
       win_msg.classList.add("show")
       endgame(false);
    }
    else if(isDraw()){ 
        win_msg.classList.add("show")
        endgame(true);
    }
}
function setNextTurnPlusHover(e){
    if(nextTurn){
        checkClass = true;
        e.target.classList.add(X_CLASS)
        nextTurn = false;
            board.classList.add(CIRCLE_CLASS)
            board.classList.remove(X_CLASS)
    }
    else{
        checkClass = false;
        e.target.classList.add(CIRCLE_CLASS)
        nextTurn = true
            board.classList.add(X_CLASS)
            board.classList.remove(CIRCLE_CLASS)
    }
}
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some((combination)=>{
        return combination.every((index)=>{
           return cell[index].classList.contains(currentClass)
        })
    })
}
function restartGame(){
    restart.addEventListener("click",()=>{
        cell.forEach((c)=>{
            c.classList.remove(X_CLASS)
            c.classList.remove(CIRCLE_CLASS)
            c.removeEventListener('click',handle)
            c.addEventListener("click",handle,{once:true})
            win_msg.classList.remove("show")
        })
    })
}
function isDraw(){
    return [...cell].every((cells) =>{
        return cells.classList.contains(X_CLASS) || cells.classList.contains(CIRCLE_CLASS)
    })
 }
function endgame(draw){
    if(draw){
      win_text.innerHTML = 'Draw!'
      restartGame()
    }
    else{
     win_text.innerHTML = `Hey u won ${checkClass ? "X" : "O"}`
     restartGame();
    }
}

