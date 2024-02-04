import Box from "@mui/material/Box";
import { FC } from "react";
import { CriteriaCard } from "../hooks/useCriteriaCard";
import SingleCharLabel from "./SingleCharLabel";


interface VerifierProps {
  card: Undefinable<CriteriaCard>,
  verifier: Verifier,
}

const VerifierLabel: FC<VerifierProps> = ({card, verifier}) => {

  return (
    card?.nightmare ? <></> :
      <Box
        sx={(theme) => ({
          background: theme.palette.primary.main,
          color: theme.palette.common.white,
          borderTopLeftRadius: theme.spacing(1),
          borderBottomRightRadius: theme.spacing(3),
          display: "flex",
          width: "18%",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        })}
      >
        <SingleCharLabel white>{verifier}</SingleCharLabel>
      </Box>
  );
};

export default VerifierLabel;
