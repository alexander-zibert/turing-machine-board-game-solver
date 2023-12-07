import { FC } from "react";
import Box from "@mui/material/Box";
import SingleCharLabel from "./SingleCharLabel";
import { CriteriaCard } from "../hooks/useCriteriaCard";

type VerifierProps = {
  card: Undefinable<CriteriaCard>;
  verifier: Verifier;
};

const VerifierLabel: FC<VerifierProps> = ({card, verifier}) => {

  return (
    card?.nightmare ? <></> :
      <Box
        zIndex={1}
        px={2}
        sx={(theme) => ({
          background: theme.palette.primary.main,
          color: theme.palette.common.white,
          borderTopLeftRadius: theme.spacing(1),
          borderBottomRightRadius: theme.spacing(3),
        })}
      >
        <SingleCharLabel white>{verifier}</SingleCharLabel>
      </Box>
  )
}

export default VerifierLabel;
