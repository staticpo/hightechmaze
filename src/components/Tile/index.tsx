import React from "react";
import { Direction, MazePositionInfo } from "../../api/types";

interface Props {
  tileInfo: MazePositionInfo;
}

export const Tile = (props: Props) => {
  const { tileInfo } = props;
  const moves = React.useMemo(
    () => tileInfo.possibleMoveActions,
    [tileInfo.possibleMoveActions]
  );

  const hasDirection = React.useCallback(
    (direction: Direction) => {
      return moves.some((move) => move.direction === direction);
    },
    [moves]
  );

  const showIcons = React.useCallback(
    (direction: Direction) => {
      const tile = moves.find((move) => move.direction === direction);

      if (tile) {
        if (tile.allowsScoreCollection) {
          return "💰";
        }
        if (tile.allowsExit) {
          return "🚪🏃";
        }
      }

      return null;
    },
    [moves]
  );

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td className={hasDirection("Up") ? `room` : ""}>
              {showIcons("Up")}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={5} align="center" className="arrow">
              {hasDirection("Up") && `⬆️`}
            </td>
          </tr>
          <tr>
            <td className={hasDirection("Left") ? `room` : ""}>
              {showIcons("Left")}
            </td>
            <td className="arrow">{hasDirection("Left") && `⬅️`}</td>
            <td className="room">
              {tileInfo.canCollectScoreHere && "💰"}
              {tileInfo.canExitMazeHere && "🚪🏃"}
            </td>
            <td className="arrow">{hasDirection("Right") && `➡️`}</td>
            <td className={hasDirection("Right") ? `room` : ""}>
              {showIcons("Right")}
            </td>
          </tr>
          <tr>
            <td colSpan={5} align="center" className="arrow">
              {hasDirection("Down") && `⬇️`}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className={hasDirection("Down") ? `room` : ""}>
              {showIcons("Down")}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
