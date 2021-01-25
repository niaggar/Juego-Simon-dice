

const btnStart = document.getElementById( 'btn-start' )
const btnRestart = document.getElementById( 'btn-restart' )

const btnModalYes = document.getElementById( 'btn-ventana-yes' )
const btnModalNo = document.getElementById( 'btn-ventana-no' )

const modalRestart = document.getElementById( 'modal-restart' )
const table = document.querySelector( '.tablero' )


window.addEventListener( 'load',() => {
  btnRestart.disabled = true
} )

btnStart.addEventListener( 'click', () => {
  console.log( 'Start game' )
  window.newGame = new game()
} )


btnRestart.addEventListener( 'click', () => {

  window.newGame.removeDetectClick()
  
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
      window.newGame = new game()
    }, 2000)
    
  } ).catch( value => {
    console.log( value )
    modalRestart.classList.toggle( 'ventana-cerrar' )
  })

} )


class game {

  constructor() {
    this.actualLevel = 1
    this.subLevel = 0
    this.buttons = {
      num0: document.getElementById( 'num-0' ),
      num1: document.getElementById( 'num-1' ),
      num2: document.getElementById( 'num-2' ),
      num3: document.getElementById( 'num-3' )
    }
    this.start()
  }
  
  start() {
    this.createNewSequence = this.createNewSequence.bind(this)
    this.showSequence = this.showSequence.bind(this)
    this.illuminateButton = this.illuminateButton.bind(this)
    this.numToString = this.numToString.bind(this)
    this.validateSelectedPart = this.validateSelectedPart.bind(this)
    this.tableEventClick = this.tableEventClick.bind(this)
    btnStart.disabled = true
    btnRestart.disabled = false
    this.createNewSequence()
    console.log( this.sequence )
    this.showSequence()
    this.addDetectClick()
    
  }
  
  nextLevel() {
    this.subLevel = this.subLevel + 1
    this.actualLevel = this.actualLevel + 1
    this.showSequence()
    this.addDetectClick()
  }
  
  createNewSequence() {
    this.sequence = []
    this.sequence = new Array(10).fill(0).map( n => Math.floor( Math.random() * 4 ) )
  }
  
  showSequence() {
    for( var i = 0; i < this.actualLevel; i++ ) {
      let piece = this.sequence[i]
      setTimeout( () => {
        this.illuminateButton( piece )
      }, 1200 * i )
    }
  }

  numToString( n ) {
    switch( n ) {
      case 0:
        return this.buttons.num0
      case 1:
        return this.buttons.num1
      case 2:
        return this.buttons.num2
      case 3:
        return this.buttons.num3
    }
  }

  illuminateButton( n ) {
    this.numToString( n ).classList.add( 'tablero__pieza-iluminada' )
    setTimeout( () => {
      this.numToString( n ).classList.remove( 'tablero__pieza-iluminada' )
    }, 600 )
  }

  addDetectClick() {
    table.addEventListener( 'click', this.tableEventClick )
  }

  removeDetectClick() {
    table.removeEventListener( 'click', this.tableEventClick )
  }

  tableEventClick( i ) {
    this.validateSelectedPart( i )
  }

  validateSelectedPart( data ) {
    // this.removeDetectClick()
    let selectedPart = parseInt(data.target.dataset.pieza)
    
    if ( selectedPart || selectedPart == 0 ) {
      this.confirmSelectPart(selectedPart)
    }

  }

  confirmSelectPart(s) {
    this.illuminateButton(s)
    if ( s == this.sequence[this.subLevel] ) {
      setTimeout( () => {
        this.nextLevel()
      }, 1000 )
    }
  }

}
