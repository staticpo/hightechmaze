import { collectScore, exitMaze, moveDirection } from "../api";
import { Direction, MazePositionInfo } from "../api/types";

type Coordinate = [number, number];

export async function solveMaze(
  initialPosition: MazePositionInfo
): Promise<boolean> {
  // Set to store visited positions
  const visited: Set<string> = new Set();

  // Stack to store positions to explore
  const stack: Array<[Coordinate, MazePositionInfo]> = [
    [[0, 0], initialPosition],
  ];

  // Main loop that explores the maze
  while (stack.length > 0) {
    const [position, info] = stack.pop()!;

    const positionKey = position.join(",");
    visited.add(positionKey);

    if (info.canCollectScoreHere) {
      collectScore();
      const foundExit = await findExit(position, visited);
      if (foundExit) {
        return true;
      }
    }

    const possibleDirections = info.possibleMoveActions.filter(
      (move) => !visited.has(getNewPosition(position, move.direction).join(","))
    );
    for (const move of possibleDirections) {
      const newPosition = getNewPosition(position, move.direction);
      stack.push([newPosition, await moveDirection(move.direction)]);
    }
  }

  return false;
}

async function findExit(
  startPosition: Coordinate,
  visited: Set<string>
): Promise<boolean> {
  // Stack to store positions to explore when finding the exit
  const stack: Array<[Coordinate, MazePositionInfo]> = [
    [startPosition, {} as MazePositionInfo],
  ];

  // Loop that explores the maze to find an exit from the current position
  while (stack.length > 0) {
    const [position, info] = stack.pop()!;

    const positionKey = position.join(",");
    visited.add(positionKey);

    if (info.canExitMazeHere) {
      exitMaze();
      return true;
    }

    const possibleDirections = info.possibleMoveActions.filter(
      (move) => !visited.has(getNewPosition(position, move.direction).join(","))
    );
    for (const move of possibleDirections) {
      const newPosition = getNewPosition(position, move.direction);
      stack.push([newPosition, await moveDirection(move.direction)]);
    }
  }

  return false;
}

function getNewPosition(
  position: Coordinate,
  direction: Direction
): Coordinate {
  const newPosition = [...position] as Coordinate;
  if (direction === "Up") newPosition[1]--;
  if (direction === "Down") newPosition[1]++;
  if (direction === "Left") newPosition[0]--;
  if (direction === "Right") newPosition[0]++;
  return newPosition;
}
