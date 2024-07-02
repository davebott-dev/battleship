class Gameboard {
    constructor() {
        this.board = null;
        this.allPositions = [];
    }
    makeBoard() {
        let boardArr = [];
        for(let i =0; i<10; i++) {
            let rowArr = [];
            for(let j=0;j<10;j++){
                rowArr.push(j)
            }
            boardArr.push(rowArr)
        }
        this.board = boardArr;
    }
    place(ship,cordY,cordX) {
        if(cordX<0 || cordX>9 || cordY <0 || cordY > 9|| cordY+ship.length>9 ) {
            throw new Error('Out Of Bounds');
        }

            let positionsArr = [];

                let y = cordY
            for(let i =0; i<ship.length;i++) {
                var shipArr = [];
                shipArr.push(y,cordX)
                positionsArr.push(shipArr);
                y++;
            }
            this.allPositions.push(positionsArr);

            console.log(positionsArr);



}
receiveAttack(cordY,cordX) {
this.allPositions.forEach((element) => {
    element.forEach((coordinate) => {
        console.log(coordinate)
        if (coordinate.includes(cordY) && coordinate.includes(cordX) ) {
            console.log('Boom! Your Ship was hit.')
        } else {
            console.log('Miss')
        }

    })
   
   
})

}

   
}
class Ship {
    constructor(length,hits,sunk) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
        this.position =null;
    }
    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
        }
        
    }
    hit() {
        this.hits++;
        this.isSunk();
    }
   
  
}







const gameboard = new Gameboard();
const ship1 = new Ship(2, 0, false);
const ship2 = new Ship (3, 0, false);

console.log(ship1);
console.log(ship2)


gameboard.makeBoard();

gameboard.place(ship1,6,1)

gameboard.receiveAttack(3,1)

console.log(gameboard);




//module.exports = Ship;





