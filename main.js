

const btnStart = document.getElementById( 'btn-start' )
const btnRestart = document.getElementById( 'btn-restart' )

const btnModalYes = document.getElementById( 'btn-ventana-yes' )
const btnModalNo = document.getElementById( 'btn-ventana-no' )

const modalRestart = document.getElementById( 'modal-restart' )

var newGame

window.addEventListener( 'load',() => {
  btnRestart.disabled = true
} )

btnStart.addEventListener( 'click', () => {
  newGame = new game()
  console.log( 'Start game' )
} )


btnRestart.addEventListener( 'click', () => {
  
  return new Promise( function( resolve, reject ){

    modalRestart.classList.toggle( 'ventana-cerrar' )
    
    btnModalYes.addEventListener( 'click', () => {
      resolve( 'Restarting the game...' )
    } )
    btnModalNo.addEventListener( 'click', () => {
      reject( 'Cancel' )
    } )
    
    
  } ).then( value => {
    console.log( value )
    modalRestart.classList.toggle( 'ventana-cerrar' )
    setTimeout( () => {
      newGame = new game()
    }, 2000)
    
  } ).catch( value => {
    console.log( value )
    modalRestart.classList.toggle( 'ventana-cerrar' )
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
    btnRestart.disabled = false
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




