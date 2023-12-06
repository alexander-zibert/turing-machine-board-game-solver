import { CriteriaCard } from "../hooks/useCriteriaCard";
import { Letter } from "../store/slices/commentsSlice";
import { FC } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SingleCharLabel from "./SingleCharLabel";
import Incorrect from "@mui/icons-material/HorizontalRuleRounded";

type LettersProps = {
  card: Undefinable<CriteriaCard>;
  verifier: Verifier;
  letters: Undefinable<Letter[]>
  toggleLetter: (verifier: Verifier) => void;
};

const Letters: FC<LettersProps> = ({card, verifier, letters, toggleLetter}) => {
  const theme = useTheme();

  return (
    !card?.nightmare ? <></> :
      <Box display={"flex"} justifyContent={"center"}>
        {letters?.map((letter) => (
          <Box key={letter.letter} position="relative">
            <IconButton
              id={`digit-code__${verifier}-${letter.letter}-button`}
              color="primary"
              sx={{
                height: theme.spacing(6),
                width: theme.spacing(6),
              }}
              onClick={() => toggleLetter(letter.letter)}
            >
              <SingleCharLabel>{letter.letter}</SingleCharLabel>
              <Box
                position="absolute"
                top={4}
                left={4}
                sx={{color: theme.palette.text.primary}}
              >
                {letter.isIrrelevant && (
                  <Incorrect
                    fontSize="large"
                    sx={{transform: "rotate(-45deg)"}}
                  />
                )}
              </Box>
            </IconButton>
          </Box>
        ))}
      </Box>
  )
}

export default Letters;
