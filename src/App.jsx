//refactored into react

//fix issue of computer attacking its own board
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const messageRef = useRef(null);
  const compRef = useRef(null);

  const [isRotated, setIsRotated] = useState(false);
  const [selectedShip, setSelectedShip] = useState(false);
  const [placedShips, setPlacedShips] = useState([]);
  const [hoveredCells, setHoveredCells] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isDisabled, setIsDisabled] = useState({
    reset: true,
    rotate: true,
    continue: true,
  });
  const [disabledShips, setDisabledShips] = useState({
    carrier: false,
    battleship: false,
    cruiser: false,
    submarine: false,
    destroyer: false,
  });

  const ships = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };
  const [playerGrid, setPlayerGrid] = useState(Array(100).fill(null));
  const [compGrid, setCompGrid] = useState(Array(100).fill(null));

  const [compShips, setCompShips] = useState({
    carrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: [],
  });
  const [compChoices, setCompChoices] = useState([...Array(100).keys()]);
  const [compHits, setCompHits] = useState([]);
  const [compMisses, setCompMisses] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);

  useEffect(() => {
    placeComputerShips();
  }, []);

  useEffect(() => {
    if (selectedShip) {
      setIsDisabled((prev) => ({ ...prev, reset: false, rotate: false }));
    }
    if (gameStarted && compRef.current) {
      compRef.current.textContent = "Choose your target!";
      compRef.current.style.color = "red";
    }
  }, [selectedShip, gameStarted]);

  useEffect(() => {
    if (placedShips.length == 5) {
      setIsDisabled((prev) => ({ ...prev, continue: false }));
    }
  }, [placedShips.length]);

  const placeComputerShips = () => {
    let newCompShips = {
      carrier: placeShip(5),
      battleship: placeShip(4),
      cruiser: placeShip(3),
      submarine: placeShip(3),
      destroyer: placeShip(2),
    };
    setCompShips(newCompShips);
  };

  const placeShip = (size) => {
    let placed = false;
    let pos = [];

    while (!placed) {
      let start = Math.floor(Math.random() * 100);
      let horizontal = Math.random() < 0.5;

      pos = [];
      for (let i = 0; i < size; i++) {
        let nextPos = horizontal ? start + i : start + i * 10;
        if (
          nextPos > 99 ||
          (horizontal && Math.floor(start / 10) !== Math.floor(nextPos / 10))
        ) {
          break;
        }
        pos.push(nextPos);
      }
      if (pos.length == size && pos.every((el) => compChoices.includes(el))) {
        placed = true;
      }
    }
    setCompChoices((prev) => prev.filter((cell) => !pos.includes(cell)));
    return pos;
  };

  const handlePlayerAttack = (cell) => {
    if (!playerTurn) return;

    let hit = false;
    let updatedShips = { ...compShips };

    Object.keys(updatedShips).forEach((ship) => {
      if (updatedShips[ship].includes(cell)) {
        hit = true;
        updatedShips[ship] = updatedShips[ship].filter((pos) => pos !== cell);
      }
    });

    if (hit) {
      setCompHits((prev) => [...prev, cell]);
      compRef.current.textContent = "Boom! You hit their ship!";
      compRef.current.style.color = "red";
    } else {
      setCompMisses((prev) => [...prev, cell]);
      compRef.current.textContent = "Miss!";
      compRef.current.style.color = "white";
    }

    setPlayerTurn(false);
    setTimeout(computerMove, 2000);
  };
  const computerMove = () => {
    if (compChoices.length === 0) return;
  
    let availableTargets = playerGrid
      .map((cell, index) => (cell !== "hit" && cell !== "miss" ? index : null))
      .filter((index) => index !== null);
  
    if (availableTargets.length === 0) return;
  
    let randomIndex = Math.floor(Math.random() * availableTargets.length);
    let compAttack = availableTargets[randomIndex];
  
    // Checking if the attack hits a player's ship
    let hit = false;
    placedShips.forEach((ship) => {
      if (ship.positions.includes(compAttack)) {
        hit = true;
      }
    });
  
    if (hit) {
      setCompHits((prev) => [...prev, compAttack]);
      // Mark the attack on the player grid as a hit
      let newPlayerGrid = [...playerGrid];
      newPlayerGrid[compAttack] = "hit";  // Mark the player's grid as a hit
      setPlayerGrid(newPlayerGrid);
    } else {
      setCompMisses((prev) => [...prev, compAttack]);
      // Mark the attack on the player grid as a miss
      let newPlayerGrid = [...playerGrid];
      newPlayerGrid[compAttack] = "miss";  // Mark the player's grid as a miss
      setPlayerGrid(newPlayerGrid);
    }
  
    setPlayerTurn(true);  // It's now the player's turn again
  };

  const handleShipSelection = (ship) => {
    setSelectedShip(ship);
    if (messageRef.current) {
      messageRef.current.textContent = `Selected: ${ship}`;
    }
  };

  const toggleRotate = () => {
    setIsRotated((prev) => !prev);
  };

  const handleMouseOver = (index) => {
    if (!selectedShip) return;

    let newHoveredCells = [];
    const shipSize = ships[selectedShip];

    if (isRotated) {
      if (index + (shipSize - 1) * 10 < 100) {
        for (let i = 0; i < shipSize; i++) {
          newHoveredCells.push(index + i * 10);
        }
      }
    } else {
      const rowStart = Math.floor(index / 10) * 10;
      const rowEnd = rowStart + 10;

      if (index + shipSize - 1 < rowEnd) {
        for (let i = 0; i < shipSize; i++) {
          newHoveredCells.push(index + i);
        }
      }
    }

    setHoveredCells(newHoveredCells);
  };

  const handleMouseOut = () => {
    setHoveredCells([]);
  };

  const handleCellClick = (index) => {
    if (!selectedShip) return;
    const shipSize = ships[selectedShip];

    let newGrid = [...playerGrid];
    let newPlacedShips = [...placedShips];

    let validPlacement = true;
    let newShipPositions = [];

    if (isRotated) {
      if (index + (shipSize - 1) * 10 < 100) {
        for (let i = 0; i < shipSize; i++) {
          if (newGrid[index + i * 10]) validPlacement = false;
          newShipPositions.push(index + i * 10);
        }
      } else {
        validPlacement = false;
      }
    } else {
      const rowStart = Math.floor(index / 10) * 10;
      const rowEnd = rowStart + 10;

      if (index + shipSize - 1 < rowEnd) {
        for (let i = 0; i < shipSize; i++) {
          if (newGrid[index + i]) validPlacement = false;
          newShipPositions.push(index + i);
        }
      } else {
        validPlacement = false;
      }
    }

    if (!validPlacement) return;

    newShipPositions.forEach((pos) => (newGrid[pos] = "highlighted"));
    newPlacedShips.push({ ship: selectedShip, positions: newShipPositions });

    setPlayerGrid(newGrid);
    setPlacedShips(newPlacedShips);

    setDisabledShips((prev) => ({ ...prev, [selectedShip]: true }));
    setIsDisabled((prev) => ({ ...prev, rotate: true }));

    setSelectedShip(null);
  };

  const resetGame = () => {
    setPlayerGrid(Array(100).fill(null));
    setPlacedShips([]);
    setSelectedShip(null);
    setIsRotated(false);
    setDisabledShips({
      carrier: false,
      battleship: false,
      cruiser: false,
      submarine: false,
      destroyer: false,
    });
    setIsDisabled({ reset: true, rotate: true, continue: true });
    if (messageRef.current) {
      messageRef.current.textContent = "Game Reset";
    }
  };

  const handleContinue = () => {
    setIsDisabled((prev) => ({ ...prev, continue: true, reset: true }));

    if (messageRef.current) {
      messageRef.current.textContent = "awaiting...";
    }

    makeCompGrid();
  };

  const makeCompGrid = () => {
    setCompGrid(Array(100).fill("empty"));
    setGameStarted(true);
  };

  return (
    <div>
      <h1>NAVAL WAREFARE</h1>
      <div id="content">
        <div id="gameboard">
          <div ref={messageRef} className="message">
            Place your ships
          </div>
          <div className="container">
            {playerGrid.map((cell, index) => {
              const isHovered = hoveredCells.includes(index);
              const isPlaced = cell === "highlighted";

              return (
                <div
                  key={index}
                  className={`cell ${
                    isHovered ? "green" : isPlaced ? "highlighted" : ""
                  }`}
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={handleMouseOut}
                  onClick={() => handleCellClick(index)}
                ></div>
              );
            })}
          </div>
          <button
            className="btn"
            onClick={handleContinue}
            disabled={isDisabled.continue}
          >
            Continue
          </button>
        </div>
        <div id="gameboardBtns">
          <div id="ships">
            {Object.keys(ships).map((ship) => (
              <button
                key={ship}
                onClick={() => handleShipSelection(ship)}
                className={`btn ${
                  disabledShips[ship]
                    ? "disabled"
                    : ship === selectedShip
                    ? "selected"
                    : ""
                }`}
                disabled={disabledShips[ship]}
              >
                {ship}
              </button>
            ))}
          </div>
          <div id="settings">
            <button
              className="btn"
              onClick={toggleRotate}
              disabled={isDisabled.rotate}
            >
              {isRotated ? "Vertical" : "Horizontal"}
            </button>
            <button
              className="btn"
              onClick={resetGame}
              disabled={isDisabled.reset}
            >
              Reset
            </button>
          </div>
        </div>
        {gameStarted && (
          <div id="compArea">
            <p ref={compRef}>Opponent's Board</p>
            <div className="container">
              {compGrid.map((cell, index) => (
                <div
                  key={index}
                  className={`compCell ${
                    compHits.includes(index)
                      ? "hit"
                      : compMisses.includes(index)
                      ? "miss"
                      : null
                  }`}
                  onClick={() => handlePlayerAttack(index)}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
