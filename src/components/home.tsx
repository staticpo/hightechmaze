import React from "react";
import {
  collectScore,
  enterMaze,
  exitMaze,
  fetchMazes,
  fetchPlayerInfo,
  fetchPossibleActions,
  forgetPlayer,
  moveDirection,
  registerPlayer,
} from "../api";
import { Logs } from "./Log";
import { Tile } from "./Tile";
import { Direction, MazePositionInfo } from "../api/types";
import { solveMaze } from "../maze/solver";

export const Home = () => {
  const [logs, setLogs] = React.useState("");
  const [currentTile, setCurrentTile] = React.useState<MazePositionInfo | null>(
    null
  );
  const [goldHand, setGoldHand] = React.useState(0);
  const [goldBag, setGoldBag] = React.useState(0);

  const handleGetMazes = async () => {
    const response = await fetchMazes();
    setLogs(JSON.stringify(response, null, 2));
  };

  const handleRegisterPlayer = async () => {
    const response = await registerPlayer("JJ jjJJ");
    setLogs(JSON.stringify(response, null, 2));
  };

  const handleGetPlayerInfo = async () => {
    const response = await fetchPlayerInfo();
    setLogs(JSON.stringify(response, null, 2));
  };

  const handleForgetPlayer = async () => {
    await forgetPlayer();
    setLogs("");
  };

  const move = async (direction: Direction) => {
    const response = await moveDirection(direction);
    setCurrentTile(response);
    setLogs(JSON.stringify(response, null, 2));
  };

  const handleGetPossibleActions = async () => {
    const response = await fetchPossibleActions();
    setCurrentTile(response);
    setLogs(JSON.stringify(response, null, 2));
  };

  const handleSelectMap = async () => {
    const response = await enterMaze("Example Maze");
    setCurrentTile(response);
    setLogs(JSON.stringify(response, null, 2));
  };

  const handleCollectScore = async () => {
    const response = await collectScore();
    setLogs(JSON.stringify(response, null, 2));
  };

  const handleExitMaze = async () => {
    const response = await exitMaze();
    setLogs(JSON.stringify(response, null, 2));
  };

  const handleAutoSolve = () => {
    console.log("auto solving");
    if (currentTile) {
      solveMaze(currentTile);
    }
  };

  return (
    <div>
      <h1>API Calls</h1>
      <div className="buttons">
        🧑
        <button onClick={handleRegisterPlayer}>Register Player</button>
        <button onClick={handleGetPlayerInfo}>Get Player</button>
        <button onClick={handleForgetPlayer}>Forget Player</button>
      </div>
      <div className="buttons">
        🧭
        <button onClick={handleGetMazes}>Get Mazes List</button>
        <button onClick={handleSelectMap}>Select Example Maze</button>
        <button onClick={handleGetPossibleActions}>Get Possible Actions</button>
      </div>
      <Logs text={logs} />
      <hr />
      <h4>Manual Operation</h4>
      <div className="manualOperationRow">
        <div className="arrowButtons">
          <div>
            <button onClick={() => move("Up")}>↑</button>
          </div>
          <div>
            <button onClick={() => move("Left")}>←</button>
            <button onClick={() => move("Down")}>↓</button>
            <button onClick={() => move("Right")}>→</button>
          </div>
        </div>
        <div className="buttons">
          <button
            disabled={!currentTile?.canCollectScoreHere}
            onClick={handleCollectScore}
          >
            Collect 💰
          </button>{" "}
          <button
            disabled={!currentTile?.canExitMazeHere}
            onClick={handleExitMaze}
          >
            Exit 🚪🏃
          </button>
        </div>
      </div>
      <h3>Current Tile:</h3>
      {currentTile && <Tile tileInfo={currentTile} />}
      <hr />
      <h3>Auto Solver</h3>
      <p>
        Only use this if you're not doing or have done manual operations before.
        If in doubt, just <em>Forget Player</em> and select a maze
      </p>
      <button onClick={handleAutoSolve}>Auto-solve the maze</button>
      <div>💰: {goldBag}</div>
    </div>
  );
};
