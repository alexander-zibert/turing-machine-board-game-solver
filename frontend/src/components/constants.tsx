import { SvgIconProps } from "@mui/material/SvgIcon";
import { Currency, Lozenge, Pound, Slash } from "./TMSymbols";


export const VERIFIERS = (count: number = 4) => {
  return ["A", "B", "C", "D", "E", "F"].slice(0, count) as Verifier[];
};

export const VERIFIER_TYPES = (type: number, props?: SvgIconProps) => {
  return [<Lozenge {...props} />, <Pound {...props} />, <Slash {...props} />, <Currency {...props} />][type];
};

export const VERIFIER_COLORS = ["#2db563", "#febc12", "#58b3da", "#7f66ad"];
