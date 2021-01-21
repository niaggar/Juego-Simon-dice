

const btnStart = document.getElementById( 'btn-start' )
const btnRestart = document.getElementById( 'btn-restart' )

var newGame

window.addEventListener( 'load',() => {
  btnRestart.disabled = true
} )

btnStart.addEventListener( 'click', () => {
  newGame = new game()
  btnRestart.disabled = false
  console.log( 'Start game' )
} )

btnRestart.addEventListener( 'click', () => {
  
  return new Promise( function( resolve, reject ){
    var data = prompt('Prueba')

    if (data == 'yes') {
      resolve()
    } else {
      reject('invalid data')
    }

  } ).then( () => {
    console.log( 'Restarting the game' )
    setTimeout( () => {
      newGame = new game()
    }, 2000)

  } ).catch( value => {
    console.log(value)
  })

} )


class game {

  constructor() {
    this.start()
  }
  
  start() {
    this.createNewSequence = this.createNewSequence.bind(this)
    this.showSequence = this.showSequence.bind(this)
    this.createNewSequence()
    this.showSequence()
    // this.desactivateButton()

    btnStart.disabled = true
    btnRestart.disabled = true
  }

  desactivateButton() {
    if (btnRestart.disabled) {
      btnRestart.disabled = false
    }
  }

  createNewSequence() {
    this.sequence = new Array(10).fill(0).map( n => Math.floor(Math.random() * 4) )
  }

  level() {
    this.actualLevel = 0
  }

  showSequence() {
    console.log(this.sequence)
  }

}