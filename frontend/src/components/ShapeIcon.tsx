import { FC } from "react";
import { VERIFIER_COLORS } from "./constants";


type Props = {
  shape: Shape;
  sizeMultiplier?: number;
};

const ShapeIcon: FC<Props> = ({shape, sizeMultiplier = 1}) => {
  switch (shape) {
    default:
    case "triangle":
      return (
        <svg
          width={37 * sizeMultiplier}
          height={32 * sizeMultiplier}
          viewBox="0 0 37 32"
        >
          <path
            d="m16.53.99L.27,28.96c-.78,1.33.19,3.01,1.73,3.01h32.51c1.54,0,2.5-1.67,1.73-3.01L19.98.99c-.77-1.33-2.69-1.33-3.46,0Z"
            fill={VERIFIER_COLORS[2]}
          />
        </svg>
      );
    case "square":
      return (
        <svg
          width={32 * sizeMultiplier}
          height={32 * sizeMultiplier}
          viewBox="0 0 32 32"
        >
          <rect width={32} height={32} rx={2} ry={2} fill={VERIFIER_COLORS[1]} />
        </svg>
      );
    case "circle":
      return (
        <svg
          width={32 * sizeMultiplier}
          height={32 * sizeMultiplier}
          viewBox="0 0 32 32"
        >
          <circle cx={16} cy={16} r={16} fill={VERIFIER_COLORS[3]}  />
        </svg>
      );
  }
};

export default ShapeIcon;
