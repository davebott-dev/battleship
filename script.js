class Gameboard {
    constructor() {
      this.board = null;
      this.allPositions = [];
    }
    makeBoard() {
      let boardArr = [];
      for (let i = 0; i < 10; i++) {
        let rowArr = [];
        for (let j = 0; j < 10; j++) {
          rowArr.push(j)
        }
        boardArr.push(rowArr)
      }
      this.board = boardArr;
    }
    place(ship, cordY, cordX) {
      if (cordX < 0 || cordX > 9 || cordY < 0 || cordY > 9 || cordY - 1 + ship.length > 9) {
        throw new Error('Out Of Bounds');
      }
  
      let positionsArr = [];
  
      let y = cordY
      for (let i = 0; i < ship.length; i++) {
        var shipArr = [];
        shipArr.push(y, cordX)
        positionsArr.push(shipArr);
        y++;
      }
  
      ship.position = positionsArr;
  
      this.allPositions.push(ship);
  
  
  
    }
    receiveAttack(cordY, cordX) {
      this.allPositions.forEach((element) => {
        element.position.forEach((coordinate => {
          if (coordinate[0] == (cordY) && coordinate[1] == (cordX)) {
            console.log('Boom! Your Ship was hit.');
            element.hit();
  
          }
        }))
      })
  
    }
  
  }
  class Ship {
    constructor(length, hits, sunk) {
      this.length = length;
      this.hits = hits;
      this.sunk = sunk;
      this.position = null;
    }
    isSunk() {
      if (this.hits === this.length) {
        console.log('Your Ship Has Sank!');
        this.sunk = true;
      }
  
  
    }
    hit() {
      if (this.sunk == false) {
        this.hits++;
        this.isSunk();
      } else {
        console.log('Miss')
      }
  
    }
  
  
  
  }
  
  class Player {
    constructor() {
      this.player1 = null;
      this.player2 = null;
      this.computer = null;
    }
  
  }
  
  
  
  
  
  
  
  const gameboard = new Gameboard();
  const ship1 = new Ship(4, 0, false);
  const ship2 = new Ship(3, 0, false);
  const ship3 = new Ship(1, 0, false);
  
  
  console.log(ship1);
  console.log(ship2);
  
  
  gameboard.makeBoard();
  gameboard.place(ship1, 5, 6)
  gameboard.place(ship2, 3, 1)
  gameboard.place(ship3, 1, 2)
  gameboard.receiveAttack(3, 1)
  gameboard.receiveAttack(1, 2);
  gameboard.receiveAttack(4, 1);
  gameboard.receiveAttack(5, 1);
  
  
  
  console.log(gameboard);
  
  console.log(ship2)
  console.log(ship1)
  console.log(ship3)
  
  
  
  //module.exports = Ship;
  
  
  
  
  const grid = document.querySelector(".container");
  const grid2 = document.querySelector(".container2");
  
  const carrierBtn = document.getElementById("carrierBtn");
  const battleshipBtn = document.getElementById("battleshipBtn");
  const cruiserBtn = document.getElementById("cruiserBtn");
  const submarineBtn = document.getElementById("submarineBtn");
  const destroyerBtn = document.getElementById("destroyerBtn");
  const rotateBtn = document.getElementById("rotateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const continueBtn = document.getElementById('continueBtn');
  const compGB = document.getElementById('compGB');
  resetBtn.disabled = true;
  rotateBtn.disabled = true;
  continueBtn.disabled = true;
  
  
  function makeGrid() {
    let count = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add(count++);
        cell.classList.add("cell");
        grid.appendChild(cell);
  
      }
    }
  }
  
  makeGrid();
  
  const cell = document.querySelectorAll(".cell");
  let carrierBtnClicked = false;
  let battleshipBtnClicked = false;
  let cruiserBtnClicked = false;
  let submarineBtnClicked = false;
  let destroyerBtnClicked = false;
  var arr = []
  
  
  
  carrierBtn.addEventListener("click", () => {
    rotateBtn.disabled = false;
    cell.forEach((element) => {
      element.classList.remove('disabled')
  
      if (element.classList.contains('horizontal')) {
        element.classList.toggle('horizontal')
      }
    })
  
  
    carrierBtnClicked = true;
    battleshipBtnClicked = false;
    cruiserBtnClicked = false;
    submarineBtnClicked = false;
    destroyerBtnClicked = false;
  
    cell.forEach((element) => {
      element.addEventListener("mouseover", () => {
        if (element.classList[0] < 60 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 30)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 40)) {
              innerElement.style.backgroundColor = "green";
            }
          })
        } else if (element.classList[0] > 59 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "red";
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 30)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 40)) {
              innerElement.style.backgroundColor = "red";
            }
          })
  
        } else if (element.classList[0] < 96 && element.classList[0] > 89 && element.classList.contains('horizontal') ||
          element.classList[0] < 86 && element.classList[0] > 79 && element.classList.contains('horizontal') ||
          element.classList[0] < 76 && element.classList[0] > 69 && element.classList.contains('horizontal') ||
          element.classList[0] < 66 && element.classList[0] > 59 && element.classList.contains('horizontal') ||
          element.classList[0] < 56 && element.classList[0] > 49 && element.classList.contains('horizontal') ||
          element.classList[0] < 46 && element.classList[0] > 39 && element.classList.contains('horizontal') ||
          element.classList[0] < 36 && element.classList[0] > 29 && element.classList.contains('horizontal') ||
          element.classList[0] < 26 && element.classList[0] > 19 && element.classList.contains('horizontal') ||
          element.classList[0] < 16 && element.classList[0] > 9 && element.classList.contains('horizontal') ||
          element.classList[0] < 6 && element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
        } else {
          element.style.backgroundColor = "red";
        }

        if (element.classList.contains('highlighted')) {
            element.style.backgroundColor = "red";
            
            cell.forEach((innerElement) => {
                if (element.style.backgroundColor =="red") {
                    if(innerElement.style.backgroundColor == "green") {
                        innerElement.style.backgroundColor = "red"
                    }
                }
            })
        }
        if (element.style.backgroundColor == "green") {
            cell.forEach((innerElement) => {
                if (innerElement.style.backgroundColor =="green") {
                    if(innerElement.classList.contains('highlighted')) {
                        element.style.backgroundColor = "red";
                        
                        cell.forEach((innestElement) => {
                            if(innestElement.style.backgroundColor == "green") {
                                innestElement.style.backgroundColor = "red";
                            }
                        })
                    
                    }
                }
             
            })
        }
       
      });
    })
  
    cell.forEach((element) => {
      element.addEventListener("mouseout", () => {
  
        element.style.backgroundColor = "";
  
        cell.forEach((innerElement) => {
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 10)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 20)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 30)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 40)) {
            innerElement.style.backgroundColor = "";
          }
  
        })
      });
  
  
    })
  })
  
  battleshipBtn.addEventListener("click", () => {
    rotateBtn.disabled = false;
    cell.forEach((element) => {
      element.classList.remove('disabled')
  
      if (element.classList.contains('horizontal')) {
        element.classList.toggle('horizontal')
      }
    })
  
    carrierBtnClicked = false;
    battleshipBtnClicked = true;
    cruiserBtnClicked = false;
    submarineBtnClicked = false;
    destroyerBtnClicked = false;
  
    cell.forEach((element) => {
      element.addEventListener("mouseover", () => {
  
  
        if (element.classList[0] < 70 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 30)) {
              innerElement.style.backgroundColor = "green";
            }
          })
        } else if (element.classList[0] > 69 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "red";
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 30)) {
              innerElement.style.backgroundColor = "red";
            }
          })
  
        } else if (element.classList[0] < 97 && element.classList[0] > 89 && element.classList.contains('horizontal') ||
          element.classList[0] < 87 && element.classList[0] > 79 && element.classList.contains('horizontal') ||
          element.classList[0] < 77 && element.classList[0] > 69 && element.classList.contains('horizontal') ||
          element.classList[0] < 67 && element.classList[0] > 59 && element.classList.contains('horizontal') ||
          element.classList[0] < 57 && element.classList[0] > 49 && element.classList.contains('horizontal') ||
          element.classList[0] < 47 && element.classList[0] > 39 && element.classList.contains('horizontal') ||
          element.classList[0] < 37 && element.classList[0] > 29 && element.classList.contains('horizontal') ||
          element.classList[0] < 27 && element.classList[0] > 19 && element.classList.contains('horizontal') ||
          element.classList[0] < 17 && element.classList[0] > 9 && element.classList.contains('horizontal') ||
          element.classList[0] < 7 && element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
        } else {
          element.style.backgroundColor = "red";
        }

        if (element.classList.contains('highlighted')) {
            element.style.backgroundColor = "red";
            
            cell.forEach((innerElement) => {
                if (element.style.backgroundColor =="red") {
                    if(innerElement.style.backgroundColor == "green") {
                        innerElement.style.backgroundColor = "red"
                    }
                }
            })
        }
        if (element.style.backgroundColor == "green") {
            cell.forEach((innerElement) => {
                if (innerElement.style.backgroundColor =="green") {
                    if(innerElement.classList.contains('highlighted')) {
                        element.style.backgroundColor = "red";
                        
                        cell.forEach((innestElement) => {
                            if(innestElement.style.backgroundColor == "green") {
                                innestElement.style.backgroundColor = "red";
                            }
                        })
                    
                    }
                }
             
            })
        }
       
  
      })
  
    });
    cell.forEach((element) => {
      element.addEventListener("mouseout", () => {
        element.style.backgroundColor = "";
  
  
        cell.forEach((innerElement) => {
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 10)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 20)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 30)) {
            innerElement.style.backgroundColor = "";
          }
  
        })
  
      })
  
    });
  
  })
  
  cruiserBtn.addEventListener("click", () => {
    rotateBtn.disabled = false;
    cell.forEach((element) => {
      element.classList.remove('disabled')
  
      if (element.classList.contains('horizontal')) {
        element.classList.toggle('horizontal')
      }
    })
  
    carrierBtnClicked = false;
    battleshipBtnClicked = false;
    cruiserBtnClicked = true;
    submarineBtnClicked = false;
    destroyerBtnClicked = false;
  
    cell.forEach((element) => {
      element.addEventListener("mouseover", () => {
  
        if (element.classList[0] < 80 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
  
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "";
            }
  
          })
  
        } else if (element.classList[0] > 79 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "red";
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "";
            }
  
          })
  
        } else if (element.classList[0] < 98 && element.classList[0] > 89 && element.classList.contains('horizontal') ||
          element.classList[0] < 88 && element.classList[0] > 79 && element.classList.contains('horizontal') ||
          element.classList[0] < 78 && element.classList[0] > 69 && element.classList.contains('horizontal') ||
          element.classList[0] < 68 && element.classList[0] > 59 && element.classList.contains('horizontal') ||
          element.classList[0] < 58 && element.classList[0] > 49 && element.classList.contains('horizontal') ||
          element.classList[0] < 48 && element.classList[0] > 39 && element.classList.contains('horizontal') ||
          element.classList[0] < 38 && element.classList[0] > 29 && element.classList.contains('horizontal') ||
          element.classList[0] < 28 && element.classList[0] > 19 && element.classList.contains('horizontal') ||
          element.classList[0] < 18 && element.classList[0] > 9 && element.classList.contains('horizontal') ||
          element.classList[0] < 8 && element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
        } else {
          element.style.backgroundColor = "red";
        }

        if (element.classList.contains('highlighted')) {
            element.style.backgroundColor = "red";
            
            cell.forEach((innerElement) => {
                if (element.style.backgroundColor =="red") {
                    if(innerElement.style.backgroundColor == "green") {
                        innerElement.style.backgroundColor = "red"
                    }
                }
            })
        }
        if (element.style.backgroundColor == "green") {
            cell.forEach((innerElement) => {
                if (innerElement.style.backgroundColor =="green") {
                    if(innerElement.classList.contains('highlighted')) {
                        element.style.backgroundColor = "red";
                        
                        cell.forEach((innestElement) => {
                            if(innestElement.style.backgroundColor == "green") {
                                innestElement.style.backgroundColor = "red";
                            }
                        })
                    
                    }
                }
             
            })
        }
  
      })
  
    })
    cell.forEach((element) => {
      element.addEventListener("mouseout", () => {
        element.style.backgroundColor = "";
  
  
        cell.forEach((innerElement) => {
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 10)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 20)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 30)) {
            innerElement.style.backgroundColor = "";
          }
  
  
        })
  
      })
  
    })
  })
  
  submarineBtn.addEventListener("click", () => {
    rotateBtn.disabled = false;
    cell.forEach((element) => {
      element.classList.remove('disabled')
  
      if (element.classList.contains('horizontal')) {
        element.classList.toggle('horizontal')
      }
    })
  
    carrierBtnClicked = false;
    battleshipBtnClicked = false;
    cruiserBtnClicked = false;
    submarineBtnClicked = true;
    destroyerBtnClicked = false;
  
    cell.forEach((element) => {
      element.addEventListener("mouseover", () => {
  
        if (element.classList[0] < 80 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
  
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "green";
            }
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "";
            }
  
          })
  
        } else if (element.classList[0] > 79 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "red";
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "red";
            }
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]) + 20)) {
              innerElement.style.backgroundColor = "";
            }
  
          })
  
        } else if (element.classList[0] < 98 && element.classList[0] > 89 && element.classList.contains('horizontal') ||
          element.classList[0] < 88 && element.classList[0] > 79 && element.classList.contains('horizontal') ||
          element.classList[0] < 78 && element.classList[0] > 69 && element.classList.contains('horizontal') ||
          element.classList[0] < 68 && element.classList[0] > 59 && element.classList.contains('horizontal') ||
          element.classList[0] < 58 && element.classList[0] > 49 && element.classList.contains('horizontal') ||
          element.classList[0] < 48 && element.classList[0] > 39 && element.classList.contains('horizontal') ||
          element.classList[0] < 38 && element.classList[0] > 29 && element.classList.contains('horizontal') ||
          element.classList[0] < 28 && element.classList[0] > 19 && element.classList.contains('horizontal') ||
          element.classList[0] < 18 && element.classList[0] > 9 && element.classList.contains('horizontal') ||
          element.classList[0] < 8 && element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
        } else {
          element.style.backgroundColor = "red";
        }
  
        if (element.classList.contains('highlighted')) {
            element.style.backgroundColor = "red";
            
            cell.forEach((innerElement) => {
                if (element.style.backgroundColor =="red") {
                    if(innerElement.style.backgroundColor == "green") {
                        innerElement.style.backgroundColor = "red"
                    }
                }
            })
        }
        if (element.style.backgroundColor == "green") {
            cell.forEach((innerElement) => {
                if (innerElement.style.backgroundColor =="green") {
                    if(innerElement.classList.contains('highlighted')) {
                        element.style.backgroundColor = "red";
                        
                        cell.forEach((innestElement) => {
                            if(innestElement.style.backgroundColor == "green") {
                                innestElement.style.backgroundColor = "red";
                            }
                        })
                    
                    }
                }
             
            })
        }

      })
  
    })
    cell.forEach((element) => {
      element.addEventListener("mouseout", () => {
        element.style.backgroundColor = "";
  
  
        cell.forEach((innerElement) => {
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 10)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 20)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 30)) {
            innerElement.style.backgroundColor = "";
          }
  
  
        })
  
      })
  
    })
  })
  
  destroyerBtn.addEventListener("click", () => {
    rotateBtn.disabled = false;
    cell.forEach((element) => {
      element.classList.remove('disabled')
  
      if (element.classList.contains('horizontal')) {
        element.classList.toggle('horizontal')
      }
    })
  
    carrierBtnClicked = false;
    battleshipBtnClicked = false;
    cruiserBtnClicked = false;
    submarineBtnClicked = false;
    destroyerBtnClicked = true;
  
    cell.forEach((element) => {
      element.addEventListener("mouseover", () => {
  
        if (element.classList[0] < 90 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "green";
            }
          })
        } else if (element.classList[0] > 59 && !element.classList.contains('horizontal')) {
          element.style.backgroundColor = "red";
  
          cell.forEach((innerElement) => {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
            if (Number(innerElement.classList[0]) ==
              (Number(element.classList[0]) + 10)) {
              innerElement.style.backgroundColor = "red";
            }
  
          })
  
        } else if (element.classList[0] < 99 && element.classList[0] > 89 && element.classList.contains('horizontal') ||
          element.classList[0] < 89 && element.classList[0] > 79 && element.classList.contains('horizontal') ||
          element.classList[0] < 79 && element.classList[0] > 69 && element.classList.contains('horizontal') ||
          element.classList[0] < 69 && element.classList[0] > 59 && element.classList.contains('horizontal') ||
          element.classList[0] < 59 && element.classList[0] > 49 && element.classList.contains('horizontal') ||
          element.classList[0] < 49 && element.classList[0] > 39 && element.classList.contains('horizontal') ||
          element.classList[0] < 39 && element.classList[0] > 29 && element.classList.contains('horizontal') ||
          element.classList[0] < 29 && element.classList[0] > 19 && element.classList.contains('horizontal') ||
          element.classList[0] < 19 && element.classList[0] > 9 && element.classList.contains('horizontal') ||
          element.classList[0] < 9 && element.classList.contains('horizontal')) {
          element.style.backgroundColor = "green";
        } else {
          element.style.backgroundColor = "red";
        }

        if (element.classList.contains('highlighted')) {
            element.style.backgroundColor = "red";
            
            cell.forEach((innerElement) => {
                if (element.style.backgroundColor =="red") {
                    if(innerElement.style.backgroundColor == "green") {
                        innerElement.style.backgroundColor = "red"
                    }
                }
            })
        }
        if (element.style.backgroundColor == "green") {
            cell.forEach((innerElement) => {
                if (innerElement.style.backgroundColor =="green") {
                    if(innerElement.classList.contains('highlighted')) {
                        element.style.backgroundColor = "red";
                        
                        cell.forEach((innestElement) => {
                            if(innestElement.style.backgroundColor == "green") {
                                innestElement.style.backgroundColor = "red";
                            }
                        })
                    
                    }
                }
             
            })
        }
  
      })
  
    })
    cell.forEach((element) => {
      element.addEventListener("mouseout", () => {
        element.style.backgroundColor = "";
  
  
        cell.forEach((innerElement) => {
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 10)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 20)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 30)) {
            innerElement.style.backgroundColor = "";
          }
  
  
        })
  
      })
  
    })
  })
  
  rotateBtn.addEventListener("click", () => {
  
    cell.forEach((element) => {
      element.classList.toggle('horizontal');
  
      element.addEventListener("mouseover", () => {
  
        cell.forEach((innerElement) => {
  
          if (element.classList[2] === 'horizontal') {
            if (Number(innerElement.classList[0]) >
              (Number(element.classList[0]))) {
              innerElement.style.backgroundColor = "";
            }
  
            if (carrierBtnClicked == true) {
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 1)) {
                if (element.classList[0] < 96 && element.classList[0] > 89 ||
                  element.classList[0] < 86 && element.classList[0] > 79 ||
                  element.classList[0] < 76 && element.classList[0] > 69 ||
                  element.classList[0] < 66 && element.classList[0] > 59 ||
                  element.classList[0] < 56 && element.classList[0] > 49 ||
                  element.classList[0] < 46 && element.classList[0] > 39 ||
                  element.classList[0] < 36 && element.classList[0] > 29 ||
                  element.classList[0] < 26 && element.classList[0] > 19 ||
                  element.classList[0] < 16 && element.classList[0] > 9 ||
                  element.classList[0] < 6) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 2)) {
                if (element.classList[0] < 96 && element.classList[0] > 89 ||
                  element.classList[0] < 86 && element.classList[0] > 79 ||
                  element.classList[0] < 76 && element.classList[0] > 69 ||
                  element.classList[0] < 66 && element.classList[0] > 59 ||
                  element.classList[0] < 56 && element.classList[0] > 49 ||
                  element.classList[0] < 46 && element.classList[0] > 39 ||
                  element.classList[0] < 36 && element.classList[0] > 29 ||
                  element.classList[0] < 26 && element.classList[0] > 19 ||
                  element.classList[0] < 16 && element.classList[0] > 9 ||
                  element.classList[0] < 6) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 3)) {
                if (element.classList[0] < 96 && element.classList[0] > 89 ||
                  element.classList[0] < 86 && element.classList[0] > 79 ||
                  element.classList[0] < 76 && element.classList[0] > 69 ||
                  element.classList[0] < 66 && element.classList[0] > 59 ||
                  element.classList[0] < 56 && element.classList[0] > 49 ||
                  element.classList[0] < 46 && element.classList[0] > 39 ||
                  element.classList[0] < 36 && element.classList[0] > 29 ||
                  element.classList[0] < 26 && element.classList[0] > 19 ||
                  element.classList[0] < 16 && element.classList[0] > 9 ||
                  element.classList[0] < 6) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 4)) {
                if (element.classList[0] < 96 && element.classList[0] > 89 ||
                  element.classList[0] < 86 && element.classList[0] > 79 ||
                  element.classList[0] < 76 && element.classList[0] > 69 ||
                  element.classList[0] < 66 && element.classList[0] > 59 ||
                  element.classList[0] < 56 && element.classList[0] > 49 ||
                  element.classList[0] < 46 && element.classList[0] > 39 ||
                  element.classList[0] < 36 && element.classList[0] > 29 ||
                  element.classList[0] < 26 && element.classList[0] > 19 ||
                  element.classList[0] < 16 && element.classList[0] > 9 ||
                  element.classList[0] < 6) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
            } else if (battleshipBtnClicked == true) {
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 1)) {
                if (element.classList[0] < 97 && element.classList[0] > 89 ||
                  element.classList[0] < 87 && element.classList[0] > 79 ||
                  element.classList[0] < 77 && element.classList[0] > 69 ||
                  element.classList[0] < 67 && element.classList[0] > 59 ||
                  element.classList[0] < 57 && element.classList[0] > 49 ||
                  element.classList[0] < 47 && element.classList[0] > 39 ||
                  element.classList[0] < 37 && element.classList[0] > 29 ||
                  element.classList[0] < 27 && element.classList[0] > 19 ||
                  element.classList[0] < 17 && element.classList[0] > 9 ||
                  element.classList[0] < 7) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 2)) {
                if (element.classList[0] < 97 && element.classList[0] > 89 ||
                  element.classList[0] < 87 && element.classList[0] > 79 ||
                  element.classList[0] < 77 && element.classList[0] > 69 ||
                  element.classList[0] < 67 && element.classList[0] > 59 ||
                  element.classList[0] < 57 && element.classList[0] > 49 ||
                  element.classList[0] < 47 && element.classList[0] > 39 ||
                  element.classList[0] < 37 && element.classList[0] > 29 ||
                  element.classList[0] < 27 && element.classList[0] > 19 ||
                  element.classList[0] < 17 && element.classList[0] > 9 ||
                  element.classList[0] < 7) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 3)) {
                if (element.classList[0] < 97 && element.classList[0] > 89 ||
                  element.classList[0] < 87 && element.classList[0] > 79 ||
                  element.classList[0] < 77 && element.classList[0] > 69 ||
                  element.classList[0] < 67 && element.classList[0] > 59 ||
                  element.classList[0] < 57 && element.classList[0] > 49 ||
                  element.classList[0] < 47 && element.classList[0] > 39 ||
                  element.classList[0] < 37 && element.classList[0] > 29 ||
                  element.classList[0] < 27 && element.classList[0] > 19 ||
                  element.classList[0] < 17 && element.classList[0] > 9 ||
                  element.classList[0] < 7) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
  
            } else if (cruiserBtnClicked == true || submarineBtnClicked == true) {
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 1)) {
                if (element.classList[0] < 98 && element.classList[0] > 89 ||
                  element.classList[0] < 88 && element.classList[0] > 79 ||
                  element.classList[0] < 78 && element.classList[0] > 69 ||
                  element.classList[0] < 68 && element.classList[0] > 59 ||
                  element.classList[0] < 58 && element.classList[0] > 49 ||
                  element.classList[0] < 48 && element.classList[0] > 39 ||
                  element.classList[0] < 38 && element.classList[0] > 29 ||
                  element.classList[0] < 28 && element.classList[0] > 19 ||
                  element.classList[0] < 18 && element.classList[0] > 9 ||
                  element.classList[0] < 8) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 2)) {
                if (element.classList[0] < 98 && element.classList[0] > 89 ||
                  element.classList[0] < 88 && element.classList[0] > 79 ||
                  element.classList[0] < 78 && element.classList[0] > 69 ||
                  element.classList[0] < 68 && element.classList[0] > 59 ||
                  element.classList[0] < 58 && element.classList[0] > 49 ||
                  element.classList[0] < 48 && element.classList[0] > 39 ||
                  element.classList[0] < 38 && element.classList[0] > 29 ||
                  element.classList[0] < 28 && element.classList[0] > 19 ||
                  element.classList[0] < 18 && element.classList[0] > 9 ||
                  element.classList[0] < 8) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
            } else if (destroyerBtnClicked == true) {
              if (Number(innerElement.classList[0]) ==
                (Number(element.classList[0]) + 1)) {
                if (element.classList[0] < 99 && element.classList[0] > 89 ||
                  element.classList[0] < 89 && element.classList[0] > 79 ||
                  element.classList[0] < 79 && element.classList[0] > 69 ||
                  element.classList[0] < 69 && element.classList[0] > 59 ||
                  element.classList[0] < 59 && element.classList[0] > 49 ||
                  element.classList[0] < 49 && element.classList[0] > 39 ||
                  element.classList[0] < 39 && element.classList[0] > 29 ||
                  element.classList[0] < 29 && element.classList[0] > 19 ||
                  element.classList[0] < 19 && element.classList[0] > 9 ||
                  element.classList[0] < 9) {
                  innerElement.style.backgroundColor = "green";
                } else {
                  innerElement.style.backgroundColor = "red";
                }
              }
            }
          }
        })

        if (element.classList.contains('highlighted')) {
            element.style.backgroundColor = "red";
            
            cell.forEach((innerElement) => {
                if (element.style.backgroundColor =="red") {
                    if(innerElement.style.backgroundColor == "green") {
                        innerElement.style.backgroundColor = "red"
                    }
                }
            })
        }
        if (element.style.backgroundColor == "green") {
            cell.forEach((innerElement) => {
                if (innerElement.style.backgroundColor =="green") {
                    if(innerElement.classList.contains('highlighted')) {
                        element.style.backgroundColor = "red";
                        
                        cell.forEach((innestElement) => {
                            if(innestElement.style.backgroundColor == "green") {
                                innestElement.style.backgroundColor = "red";
                            }
                        })
                    
                    }
                }
             
            })
        }

      })
    })
    cell.forEach((element) => {
      element.addEventListener("mouseout", () => {
        cell.forEach((innerElement) => {
          if (Number(innerElement.classList[0]) >
            (Number(element.classList[0]))) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 1)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 2)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 3)) {
            innerElement.style.backgroundColor = "";
          }
          if (Number(innerElement.classList[0]) ==
            (Number(element.classList[0]) + 4)) {
            innerElement.style.backgroundColor = "";
          }
        })
      })
    })
  
  
  })
  
  resetBtn.addEventListener("click", () => {
    cell.forEach((element) => {
      element.classList.remove('disabled')
      if (element.classList.contains("highlighted")) {
        element.classList.remove("highlighted")
      }
    })
    carrierBtn.disabled = false;
    battleshipBtn.disabled = false;
    cruiserBtn.disabled = false;
    submarineBtn.disabled = false;
    destroyerBtn.disabled = false;
    resetBtn.disabled = true;
    arr = [];
    console.log(arr.length)
  
  })
  
  cell.forEach((element) => {
    element.addEventListener("click", () => {
      cell.forEach((innerElement) => {
        if (innerElement.style.backgroundColor == "green") {
          innerElement.classList.toggle('highlighted');
          if (carrierBtnClicked == true) {
            carrierBtn.disabled = true;
            resetBtn.disabled = false;
            rotateBtn.disabled = true;
            cell.forEach((innestElement) => {
              innestElement.classList.add('disabled')
            })
          }
          if (battleshipBtnClicked == true) {
            battleshipBtn.disabled = true;
            resetBtn.disabled = false;
            rotateBtn.disabled = true;
            cell.forEach((innestElement) => {
              innestElement.classList.add('disabled')
            })
          }
          if (cruiserBtnClicked == true) {
            cruiserBtn.disabled = true;
            resetBtn.disabled = false;
            rotateBtn.disabled = true;
            cell.forEach((innestElement) => {
              innestElement.classList.add('disabled')
            })
          }
          if (submarineBtnClicked == true) {
            submarineBtn.disabled = true;
            resetBtn.disabled = false;
            rotateBtn.disabled = true;
            cell.forEach((innestElement) => {
              innestElement.classList.add('disabled')
            })
          }
          if (destroyerBtnClicked == true) {
            destroyerBtn.disabled = true;
            resetBtn.disabled = false;
            rotateBtn.disabled = true;
            cell.forEach((innestElement) => {
              innestElement.classList.add('disabled')
            })
          }
        }
      })
  
    })
  })
  
  document.body.addEventListener("click", () => {
    cell.forEach((element) => {
      if (element.classList.contains('highlighted')) {
        if (!arr.includes(element.classList[0]))
          arr.push(element.classList[0])
      }
    })
    if (arr.length == 17) {
      continueBtn.disabled = false;
    } else {
      continueBtn.disabled = true;
    }
  })
  
  continueBtn.addEventListener("click", () => {
    //create the code for appending a new gameboard to the right of it
    console.log('it works')
  })
  
  
  //addd the code to make it so that you cannot place ships on top of ships 
  //when continue is clicked append the computers gameboard and start the game
  
  