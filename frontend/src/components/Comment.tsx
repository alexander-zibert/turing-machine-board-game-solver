import Box from "@mui/material/Box";
import { CriteriaCard, useCriteriaCard } from "hooks/useCriteriaCard";
import { FC } from "react";
import Card from "./Card";
import SingleCharLabel from "./SingleCharLabel";
import Incorrect from "@mui/icons-material/HorizontalRuleRounded";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Letter } from "../store/slices/commentsSlice";

type Props = {
  verifier: Verifier;
};

type VerifierProps = {
  card: Undefinable<CriteriaCard>;
  verifier: Verifier;
};

type LettersProps = {
  card: Undefinable<CriteriaCard>;
  verifier: Verifier;
  letters: Undefinable<Letter[]>
  toggleLetter: (verifier: Verifier) => void;
};

const Verifier: FC<VerifierProps> = ({card, verifier}) => {

  return (
    card?.nightmare ? <></> :
      <Box
        position="absolute"
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

const Comment: FC<Props> = ({verifier}) => {
  const {
    card: firstCard,
    cardImage: firstCardImage,
    toggleCriteria: toggleFirstCardCriteria,
    letters,
    toggleLetter,
  } = useCriteriaCard(verifier, 0);
  const {
    card: secondCard,
    cardImage: secondCardImage,
    toggleCriteria: toggleSecondCardCriteria,
  } = useCriteriaCard(verifier, 1);

  return (
    <>
      {firstCard && (
        <Grid item md={6} xs={12}>
          <Verifier verifier={verifier} card={firstCard}/>
          <Card
            card={firstCard}
            cardImage={firstCardImage}
            onToggleCriteria={toggleFirstCardCriteria}
          />
          <Letters card={firstCard} verifier={verifier} letters={letters} toggleLetter={toggleLetter}/>
        </Grid>
      )}
      {secondCard && (
        <Grid item md={6} xs={12}>
          <Verifier card={secondCard} verifier={verifier}/>
          <Card
            card={secondCard}
            cardImage={secondCardImage}
            onToggleCriteria={toggleSecondCardCriteria}
          />
        </Grid>
      )}
    </>
  );
};

export default Comment;
