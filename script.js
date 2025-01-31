//original script

const content = document.getElementById("content");
const grid = document.querySelector(".container");

const carrierBtn = document.getElementById("carrierBtn");
const battleshipBtn = document.getElementById("battleshipBtn");
const cruiserBtn = document.getElementById("cruiserBtn");
const submarineBtn = document.getElementById("submarineBtn");
const destroyerBtn = document.getElementById("destroyerBtn");
const rotateBtn = document.getElementById("rotateBtn");
const resetBtn = document.getElementById("resetBtn");
const continueBtn = document.getElementById("continueBtn");
const message = document.getElementById("message");
//set the reset,rotate, and continue button to disabled by default
resetBtn.disabled = true;
rotateBtn.disabled = true;
continueBtn.disabled = true;


// function that makes the players grid 
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

// function that makes the computers grid
const makeCompGrid = () => {
  const compArea = document.createElement("div");
  compArea.id = "compArea";
  const compGrid = document.createElement("div");
  const compMessage = document.createElement("p");
  compMessage.id = "compMessage";
  compGrid.id = "compGB";
  compArea.appendChild(compMessage);
  compArea.appendChild(compGrid);
  content.appendChild(compArea);

  let count = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const compCell = document.createElement("div");
      compCell.classList.add(count++);
      compCell.classList.add("compCell");
      compGrid.appendChild(compCell);
    }
  }

  compSelection();
};

makeGrid();

const cell = document.querySelectorAll(".cell");
const playerGB = document.getElementById("gameboard");
//create a variable to detect when each button is clicked
let carrierBtnClicked = false;
let battleshipBtnClicked = false;
let cruiserBtnClicked = false;
let submarineBtnClicked = false;
let destroyerBtnClicked = false;
let continueBtnClicked = false;
//created empty arrays to store the computer's guesses
var arr = [];
var compMoveMissArr = [];
var compMoveHitArr = [];
var compChoiceArr = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
  98, 99,
];
//created empty arrays to store the computer's ship placements
let carrierArr = [];
let battleshipArr = [];
let cruiserArr = [];
let submarineArr = [];
let destroyerArr = [];
//created an array that contains all spots the computer can place a ship
let compsChoicesArr = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
  98, 99,
];
//created a coin toss array
let coinTossArr = [0, 1];

const text = document.createElement("p");
text.textContent = "Place your ships:";
message.appendChild(text);

//when a specific button is clicked it runs the appropriate function
carrierBtn.addEventListener("click", () => {
  //allows the rotate button to become clickable
  rotateBtn.disabled = false;
  cell.forEach((element) => {
    //if each cell contains the disabled class it will now remove it
    element.classList.remove("disabled");
      //if any cell contains the horizontal class it will toggle and activate it
    if (element.classList.contains("horizontal")) {
      element.classList.toggle("horizontal");
    }
  });
  //the button gets updated to being clicked
  carrierBtnClicked = true;
  battleshipBtnClicked = false;
  cruiserBtnClicked = false;
  submarineBtnClicked = false;
  destroyerBtnClicked = false;

  //mouseover function to display the correct amount of green squares
  //in this case it would be 5
  cell.forEach((element) => {
    element.addEventListener("mouseover", () => {
      if (
        element.classList[0] < 60 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "green";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 30
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 40
          ) {
            innerElement.style.backgroundColor = "green";
          }
        }); //if the element is not completely on the gameboard it will appear red and unclickable
      } else if (
        element.classList[0] > 59 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 30
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 40
          ) {
            innerElement.style.backgroundColor = "red";
          }
        }); //similar idea for if the horizontal class is active
      } else if (
        (element.classList[0] < 96 &&
          element.classList[0] > 89 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 86 &&
          element.classList[0] > 79 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 76 &&
          element.classList[0] > 69 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 66 &&
          element.classList[0] > 59 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 56 &&
          element.classList[0] > 49 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 46 &&
          element.classList[0] > 39 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 36 &&
          element.classList[0] > 29 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 26 &&
          element.classList[0] > 19 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 16 &&
          element.classList[0] > 9 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 6 && element.classList.contains("horizontal"))
      ) {
        element.style.backgroundColor = "green";
      } else {
        element.style.backgroundColor = "red";
      }
        // similar idea if you try to place a ship on an already placed ship
      if (element.classList.contains("highlighted")) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (element.style.backgroundColor == "red") {
            if (innerElement.style.backgroundColor == "green") {
              innerElement.style.backgroundColor = "red";
            }
          }
        });
      }
      if (element.style.backgroundColor == "green") {
        cell.forEach((innerElement) => {
          if (innerElement.style.backgroundColor == "green") {
            if (innerElement.classList.contains("highlighted")) {
              element.style.backgroundColor = "red";

              cell.forEach((innestElement) => {
                if (innestElement.style.backgroundColor == "green") {
                  innestElement.style.backgroundColor = "red";
                }
              });
            }
          }
        });
      }
    });
  });
  //mouseout function to remove the mouseover styling
  cell.forEach((element) => {
    element.addEventListener("mouseout", () => {
      element.style.backgroundColor = "";

      cell.forEach((innerElement) => {
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 10
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 20
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 30
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 40
        ) {
          innerElement.style.backgroundColor = "";
        }
      });
    });
  });
});

battleshipBtn.addEventListener("click", () => {
  rotateBtn.disabled = false;
  cell.forEach((element) => {
    element.classList.remove("disabled");

    if (element.classList.contains("horizontal")) {
      element.classList.toggle("horizontal");
    }
  });

  carrierBtnClicked = false;
  battleshipBtnClicked = true;
  cruiserBtnClicked = false;
  submarineBtnClicked = false;
  destroyerBtnClicked = false;

  cell.forEach((element) => {
    element.addEventListener("mouseover", () => {
      if (
        element.classList[0] < 70 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "green";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 30
          ) {
            innerElement.style.backgroundColor = "green";
          }
        });
      } else if (
        element.classList[0] > 69 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 30
          ) {
            innerElement.style.backgroundColor = "red";
          }
        });
      } else if (
        (element.classList[0] < 97 &&
          element.classList[0] > 89 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 87 &&
          element.classList[0] > 79 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 77 &&
          element.classList[0] > 69 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 67 &&
          element.classList[0] > 59 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 57 &&
          element.classList[0] > 49 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 47 &&
          element.classList[0] > 39 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 37 &&
          element.classList[0] > 29 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 27 &&
          element.classList[0] > 19 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 17 &&
          element.classList[0] > 9 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 7 && element.classList.contains("horizontal"))
      ) {
        element.style.backgroundColor = "green";
      } else {
        element.style.backgroundColor = "red";
      }

      if (
        element.style.backgroundColor == "green" ||
        element.style.backgroundColor == "red"
      ) {
        cell.forEach((innerElement) => {
          if (innerElement.style.backgroundColor == "green") {
            if (
              innerElement.classList.contains("highlighted") ||
              element.classList.contains("highlighted")
            ) {
              element.style.backgroundColor = "red";
              cell.forEach((innestElement) => {
                if (innestElement.style.backgroundColor == "green") {
                  innestElement.style.backgroundColor = "red";
                }
              });
            }
          }
        });
      }
    });
  });
  cell.forEach((element) => {
    element.addEventListener("mouseout", () => {
      element.style.backgroundColor = "";

      cell.forEach((innerElement) => {
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 10
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 20
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 30
        ) {
          innerElement.style.backgroundColor = "";
        }
      });
    });
  });
});

cruiserBtn.addEventListener("click", () => {
  rotateBtn.disabled = false;
  cell.forEach((element) => {
    element.classList.remove("disabled");

    if (element.classList.contains("horizontal")) {
      element.classList.toggle("horizontal");
    }
  });

  carrierBtnClicked = false;
  battleshipBtnClicked = false;
  cruiserBtnClicked = true;
  submarineBtnClicked = false;
  destroyerBtnClicked = false;

  cell.forEach((element) => {
    element.addEventListener("mouseover", () => {
      if (
        element.classList[0] < 80 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "green";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) >
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "";
          }
        });
      } else if (
        element.classList[0] > 79 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) >
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "";
          }
        });
      } else if (
        (element.classList[0] < 98 &&
          element.classList[0] > 89 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 88 &&
          element.classList[0] > 79 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 78 &&
          element.classList[0] > 69 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 68 &&
          element.classList[0] > 59 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 58 &&
          element.classList[0] > 49 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 48 &&
          element.classList[0] > 39 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 38 &&
          element.classList[0] > 29 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 28 &&
          element.classList[0] > 19 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 18 &&
          element.classList[0] > 9 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 8 && element.classList.contains("horizontal"))
      ) {
        element.style.backgroundColor = "green";
      } else {
        element.style.backgroundColor = "red";
      }

      if (element.classList.contains("highlighted")) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (element.style.backgroundColor == "red") {
            if (innerElement.style.backgroundColor == "green") {
              innerElement.style.backgroundColor = "red";
            }
          }
        });
      }
      if (element.style.backgroundColor == "green") {
        cell.forEach((innerElement) => {
          if (innerElement.style.backgroundColor == "green") {
            if (innerElement.classList.contains("highlighted")) {
              element.style.backgroundColor = "red";

              cell.forEach((innestElement) => {
                if (innestElement.style.backgroundColor == "green") {
                  innestElement.style.backgroundColor = "red";
                }
              });
            }
          }
        });
      }
    });
  });
  cell.forEach((element) => {
    element.addEventListener("mouseout", () => {
      element.style.backgroundColor = "";

      cell.forEach((innerElement) => {
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 10
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 20
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 30
        ) {
          innerElement.style.backgroundColor = "";
        }
      });
    });
  });
});

submarineBtn.addEventListener("click", () => {
  rotateBtn.disabled = false;
  cell.forEach((element) => {
    element.classList.remove("disabled");

    if (element.classList.contains("horizontal")) {
      element.classList.toggle("horizontal");
    }
  });

  carrierBtnClicked = false;
  battleshipBtnClicked = false;
  cruiserBtnClicked = false;
  submarineBtnClicked = true;
  destroyerBtnClicked = false;

  cell.forEach((element) => {
    element.addEventListener("mouseover", () => {
      if (
        element.classList[0] < 80 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "green";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "green";
          }
          if (
            Number(innerElement.classList[0]) >
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "";
          }
        });
      } else if (
        element.classList[0] > 79 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "red";
          }
          if (
            Number(innerElement.classList[0]) >
            Number(element.classList[0]) + 20
          ) {
            innerElement.style.backgroundColor = "";
          }
        });
      } else if (
        (element.classList[0] < 98 &&
          element.classList[0] > 89 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 88 &&
          element.classList[0] > 79 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 78 &&
          element.classList[0] > 69 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 68 &&
          element.classList[0] > 59 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 58 &&
          element.classList[0] > 49 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 48 &&
          element.classList[0] > 39 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 38 &&
          element.classList[0] > 29 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 28 &&
          element.classList[0] > 19 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 18 &&
          element.classList[0] > 9 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 8 && element.classList.contains("horizontal"))
      ) {
        element.style.backgroundColor = "green";
      } else {
        element.style.backgroundColor = "red";
      }

      if (element.classList.contains("highlighted")) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (element.style.backgroundColor == "red") {
            if (innerElement.style.backgroundColor == "green") {
              innerElement.style.backgroundColor = "red";
            }
          }
        });
      }
      if (element.style.backgroundColor == "green") {
        cell.forEach((innerElement) => {
          if (innerElement.style.backgroundColor == "green") {
            if (innerElement.classList.contains("highlighted")) {
              element.style.backgroundColor = "red";

              cell.forEach((innestElement) => {
                if (innestElement.style.backgroundColor == "green") {
                  innestElement.style.backgroundColor = "red";
                }
              });
            }
          }
        });
      }
    });
  });
  cell.forEach((element) => {
    element.addEventListener("mouseout", () => {
      element.style.backgroundColor = "";

      cell.forEach((innerElement) => {
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 10
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 20
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 30
        ) {
          innerElement.style.backgroundColor = "";
        }
      });
    });
  });
});

destroyerBtn.addEventListener("click", () => {
  rotateBtn.disabled = false;
  cell.forEach((element) => {
    element.classList.remove("disabled");

    if (element.classList.contains("horizontal")) {
      element.classList.toggle("horizontal");
    }
  });

  carrierBtnClicked = false;
  battleshipBtnClicked = false;
  cruiserBtnClicked = false;
  submarineBtnClicked = false;
  destroyerBtnClicked = true;

  cell.forEach((element) => {
    element.addEventListener("mouseover", () => {
      if (
        element.classList[0] < 90 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "green";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "green";
          }
        });
      } else if (
        element.classList[0] > 59 &&
        !element.classList.contains("horizontal")
      ) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
          if (
            Number(innerElement.classList[0]) ==
            Number(element.classList[0]) + 10
          ) {
            innerElement.style.backgroundColor = "red";
          }
        });
      } else if (
        (element.classList[0] < 99 &&
          element.classList[0] > 89 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 89 &&
          element.classList[0] > 79 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 79 &&
          element.classList[0] > 69 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 69 &&
          element.classList[0] > 59 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 59 &&
          element.classList[0] > 49 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 49 &&
          element.classList[0] > 39 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 39 &&
          element.classList[0] > 29 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 29 &&
          element.classList[0] > 19 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 19 &&
          element.classList[0] > 9 &&
          element.classList.contains("horizontal")) ||
        (element.classList[0] < 9 && element.classList.contains("horizontal"))
      ) {
        element.style.backgroundColor = "green";
      } else {
        element.style.backgroundColor = "red";
      }

      if (element.classList.contains("highlighted")) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (element.style.backgroundColor == "red") {
            if (innerElement.style.backgroundColor == "green") {
              innerElement.style.backgroundColor = "red";
            }
          }
        });
      }
      if (element.style.backgroundColor == "green") {
        cell.forEach((innerElement) => {
          if (innerElement.style.backgroundColor == "green") {
            if (innerElement.classList.contains("highlighted")) {
              element.style.backgroundColor = "red";

              cell.forEach((innestElement) => {
                if (innestElement.style.backgroundColor == "green") {
                  innestElement.style.backgroundColor = "red";
                }
              });
            }
          }
        });
      }
    });
  });
  cell.forEach((element) => {
    element.addEventListener("mouseout", () => {
      element.style.backgroundColor = "";

      cell.forEach((innerElement) => {
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 10
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 20
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 30
        ) {
          innerElement.style.backgroundColor = "";
        }
      });
    });
  });
});

//this button allows for the ships position to be rotate upon a click
rotateBtn.addEventListener("click", () => {
  //this works by toggling a horizontal class
  cell.forEach((element) => {
    element.classList.toggle("horizontal");

    element.addEventListener("mouseover", () => {
      //on mouseover if the cell contains horizontal...
      cell.forEach((innerElement) => {
        if (element.classList[2] === "horizontal") {
          //it will first erase the vertical styling
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }
            //it will check which button click is set to true and display the appropriate 
            //horizontal styling
          if (carrierBtnClicked == true) {
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 1
            ) {
              //if the ship is not completely on the board it will become red and unplaceable
              if (
                (element.classList[0] < 96 && element.classList[0] > 89) ||
                (element.classList[0] < 86 && element.classList[0] > 79) ||
                (element.classList[0] < 76 && element.classList[0] > 69) ||
                (element.classList[0] < 66 && element.classList[0] > 59) ||
                (element.classList[0] < 56 && element.classList[0] > 49) ||
                (element.classList[0] < 46 && element.classList[0] > 39) ||
                (element.classList[0] < 36 && element.classList[0] > 29) ||
                (element.classList[0] < 26 && element.classList[0] > 19) ||
                (element.classList[0] < 16 && element.classList[0] > 9) ||
                element.classList[0] < 6
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 2
            ) {
              if (
                (element.classList[0] < 96 && element.classList[0] > 89) ||
                (element.classList[0] < 86 && element.classList[0] > 79) ||
                (element.classList[0] < 76 && element.classList[0] > 69) ||
                (element.classList[0] < 66 && element.classList[0] > 59) ||
                (element.classList[0] < 56 && element.classList[0] > 49) ||
                (element.classList[0] < 46 && element.classList[0] > 39) ||
                (element.classList[0] < 36 && element.classList[0] > 29) ||
                (element.classList[0] < 26 && element.classList[0] > 19) ||
                (element.classList[0] < 16 && element.classList[0] > 9) ||
                element.classList[0] < 6
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 3
            ) {
              if (
                (element.classList[0] < 96 && element.classList[0] > 89) ||
                (element.classList[0] < 86 && element.classList[0] > 79) ||
                (element.classList[0] < 76 && element.classList[0] > 69) ||
                (element.classList[0] < 66 && element.classList[0] > 59) ||
                (element.classList[0] < 56 && element.classList[0] > 49) ||
                (element.classList[0] < 46 && element.classList[0] > 39) ||
                (element.classList[0] < 36 && element.classList[0] > 29) ||
                (element.classList[0] < 26 && element.classList[0] > 19) ||
                (element.classList[0] < 16 && element.classList[0] > 9) ||
                element.classList[0] < 6
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 4
            ) {
              if (
                (element.classList[0] < 96 && element.classList[0] > 89) ||
                (element.classList[0] < 86 && element.classList[0] > 79) ||
                (element.classList[0] < 76 && element.classList[0] > 69) ||
                (element.classList[0] < 66 && element.classList[0] > 59) ||
                (element.classList[0] < 56 && element.classList[0] > 49) ||
                (element.classList[0] < 46 && element.classList[0] > 39) ||
                (element.classList[0] < 36 && element.classList[0] > 29) ||
                (element.classList[0] < 26 && element.classList[0] > 19) ||
                (element.classList[0] < 16 && element.classList[0] > 9) ||
                element.classList[0] < 6
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            } //similar idea for the rest of the ships
          } else if (battleshipBtnClicked == true) {
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 1
            ) {
              if (
                (element.classList[0] < 97 && element.classList[0] > 89) ||
                (element.classList[0] < 87 && element.classList[0] > 79) ||
                (element.classList[0] < 77 && element.classList[0] > 69) ||
                (element.classList[0] < 67 && element.classList[0] > 59) ||
                (element.classList[0] < 57 && element.classList[0] > 49) ||
                (element.classList[0] < 47 && element.classList[0] > 39) ||
                (element.classList[0] < 37 && element.classList[0] > 29) ||
                (element.classList[0] < 27 && element.classList[0] > 19) ||
                (element.classList[0] < 17 && element.classList[0] > 9) ||
                element.classList[0] < 7
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 2
            ) {
              if (
                (element.classList[0] < 97 && element.classList[0] > 89) ||
                (element.classList[0] < 87 && element.classList[0] > 79) ||
                (element.classList[0] < 77 && element.classList[0] > 69) ||
                (element.classList[0] < 67 && element.classList[0] > 59) ||
                (element.classList[0] < 57 && element.classList[0] > 49) ||
                (element.classList[0] < 47 && element.classList[0] > 39) ||
                (element.classList[0] < 37 && element.classList[0] > 29) ||
                (element.classList[0] < 27 && element.classList[0] > 19) ||
                (element.classList[0] < 17 && element.classList[0] > 9) ||
                element.classList[0] < 7
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 3
            ) {
              if (
                (element.classList[0] < 97 && element.classList[0] > 89) ||
                (element.classList[0] < 87 && element.classList[0] > 79) ||
                (element.classList[0] < 77 && element.classList[0] > 69) ||
                (element.classList[0] < 67 && element.classList[0] > 59) ||
                (element.classList[0] < 57 && element.classList[0] > 49) ||
                (element.classList[0] < 47 && element.classList[0] > 39) ||
                (element.classList[0] < 37 && element.classList[0] > 29) ||
                (element.classList[0] < 27 && element.classList[0] > 19) ||
                (element.classList[0] < 17 && element.classList[0] > 9) ||
                element.classList[0] < 7
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
          } else if (cruiserBtnClicked == true || submarineBtnClicked == true) {
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 1
            ) {
              if (
                (element.classList[0] < 98 && element.classList[0] > 89) ||
                (element.classList[0] < 88 && element.classList[0] > 79) ||
                (element.classList[0] < 78 && element.classList[0] > 69) ||
                (element.classList[0] < 68 && element.classList[0] > 59) ||
                (element.classList[0] < 58 && element.classList[0] > 49) ||
                (element.classList[0] < 48 && element.classList[0] > 39) ||
                (element.classList[0] < 38 && element.classList[0] > 29) ||
                (element.classList[0] < 28 && element.classList[0] > 19) ||
                (element.classList[0] < 18 && element.classList[0] > 9) ||
                element.classList[0] < 8
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 2
            ) {
              if (
                (element.classList[0] < 98 && element.classList[0] > 89) ||
                (element.classList[0] < 88 && element.classList[0] > 79) ||
                (element.classList[0] < 78 && element.classList[0] > 69) ||
                (element.classList[0] < 68 && element.classList[0] > 59) ||
                (element.classList[0] < 58 && element.classList[0] > 49) ||
                (element.classList[0] < 48 && element.classList[0] > 39) ||
                (element.classList[0] < 38 && element.classList[0] > 29) ||
                (element.classList[0] < 28 && element.classList[0] > 19) ||
                (element.classList[0] < 18 && element.classList[0] > 9) ||
                element.classList[0] < 8
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
          } else if (destroyerBtnClicked == true) {
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 1
            ) {
              if (
                (element.classList[0] < 99 && element.classList[0] > 89) ||
                (element.classList[0] < 89 && element.classList[0] > 79) ||
                (element.classList[0] < 79 && element.classList[0] > 69) ||
                (element.classList[0] < 69 && element.classList[0] > 59) ||
                (element.classList[0] < 59 && element.classList[0] > 49) ||
                (element.classList[0] < 49 && element.classList[0] > 39) ||
                (element.classList[0] < 39 && element.classList[0] > 29) ||
                (element.classList[0] < 29 && element.classList[0] > 19) ||
                (element.classList[0] < 19 && element.classList[0] > 9) ||
                element.classList[0] < 9
              ) {
                innerElement.style.backgroundColor = "green";
              } else {
                innerElement.style.backgroundColor = "red";
              }
            }
          }
        }
      });

      if (element.classList.contains("highlighted")) {
        element.style.backgroundColor = "red";

        cell.forEach((innerElement) => {
          if (element.style.backgroundColor == "red") {
            if (innerElement.style.backgroundColor == "green") {
              innerElement.style.backgroundColor = "red";
            }
          }
        });
      }
      if (element.style.backgroundColor == "green") {
        cell.forEach((innerElement) => {
          if (innerElement.style.backgroundColor == "green") {
            if (innerElement.classList.contains("highlighted")) {
              element.style.backgroundColor = "red";

              cell.forEach((innestElement) => {
                if (innestElement.style.backgroundColor == "green") {
                  innestElement.style.backgroundColor = "red";
                }
              });
            }
          }
        });
      }
    });
  });
  cell.forEach((element) => {
    element.addEventListener("mouseout", () => {
      cell.forEach((innerElement) => {
        if (Number(innerElement.classList[0]) > Number(element.classList[0])) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 1
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 2
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 3
        ) {
          innerElement.style.backgroundColor = "";
        }
        if (
          Number(innerElement.classList[0]) ==
          Number(element.classList[0]) + 4
        ) {
          innerElement.style.backgroundColor = "";
        }
      });
    });
  });
});

//the reset button clears the users gameboard allowing them to replace their ships
resetBtn.addEventListener("click", () => {
  cell.forEach((element) => {
    element.classList.remove("disabled");
    if (element.classList.contains("highlighted")) {
      element.classList.remove("highlighted");
    }
  });
  //sets everything back to the default
  carrierBtn.disabled = false;
  battleshipBtn.disabled = false;
  cruiserBtn.disabled = false;
  submarineBtn.disabled = false;
  destroyerBtn.disabled = false;
  continueBtnClicked = false;
  resetBtn.disabled = true;
  arr = [];
});

cell.forEach((element) => {
  //when any cell on the users gameboard is clicked it...
  element.addEventListener("click", () => {
    cell.forEach((innerElement) => {
      //first toggles the highlighed class which visually shows the position of the ship
      //only if the hover color is green (not red)
      if (innerElement.style.backgroundColor == "green") {
        innerElement.classList.toggle("highlighted");
        //updates the click and disable status
        if (carrierBtnClicked == true) {
          carrierBtn.disabled = true;
          resetBtn.disabled = false;
          rotateBtn.disabled = true;
          cell.forEach((innestElement) => {
            innestElement.classList.add("disabled");
          }); //makes the gameboard disabled so the user cannot play the same ship twice
        } //similar idea for the rest of the ships
        if (battleshipBtnClicked == true) {
          battleshipBtn.disabled = true;
          resetBtn.disabled = false;
          rotateBtn.disabled = true;
          cell.forEach((innestElement) => {
            innestElement.classList.add("disabled");
          });
        }
        if (cruiserBtnClicked == true) {
          cruiserBtn.disabled = true;
          resetBtn.disabled = false;
          rotateBtn.disabled = true;
          cell.forEach((innestElement) => {
            innestElement.classList.add("disabled");
          });
        }
        if (submarineBtnClicked == true) {
          submarineBtn.disabled = true;
          resetBtn.disabled = false;
          rotateBtn.disabled = true;
          cell.forEach((innestElement) => {
            innestElement.classList.add("disabled");
          });
        }
        if (destroyerBtnClicked == true) {
          destroyerBtn.disabled = true;
          resetBtn.disabled = false;
          rotateBtn.disabled = true;
          cell.forEach((innestElement) => {
            innestElement.classList.add("disabled");
          });
        }
      }
    });
  });
});

//whenever the player's gameboard is clicked this function will run
playerGB.addEventListener("click", () => {
  cell.forEach((element) => {
    //all elements that contain the class 'highlighted' that is not already in
    //the designated array will get pushed
    if (element.classList.contains("highlighted")) {
      if (!arr.includes(element.classList[0])) arr.push(element.classList[0]);
    }
  });
  //once the array length reaches 17 it will enable the continue button to start the game
  if (arr.length == 17) {
    continueBtn.disabled = false;
  } else {
    continueBtn.disabled = true;
  }
  //once the continue button is clicked it will then become disabled until the game is over
  if (continueBtnClicked == true) {
    continueBtn.disabled = true;
  }
});

//when clicked it appends the computers gameboard and the game can start
continueBtn.addEventListener("click", () => {
  //disables the continue button and the reset button
  continueBtnClicked = true;
  resetBtn.disabled = true;

  text.textContent = "Choose your Target!";
  text.style.color = "red";

  makeCompGrid();
});

//functions for determining the computers ship selection and where the computer
//will attack on the users gameboard
const compSelection = () => {
  for (let i = 0; i < 5; i++) {
    var coinToss = Math.floor(Math.random() * 2);
    let result = coinTossArr[coinToss];

    if (i == 0) {
      var carrierSelect = Math.floor(Math.random() * 59);
      carrierArr.push(carrierSelect);
      delete compsChoicesArr[carrierSelect];

      for (let i = 0; i < 4; i++) {
        if (result == 0) {
          let carrierNext = (carrierSelect += 10);
          carrierArr.push(carrierNext);
          delete compsChoicesArr[carrierNext];
        } else {
          let carrierNext = (carrierSelect += 1);
          carrierArr.push(carrierNext);
          delete compsChoicesArr[carrierNext];
        }
      }
    } else if (i == 1) {
      var battleshipSelect = Math.floor(Math.random() * 69);
      while (!compsChoicesArr.includes(battleshipSelect)) {
        battleshipSelect = Math.floor(Math.random() * 69);
      }
      battleshipArr.push(battleshipSelect);
      delete compsChoicesArr[battleshipSelect];
      for (let i = 0; i < 3; i++) {
        if (result == 0) {
          let battleshipNext = (battleshipSelect += 10);
          battleshipArr.push(battleshipNext);
          delete compsChoicesArr[battleshipNext];
        } else {
          let battleshipNext = (battleshipSelect += 1);
          battleshipArr.push(battleshipNext);
          delete compsChoicesArr[battleshipNext];
        }
      }
    } else if (i == 2) {
      var cruiserSelect = Math.floor(Math.random() * 79);
      while (!compsChoicesArr.includes(cruiserSelect)) {
        cruiserSelect = Math.floor(Math.random() * 79);
      }
      cruiserArr.push(cruiserSelect);
      delete compsChoicesArr[cruiserSelect];
      for (let i = 0; i < 2; i++) {
        if (result == 0) {
          let cruiserNext = (cruiserSelect += 10);
          cruiserArr.push(cruiserNext);
          delete compsChoicesArr[cruiserNext];
        } else {
          let cruiserNext = (cruiserSelect += 1);
          cruiserArr.push(cruiserNext);
          delete compsChoicesArr[cruiserNext];
        }
      }
    } else if (i == 3) {
      var submarineSelect = Math.floor(Math.random() * 79);
      while (!compsChoicesArr.includes(submarineSelect)) {
        submarineSelect = Math.floor(Math.random() * 79);
      }
      submarineArr.push(submarineSelect);
      delete compsChoicesArr[submarineSelect];
      for (let i = 0; i < 2; i++) {
        if (result == 0) {
          let submarineNext = (submarineSelect += 10);
          submarineArr.push(submarineNext);
          delete compsChoicesArr[submarineNext];
        } else {
          let submarineNext = (submarineSelect += 1);
          submarineArr.push(submarineNext);
          delete compsChoicesArr[submarineNext];
        }
      }
    } else if (i == 4) {
      var destroyerSelect = Math.floor(Math.random() * 89);
      while (!compsChoicesArr.includes(destroyerSelect)) {
        destroyerSelect = Math.floor(Math.random() * 89);
      }
      destroyerArr.push(destroyerSelect);
      delete compsChoicesArr[destroyerSelect];
      for (let i = 0; i < 1; i++) {
        if (result == 0) {
          let destroyerNext = (destroyerSelect += 10);
          destroyerArr.push(destroyerNext);
          delete compsChoicesArr[destroyerNext];
        } else {
          let destroyerNext = (submarineSelect += 1);
          destroyerArr.push(destroyerNext);
          delete compsChoicesArr[destroyerNext];
        }
      }
    }
  }

  const compCell = document.querySelectorAll(".compCell");
  const compMessage = document.getElementById("compMessage");
  const compArea = document.getElementById("compArea");
  var hitArr = [];

  compCell.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.style.backgroundColor == "") {
        if (carrierArr.includes(Number(element.classList[0]))) {
          element.style.backgroundColor = "red";
          compMessage.textContent = "Boom! You hit their Carrier.";
          compMessage.style.color = "red";
          if (!hitArr.includes(element.classList[0])) {
            hitArr.push(element.classList[0]);
            compMove();
          }
          console.log(hitArr);
        } else if (battleshipArr.includes(Number(element.classList[0]))) {
          element.style.backgroundColor = "red";
          compMessage.textContent = "Boom! You hit their Battleship.";
          compMessage.style.color = "red";
          if (!hitArr.includes(element.classList[0])) {
            hitArr.push(element.classList[0]);
            compMove();
          }
          console.log(hitArr);
        } else if (cruiserArr.includes(Number(element.classList[0]))) {
          element.style.backgroundColor = "red";
          compMessage.textContent = "Boom! You hit their Cruiser.";
          compMessage.style.color = "red";
          if (!hitArr.includes(element.classList[0])) {
            hitArr.push(element.classList[0]);
            compMove();
          }
          console.log(hitArr);
        } else if (submarineArr.includes(Number(element.classList[0]))) {
          element.style.backgroundColor = "red";
          compMessage.textContent = "Boom! You hit their Submarine.";
          compMessage.style.color = "red";
          if (!hitArr.includes(element.classList[0])) {
            hitArr.push(element.classList[0]);
            compMove();
          }
          console.log(hitArr);
        } else if (destroyerArr.includes(Number(element.classList[0]))) {
          element.style.backgroundColor = "red";
          compMessage.textContent = "Boom! You hit their Destroyer.";
          compMessage.style.color = "red";
          if (!hitArr.includes(element.classList[0])) {
            hitArr.push(element.classList[0]);
            compMove();
          }
          console.log(hitArr);
        } else if (
          !carrierArr.includes(Number(element.classList[0])) ||
          !battleshipArr.includes(Number(element.classList[0])) ||
          !cruiserArr.includes(Number(element.classList[0])) ||
          !submarineArr.includes(Number(element.classList[0])) ||
          !destroyerArr.includes(Number(element.classList[0]))
        ) {
          element.style.backgroundColor = "#8998ac";
          compMessage.textContent = "You Missed...";
          compMessage.style.color = "white";
          compMove();
        }
      }

      if (hitArr.length == 17) {
        alert("you win");
        content.removeChild(compArea);
        text.textContent = "Place your ships:";
        text.style.color = "#ececec";

        cell.forEach((element) => {
          element.classList.remove("disabled");
          element.style.backgroundColor = "";
          if (element.classList.contains("highlighted")) {
            element.classList.remove("highlighted");
          }
        });
        carrierBtn.disabled = false;
        battleshipBtn.disabled = false;
        cruiserBtn.disabled = false;
        submarineBtn.disabled = false;
        destroyerBtn.disabled = false;
        continueBtnClicked = false;
        resetBtn.disabled = true;
        arr = [];
        compMoveMissArr = [];
        compMoveHitArr = [];
        compChoiceArr = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
          54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
          71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
          88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
        ];
        carrierArr = [];
        battleshipArr = [];
        cruiserArr = [];
        submarineArr = [];
        destroyerArr = [];

        compsChoicesArr = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
          54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
          71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
          88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
        ];
      }
    });
  });

  console.log(carrierArr);
  console.log(battleshipArr);
  console.log(cruiserArr);
  console.log(submarineArr);
  console.log(destroyerArr);

  console.log(compsChoicesArr);
};

function compMove() {
  var length = compChoiceArr.length;
  var compChoice = compChoiceArr[Math.floor(Math.random() * length)];
  const compArea = document.getElementById("compArea");
//this ensures that the computer does not select the same cell multiple times
  cell.forEach((element) => {
    if (
      element.classList.contains(compChoice) &&
      !element.classList.contains("highlighted")
    ) {
      compMoveMissArr.push(
        compChoiceArr.splice(compChoiceArr.indexOf(compChoice), 1)
      );
      element.style.backgroundColor = "#8998ac";
      text.textContent = "Miss";
      text.style.color = "#ececec";
    } else if (
      element.classList.contains(compChoice) &&
      element.classList.contains("highlighted")
    ) {
      compMoveHitArr.push(
        compChoiceArr.splice(compChoiceArr.indexOf(compChoice), 1)
      );
      element.style.backgroundColor = "red";
      text.textContent = "Boom! Your ship was hit.";
      text.style.color = "red";
    }
  });
  //if the computer's hit array length reaches 17 they will win and everything
  //resets

  if (compMoveHitArr.length == 17) {
    alert("you lose");
    content.removeChild(compArea);
    text.textContent = "Place your ships:";
    text.style.color = "#ececec";

    cell.forEach((element) => {
      element.classList.remove("disabled");
      element.style.backgroundColor = "";
      if (element.classList.contains("highlighted")) {
        element.classList.remove("highlighted");
      }
    });
    carrierBtn.disabled = false;
    battleshipBtn.disabled = false;
    cruiserBtn.disabled = false;
    submarineBtn.disabled = false;
    destroyerBtn.disabled = false;
    continueBtnClicked = false;
    resetBtn.disabled = true;
    arr = [];
    compMoveMissArr = [];
    compMoveHitArr = [];
    compChoiceArr = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
      75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
      93, 94, 95, 96, 97, 98, 99,
    ];
    carrierArr = [];
    battleshipArr = [];
    cruiserArr = [];
    submarineArr = [];
    destroyerArr = [];

    compsChoicesArr = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
      75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
      93, 94, 95, 96, 97, 98, 99,
    ];
  }
}
