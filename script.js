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
let carrierBtnClicked = false;
let battleshipBtnClicked = false;
let cruiserBtnClicked = false;
let submarineBtnClicked = false;
let destroyerBtnClicked = false;
let continueBtnClicked = false;
var arr = [];

const text = document.createElement("p");
text.textContent = "Place your ships:";
message.appendChild(text);

carrierBtn.addEventListener("click", () => {
  rotateBtn.disabled = false;
  cell.forEach((element) => {
    element.classList.remove("disabled");

    if (element.classList.contains("horizontal")) {
      element.classList.toggle("horizontal");
    }
  });

  carrierBtnClicked = true;
  battleshipBtnClicked = false;
  cruiserBtnClicked = false;
  submarineBtnClicked = false;
  destroyerBtnClicked = false;

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
        });
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

rotateBtn.addEventListener("click", () => {
  cell.forEach((element) => {
    element.classList.toggle("horizontal");

    element.addEventListener("mouseover", () => {
      cell.forEach((innerElement) => {
        if (element.classList[2] === "horizontal") {
          if (
            Number(innerElement.classList[0]) > Number(element.classList[0])
          ) {
            innerElement.style.backgroundColor = "";
          }

          if (carrierBtnClicked == true) {
            if (
              Number(innerElement.classList[0]) ==
              Number(element.classList[0]) + 1
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
            }
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

resetBtn.addEventListener("click", () => {
  cell.forEach((element) => {
    element.classList.remove("disabled");
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
  console.log(arr.length);
});

cell.forEach((element) => {
  element.addEventListener("click", () => {
    cell.forEach((innerElement) => {
      if (innerElement.style.backgroundColor == "green") {
        innerElement.classList.toggle("highlighted");
        if (carrierBtnClicked == true) {
          carrierBtn.disabled = true;
          resetBtn.disabled = false;
          rotateBtn.disabled = true;
          cell.forEach((innestElement) => {
            innestElement.classList.add("disabled");
          });
        }
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

playerGB.addEventListener("click", () => {
  cell.forEach((element) => {
    if (element.classList.contains("highlighted")) {
      if (!arr.includes(element.classList[0])) arr.push(element.classList[0]);
    }
  });
  if (arr.length == 17) {
    continueBtn.disabled = false;
  } else {
    continueBtn.disabled = true;
  }
  if (continueBtnClicked == true) {
    continueBtn.disabled = true;
  }
});

continueBtn.addEventListener("click", () => {
  continueBtnClicked = true;
  resetBtn.disabled = true;

  text.textContent = "Choose your Target!";
  text.style.color = "red";

  makeCompGrid();
});

//add an event listener to the computers grid that when I click a cell it appends a message
//whether or not I hit their ship and makes that space red...if not append miss
//also code in the game flow...after I make a move the computer randomly selects a slot
//on my board

const compSelection = () => {
  for (let i = 0; i < 6; i++) {
    if (i == 1) {
      var carrierSelect = Math.floor(Math.random() * 59);
      let carrierChoicesVertical = [
        carrierSelect,
        carrierSelect + 10,
        carrierSelect + 20,
        carrierSelect + 30,
        carrierSelect + 40,
      ];
      let carrierChoicesHorizontal = [
        carrierSelect,
        carrierSelect + 1,
        carrierSelect + 2,
        carrierSelect + 3,
        carrierSelect + 4,
      ];

      var carrierOrientationArr = [
        carrierChoicesVertical,
        carrierChoicesHorizontal,
      ];
    }
    if (i == 2) {
      var battleshipSelect = Math.floor(Math.random() * 69);
      if (
        battleshipSelect == carrierSelect ||
        battleshipSelect + 40 == carrierSelect ||
        battleshipSelect + 40 == carrierSelect + 1 ||
        battleshipSelect + 40 == carrierSelect + 2 ||
        battleshipSelect + 40 == carrierSelect + 3 ||
        battleshipSelect + 40 == carrierSelect + 4
      ) {
        battleshipSelect = Math.floor(Math.random() * 69);
      }
      let battleshipChoicesVertical = [
        battleshipSelect,
        battleshipSelect + 10,
        battleshipSelect + 20,
        battleshipSelect + 30,
      ];
      let battleshipChoicesHorizontal = [
        battleshipSelect,
        battleshipSelect + 1,
        battleshipSelect + 2,
        battleshipSelect + 3,
      ];

      var battleshipOrientationArr = [
        battleshipChoicesHorizontal,
        battleshipChoicesVertical,
      ];
    }
    if (i == 3) {
      var cruiserSelect = Math.floor(Math.random() * 79);
      if (
        cruiserSelect == battleshipSelect ||
        cruiserSelect == carrierSelect ||
        cruiserSelect + 30 == carrierSelect ||
        battleshipSelect + 30 == carrierSelect + 1 ||
        battleshipSelect + 30 == carrierSelect + 2 ||
        battleshipSelect + 30 == carrierSelect + 3 ||
        battleshipSelect + 30 == carrierSelect + 4 ||
        cruiserSelect + 30 == battleshipSelect ||
        cruiserSelect + 30 == battleshipSelect + 1 ||
        cruiserSelect + 30 == battleshipSelect + 2 ||
        cruiserSelect + 30 == battleshipSelect + 3
      ) {
        cruiserSelect = Math.floor(Math.random() * 79);
      }

      let cruiserChoicesVertical = [
        cruiserSelect,
        cruiserSelect + 10,
        cruiserSelect + 20,
      ];
      let cruiserChoicesHorizontal = [
        cruiserSelect,
        cruiserSelect + 1,
        cruiserSelect + 2,
      ];

      var cruiserOrientationArr = [
        cruiserChoicesHorizontal,
        cruiserChoicesVertical,
      ];
    }
    if (i == 4) {
      var submarineSelect = Math.floor(Math.random() * 79);
      if (
        submarineSelect == cruiserSelect ||
        submarineSelect == battleshipSelect ||
        submarineSelect == carrierSelect ||
        submarineSelect + 30 == carrierSelect ||
        submarineSelect + 30 == carrierSelect + 1 ||
        submarineSelect + 30 == carrierSelect + 2 ||
        submarineSelect + 30 == carrierSelect + 3 ||
        submarineSelect + 30 == carrierSelect + 4 ||
        submarineSelect + 30 == battleshipSelect ||
        submarineSelect + 30 == battleshipSelect + 1 ||
        submarineSelect + 30 == battleshipSelect + 2 ||
        submarineSelect + 30 == battleshipSelect + 3 ||
        submarineSelect + 30 == cruiserSelect ||
        submarineSelect + 30 == cruiserSelect + 1 ||
        submarineSelect + 30 == cruiserSelect + 2
      ) {
        submarineSelect = Math.floor(Math.random() * 79);
      }

      let submarineChoicesVertical = [
        submarineSelect,
        submarineSelect + 10,
        submarineSelect + 20,
      ];
      let submarineChoicesHorizontal = [
        submarineSelect,
        submarineSelect + 1,
        submarineSelect + 2,
      ];

      var submarineOrientationArr = [
        submarineChoicesHorizontal,
        submarineChoicesVertical,
      ];
    }
    if (i == 5) {
      var destroyerSelect = Math.floor(Math.random() * 89);
      if (
        destroyerSelect == submarineSelect ||
        destroyerSelect == carrierSelect ||
        destroyerSelect == cruiserSelect ||
        destroyerSelect == battleshipSelect ||
        destroyerSelect + 20 == carrierSelect ||
        destroyerSelect + 20 == carrierSelect + 1 ||
        destroyerSelect + 20 == carrierSelect + 2 ||
        destroyerSelect + 20 == carrierSelect + 3 ||
        destroyerSelect + 20 == carrierSelect + 4 ||
        destroyerSelect + 20 == battleshipSelect ||
        destroyerSelect + 20 == battleshipSelect + 1 ||
        destroyerSelect + 20 == battleshipSelect + 2 ||
        destroyerSelect + 20 == battleshipSelect + 3 ||
        destroyerSelect + 20 == cruiserSelect ||
        destroyerSelect + 20 == cruiserSelect + 1 ||
        destroyerSelect + 20 == cruiserSelect + 2 ||
        destroyerSelect + 20 == submarineSelect ||
        destroyerSelect + 20 == submarineSelect + 1 ||
        destroyerSelect + 20 == submarineSelect + 2
      ) {
        destroyerSelect = Math.floor(Math.random() * 89);
      }

      let destroyerChoicesVertical = [destroyerSelect, destroyerSelect + 10];
      let destroyerChoicesHorizontal = [destroyerSelect, destroyerSelect + 1];

      var destroyerOrientationArr = [
        destroyerChoicesHorizontal,
        destroyerChoicesVertical,
      ];
    }
  }

  var carrierChoice = carrierOrientationArr[Math.floor(Math.random() * 2)];
  var battleshipChoice =
    battleshipOrientationArr[Math.floor(Math.random() * 2)];
  var cruiserChoice = cruiserOrientationArr[Math.floor(Math.random() * 2)];
  var submarineChoice = submarineOrientationArr[Math.floor(Math.random() * 2)];
  var destroyerChoice = destroyerOrientationArr[Math.floor(Math.random() * 2)];

  const compCell = document.querySelectorAll(".compCell");
  const compMessage = document.getElementById("compMessage");
  const compArea = document.getElementById("compArea");
  var hitArr = [];

  compCell.forEach((element) => {
    element.addEventListener("click", () => {
      if (carrierChoice.includes(Number(element.classList[0]))) {
        element.style.backgroundColor = "red";
        compMessage.textContent = "Boom! You hit their Carrier.";
        compMessage.style.color = "red";
        if (!hitArr.includes(element.classList[0])) {
          hitArr.push(element.classList[0]);
          compMove();
        }
        console.log(hitArr);
      } else if (battleshipChoice.includes(Number(element.classList[0]))) {
        element.style.backgroundColor = "red";
        compMessage.textContent = "Boom! You hit their Battleship.";
        compMessage.style.color = "red";
        if (!hitArr.includes(element.classList[0])) {
          hitArr.push(element.classList[0]);
          compMove();
        }
        console.log(hitArr);
      } else if (cruiserChoice.includes(Number(element.classList[0]))) {
        element.style.backgroundColor = "red";
        compMessage.textContent = "Boom! You hit their Cruiser.";
        compMessage.style.color = "red";
        if (!hitArr.includes(element.classList[0])) {
          hitArr.push(element.classList[0]);
          compMove();
        }
        console.log(hitArr);
      } else if (submarineChoice.includes(Number(element.classList[0]))) {
        element.style.backgroundColor = "red";
        compMessage.textContent = "Boom! You hit their Submarine.";
        compMessage.style.color = "red";
        if (!hitArr.includes(element.classList[0])) {
          hitArr.push(element.classList[0]);
          compMove();
        }
        console.log(hitArr);
      } else if (destroyerChoice.includes(Number(element.classList[0]))) {
        element.style.backgroundColor = "red";
        compMessage.textContent = "Boom! You hit their Destroyer.";
        compMessage.style.color = "red";
        if (!hitArr.includes(element.classList[0])) {
          hitArr.push(element.classList[0]);
          compMove();
        }
        console.log(hitArr);
      } else if (
        !carrierChoice.includes(Number(element.classList[0])) ||
        !battleshipChoice.includes(Number(element.classList[0])) ||
        !cruiserChoice.includes(Number(element.classList[0])) ||
        !submarineChoice.includes(Number(element.classList[0])) ||
        !destroyerChoice.includes(Number(element.classList[0]))
      ) {
        element.style.backgroundColor = "#8998ac";
        compMessage.textContent = "You Missed...";
        compMessage.style.color = "white";
        compMove();
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
        console.log(arr.length);
      }
    });
  });

  console.log(carrierChoice);
  console.log(battleshipChoice);
  console.log(cruiserChoice);
  console.log(submarineChoice);
  console.log(destroyerChoice);

  function compMove() {
    let choice = Math.floor(Math.random() * 101);
    let playerArr = [];

    cell.forEach((element) => {
      if (
        element.classList.contains(choice) &&
        element.classList.contains("highlighted")
      ) {
        element.style.backgroundColor = "red";
        text.textContent = "Boom! Your ship was hit.";
        text.style.color = "red";
        if (!playerArr.includes(Number(element.classList[0]))) {
          playerArr.push(element.classList[0]);
          console.log(playerArr);
        }
      }
    });

    cell.forEach((element) => {
      if (
        element.classList.contains(choice) &&
        !element.classList.contains("highlighted")
      ) {
        element.style.backgroundColor = "#8998ac";
        text.textContent = "Miss";
        text.style.color = "#ececec";
      }
    });

    if (playerArr == 17) {
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
      console.log(arr.length);
    }
  }
};
