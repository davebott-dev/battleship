//refactored into react
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const messageRef = useRef(null);

  const [isRotated, setIsRotated] = useState(false);
  const [selectedShip, setSelectedShip] = useState(false);
  const [placedShips, setPlacedShips] = useState([]);
  const [hoveredCells, setHoveredCells] = useState([]);
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

  useEffect(() => {
    if (selectedShip) {
      setIsDisabled({ reset: false, rotate: false, continue: false });
    }
  }, [selectedShip]);

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
    if (messageRef.current) {
      messageRef.current.textContent = "Game Begin";
    }
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
      </div>
    </div>
  );
}

export default App;
