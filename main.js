

const btnStart = document.getElementById( 'btn-start' )
const btnRestart = document.getElementById( 'btn-restart' )

var newGame

btnStart.addEventListener( 'click', () => {
  newGame = new game()
  console.log( 'Start game' )
} )

btnRestart.addEventListener( 'click', () => {
  newGame = new game()
  console.log( 'Restart game' )
} )


class game {

  constructor() {
    this.start()
  }
  
  start() {
    this.createNewSequence = this.createNewSequence.bind(this)
    this.createNewSequence()
    this.showSequence()
  }

  createNewSequence() {
    this.sequence = new Array(10).fill(0).map( n => Math.floor(Math.random() * 4) )
  }

  level() {
    this.actualLevel = 0
  }

}