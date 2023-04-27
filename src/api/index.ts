import { SERVER_URL, TOKEN } from "./constants";
import {
  MazesListItem,
  PlayerInfo,
  MazePositionInfo,
  Direction,
} from "./types";

/**
 * Mazes
 */

export const enterMaze = async (name: string): Promise<MazePositionInfo> => {
  const response = await fetch(`${SERVER_URL}/mazes/enter?mazeName=${name}`, {
    method: "POST",
    headers: { Authorization: TOKEN },
  });

  return await response.json();
};

export const exitMaze = async () => {
  const response = await fetch(`${SERVER_URL}/maze/exit`, {
    method: "POST",
    headers: { Authorization: TOKEN },
  });

  return await response.json();
};

export const fetchMazes = async (): Promise<Array<MazesListItem>> => {
  const response = await fetch(`${SERVER_URL}/mazes/all`, {
    headers: { Authorization: TOKEN },
  });

  return await response.json();
};

export const fetchPossibleActions = async (): Promise<MazePositionInfo> => {
  const response = await fetch(`${SERVER_URL}/maze/possibleActions`, {
    headers: { Authorization: TOKEN },
  });

  return await response.json();
};

export const moveDirection = async (
  direction: Direction
): Promise<MazePositionInfo> => {
  const response = await fetch(
    `${SERVER_URL}/maze/move?direction=${direction}`,
    {
      method: "POST",
      headers: { Authorization: TOKEN },
    }
  );

  return await response.json();
};

export const collectScore = async (): Promise<MazePositionInfo> => {
  const response = await fetch(`${SERVER_URL}/maze/collectScore`, {
    method: "POST",
    headers: { Authorization: TOKEN },
  });

  return await response.json();
};

/**
 * Player Methods
 *
 */

export const fetchPlayerInfo = async (): Promise<PlayerInfo> => {
  const response = await fetch(`${SERVER_URL}/player`, {
    headers: { Authorization: TOKEN },
  });

  return await response.json();
};

export const registerPlayer = async (name: string): Promise<PlayerInfo> => {
  const response = await fetch(`${SERVER_URL}/player/register?name=${name}`, {
    method: "POST",
    headers: { Authorization: TOKEN },
  });

  return await response.json();
};

export const forgetPlayer = async () => {
  await fetch(`${SERVER_URL}/player/forget`, {
    method: "DELETE",
    headers: { Authorization: TOKEN },
  });
};

// Maze
// This endpoint can be used to interact with a single maze.
// GET
// /api/maze/possibleActions
// 👀 Get the list of possible actions, from the tile where you are standing.
// POST
// /api/maze/move
// Move in the supplied direction.
// POST
// /api/maze/tag
// Tag the current tile with the given (non-negative) number
// POST
// /api/maze/collectScore
// 💰 Collect score from your hand to your bag.
// POST
// /api/maze/exit

// Mazes
// This endpoint provides the list of mazes, and the ability to enter a particular maze.
// GET
// /api/mazes/all
// 📜 All the mazes that exist in the game.
// POST
// /api/mazes/enter
// 🌟 Enter a maze.

// Player
// This endpoint can be used to register and ‘forget’ players.
// POST
// /api/player/register
// 📝 Register yourself here.
// GET
// /api/player
// 👤 Obtain information about yourself.
// DELETE
// /api/player/forget
// 🙈 Forget your current progress.
