import Typography from "@mui/material/Typography";
import { FC } from "react";
import { CryptCard } from "../hooks/useCriteriaCard";
import { VERIFIER_COLORS, VERIFIER_TYPES } from "./constants";


type CryptCardProps = {
  card?: CryptCard;
};

const CryptCardLabel: FC<CryptCardProps> = (props) => {
  const {card} = props;

  return (!card) ? <></> :
    <Typography
      sx={(theme) => ({
        display: "flex",
        fontFamily: "Plus Jakarta Sans",
        fontSize: 12,
        alignItems: "center",
        justifyContent: "end",
        color: "black",
        background: `${VERIFIER_COLORS[card.color]}`,
        width: "19%",
        height: "min-content",
        py: 0.25,
        px: 1,
        borderRadius: theme.spacing(0, 1, 0, 1),
      })}
    >
      {card.id}&nbsp;{VERIFIER_TYPES(card.color, {fontSize: "inherit"})}
    </Typography>;
};

export default CryptCardLabel;
