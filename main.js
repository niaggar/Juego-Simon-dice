

const btnStart = document.getElementById( 'btn-start' )
const btnRestart = document.getElementById( 'btn-restart' )

const btnModalYes = document.getElementById( 'btn-ventana-yes' )
const btnModalNo = document.getElementById( 'btn-ventana-no' )

const modalRestart = document.getElementById( 'modal-restart' )
const table = document.querySelector( '.tablero' )

var newGame


table.addEventListener( 'click', value => {
  console.log( value )
} )

window.addEventListener( 'load',() => {
  btnRestart.disabled = true
} )

btnStart.addEventListener( 'click', () => {
  console.log( 'Start game' )
  newGame = new game()
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
    this.actualLevel = 10
    this.buttons = {
      topLeft: document.getElementById( 'num-1' ),
      topRight: document.getElementById( 'num-2' ),
      downLeft: document.getElementById( 'num-3' ),
      downRight: document.getElementById( 'num-4' )
    }
    this.start()
  }
  
  start() {
    this.createNewSequence = this.createNewSequence.bind(this)
    this.showSequence = this.showSequence.bind(this)
    this.illuminateButton = this.illuminateButton.bind(this)
    this.numToString = this.numToString.bind(this)
    this.createNewSequence()
    this.showSequence()

    btnStart.disabled = true
    btnRestart.disabled = false

  }
  
  createNewSequence() {
    this.sequence = new Array(10).fill(0).map( n => Math.floor( Math.random() * 4 ) )
  }
  
  showSequence() {
    console.log( this.sequence )
    for( var i = 0; i < this.actualLevel; i++ ) {
      let piece = this.sequence[i]
      console.log( piece )
      setTimeout( () => {
        this.illuminateButton( piece )
      }, 1200 * i )
    }
  }

  numToString( n ) {
    switch( n ) {
      case 0:
        return this.buttons.topLeft
      case 1:
        return this.buttons.topRight
      case 2:
        return this.buttons.downLeft
      case 3:
        return this.buttons.downRight
    }
  }

  illuminateButton( n ) {
    this.numToString( n ).classList.add( 'tablero__pieza-iluminada' )
    setTimeout( () => {
      this.numToString( n ).classList.remove( 'tablero__pieza-iluminada' )
    }, 600 )
  }

}
