

const btnStart = document.getElementById( 'btn-start' )
const btnRestart = document.getElementById( 'btn-restart' )

const btnModalYes = document.getElementById( 'btn-ventana-yes' )
const btnModalNo = document.getElementById( 'btn-ventana-no' )

const modal = document.getElementById( 'modal-restart' )
const table = document.querySelector( '.tablero' )

const txtLevel = document.getElementById( 'text-level' )

const txtModal = document.getElementById( 'modal__text' )
const txtModalColor = document.getElementById( 'modal__text-color' )

const maxLevel = 5


table.addEventListener( 'click', value => {
  console.log( value )
} )

window.addEventListener( 'load',() => {
  btnRestart.disabled = true
  btnStart.disabled = false
} )

btnStart.addEventListener( 'click', () => {
  console.log( 'Start game' )
  window.newGame = new game()
} )


btnRestart.addEventListener( 'click', () => {

  btnModalNo.classList.remove( 'ocultar' )
  btnModalYes.textContent = 'Yes'
  txtModal.textContent = 'Do you want restart the game?'
  txtModalColor.textContent = ''
  txtModalColor.style.color = '#c91616'

  window.newGame.removeDetectClick()
  
  return new Promise( function( resolve, reject ){
    modal.classList.toggle( 'ventana-cerrar' )
    btnModalYes.addEventListener( 'click', () => {
      resolve()
    } )
    btnModalNo.addEventListener( 'click', () => {
      reject()
    } )
    
  } ).then( () => {
    restartGame()
    
  } ).catch( () => {
    modal.classList.toggle( 'ventana-cerrar' )
    window.newGame.addDetectClick()
  })

} )

const restartGame = () => {
  modal.classList.toggle( 'ventana-cerrar' )
  setTimeout( () => {
    window.newGame = new game()
  }, 1500)

  btnModalYes.removeEventListener( 'click', restartGame )
}


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
    this.confirmSelectPart = this.confirmSelectPart.bind(this)
    btnStart.disabled = true
    btnRestart.disabled = false
    this.createNewSequence()
    this.showSequence()
    this.addDetectClick()
    txtLevel.innerHTML = this.actualLevel
  }
  
  nextLevel() {
    this.subLevel = 0
    this.actualLevel = this.actualLevel + 1
    txtLevel.innerHTML = this.actualLevel
    this.showSequence()
    this.addDetectClick()
  }
  
  createNewSequence() {
    this.sequence = []
    this.sequence = new Array(maxLevel).fill(0).map( n => Math.floor( Math.random() * 4 ) )
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
    let selectedPart = parseInt(data.target.dataset.pieza)
    
    if ( selectedPart || selectedPart == 0 ) {
      this.removeDetectClick()
      this.confirmSelectPart(selectedPart)
    }

  }

  confirmSelectPart( s ) {
    this.illuminateButton( s )
    if ( s == this.sequence[this.subLevel] ) {

      if ( this.subLevel == ( this.actualLevel - 1 ) ) {
        if ( this.actualLevel == maxLevel ) {
          setTimeout( () => {
            this.alertWin()
          }, 500 )
        } else {
          setTimeout( () => {
            this.nextLevel()
          }, 1000 )
        }
      } else {
        this.subLevel = this.subLevel + 1
        this.addDetectClick()
      }
    
    } else {
      setTimeout( () => {
        this.alertLose()
      }, 500 )
    }

  }

  alertWin() {
    modal.classList.toggle( 'ventana-cerrar' )
    btnModalNo.classList.add( 'ocultar' )
    btnModalYes.textContent = 'Try Again'
    txtModal.textContent = 'You '
    txtModalColor.textContent = 'WIN'
    txtModalColor.style.color = '#149c3d'

    btnModalYes.addEventListener( 'click', restartGame )
  }
  
  alertLose() {
    modal.classList.toggle( 'ventana-cerrar' )
    btnModalNo.classList.add( 'ocultar' )
    btnModalYes.textContent = 'Try Again'
    txtModal.textContent = 'You '
    txtModalColor.textContent = 'LOSE'
    txtModalColor.style.color = '#c91616'

    btnModalYes.addEventListener( 'click', restartGame )
  }

}
