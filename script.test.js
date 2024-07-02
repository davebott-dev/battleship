const Ship = require('./script');

var ship = new Ship(5,0,false);


test('correct', () => {
    ship.hit()
    expect(ship.hits).toBe(1);
   });
  
 test('correct', () => {
    expect(ship.length).toBe(5);
   });

   test('correct', () => {
    expect(ship.sunk).toBe(false);
   });
