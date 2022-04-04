
let usrInfo = document.querySelector("#playerInfoSubmission")
usrInfo.addEventListener("click", getUserInfo)
let choices = document.querySelectorAll(".choice")




const xMarker = 'X'
const oMarker = 'O'

const p1 = new player("", xMarker)
const p2 = new player("", oMarker)

let numOfTurns = 0

//adding eventlisten to each square
for (let i = 0; i < choices.length; i++){
    let choice = choices[i]
    choice.addEventListener("click", userChoice)

}

function player(name, marker){
    this.name = name
    this.marker = marker
    this.choices = []
    this.replay = false
    this.tie = false
    this.win = false
}

function gameboard(p1,p2){
    this.checkWinner = checkWinner()
}

function clearDiv(element){
  let first = element.firstElementChild;
  while(first){
      first.remove()
      first = element.firstElementChild
  }
}

function clearGameBoard(){
    for (let i = 0; i < choices.length; i++){
        let choice = choices[i]
        choice.innerText =""
    }
    p1.choices =[]
    p2.choices = []
    numOfTurns = 0
    whosTurn(numOfTurns)
}
function getUserInfo(){
   
    let p1Name = document.getElementById("p1").value
    let p2Name = document.getElementById("p2").value
    
    if (p1Name == ""){
        p1Name = "player1"
    } 

    if (p2Name == ""){
        p2Name = "player2"
    }

    p1.name = p1Name
    p2.name = p2Name

    let infoGathering = document.querySelector(".playerInfo")
    clearDiv(infoGathering)

    let competition = document.createElement("h2")
    competition.classList.add("heading")
    competition.innerText = p1.name + " vs " + p2.name; 
    
    infoGathering.appendChild(competition)

    let turn = document.createElement("p")
    //turn.innerText = "It is " + p1.name + " turn"
    turn.setAttribute('id','whosTurn')
    infoGathering.appendChild(turn)
    whosTurn(numOfTurns)
    setUpReset()
    //numOfTurns++
}

function whosTurn(numOfTurns){
    let turn = document.querySelector("#whosTurn")
    if (numOfTurns %2 == 0){
            turn.innerText = "It is " + p1.name + " turn"
            return [p2, p1]
        } else {
            turn.innerText = "It is " + p2.name + " turn"
            return[p1, p2]
        }   
}

function unique_choice(choice){

    if (p1.choices.includes(choice) || p2.choices.includes(choice)){
        return false
    } 
    return true
}

let replay = false
let currTurn = p1
let notTurn = p2
const winningCombinations = [['a1','a2','a3'], ['a1','a4','a7'], ['a1','a5','a9'],['a4','a5','a6'],['a3','a5','a7'],['a2','a5','a8'],['a3','a6','a9'],['a7','a8','a9']]

function checkWinner(){
    console.log(currTurn.name)
    let win = false
    for (let i = 0; i < winningCombinations.length; i++){
        let wc = winningCombinations[i]
        let ct = currTurn.choices

        if (win){
            break; 
        }
        console.log(wc)
        for (let j = 0; j < wc.length; j++){
            if (ct.includes(wc[j])){
                win = true
            } else {
                win = false
                break;
            }
        }
    }
    return win
}
function userChoice(e){
    if(p1.name =="" || p2.name =="" ){
        getUserInfo()
    }
    let choice = e.target.value

    let uniqueChoice = unique_choice(choice)
    if (!uniqueChoice){
        alert("Already chosen, please choose another option!")
        replay = true
    } else {
        numOfTurns++;
        let order = whosTurn(numOfTurns)
        currTurn = order[0]
        notTurn = order[1]
        
        currTurn.choices.push(choice)
        let specific = document.getElementById(`${choice}`)
        specific.innerText = currTurn.marker
        
        if (numOfTurns > 4 ){
            let winner = checkWinner()
            let turn = document.querySelector("#whosTurn")
            if (winner){
                turn.innerText = `${currTurn.name} is the winner!`
                for (let i = 0; i < choices.length; i++){
                let choice = choices[i]
                choice.removeEventListener("click", userChoice)
               

                }
                
            } else if (numOfTurns == 9) {
                turn.innerText = `It is a tie!`
            }
        }
    }
        
    
    
    console.log(currTurn.name + " vs " + currTurn.choices)
    console.log(notTurn.name + " vs " + notTurn.choices)
    console.log(numOfTurns)
    console.log("----")
    
    
    
}

function setUpReset (){
    let infoGathering = document.querySelector(".playerInfo")
    let reset = document.createElement("Button")
    let resetText = document.createTextNode("Reset")
    reset.appendChild(resetText)
    reset.classList.add("reset")
    infoGathering.appendChild(reset)
    let resetQuery = document.querySelector(".reset")
    resetQuery.addEventListener("click", clearGameBoard)

}