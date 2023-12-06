import Typography from "@mui/material/Typography";
import { FC } from "react";
import { CryptCard } from "../hooks/useCriteriaCard";

type CryptCardProps = {
  card?: CryptCard;
};

const CryptCardLabel: FC<CryptCardProps> = (props) => {
  const {card} = props;
  // `${color <= 2 ? "black" : "white"}`  // contrast
  return (!card) ? <></> :
    <Typography
      component="span"
      fontSize="12px"
      fontFamily={"Plus Jakarta Sans"}
      p={0.25}
      px={1}
      sx={(theme) => ({
        color: "black",
        background: `${["#2db563", "#febc12", "#58b3da", "#7f66ad"][card.color]}`,
        borderTopRightRadius: "8px",
        borderBottomLeftRadius: "8px",
        height: "min-content",
      })}
    >
      {card.id}&nbsp;{['◊', '#', '/', '¤'][card.color]}
    </Typography>
};

export default CryptCardLabel;
