export type Direction = "Up" | "Down" | "Left" | "Right";

export interface MazesListItem {
  name: string;
  totalTiles: number;
  potentialReward: number;
}

export interface PlayerInfo {
  playerId: string;
  name: string;
  isInMaze: boolean;
  maze: string | null;
  hasFoundEasterEgg: boolean;
  mazeScoreInHand: number;
  mazeScoreInBag: number;
  playerScore: number;
}

interface MoveInfo {
  direction: Direction;
  isStart: boolean;
  allowsExit: boolean;
  allowsScoreCollection: boolean;
  hasBeenVisited: boolean;
  rewardOnDestination: number;
  tagOnTile: number | null;
}

export interface MazePositionInfo {
  possibleMoveActions: MoveInfo[];
  canCollectScoreHere: boolean;
  canExitMazeHere: boolean;
  currentScoreInHand: number;
  currentScoreInBag: number;
  tagOnCurrentTile: number | null;
}
