import { useCriteriaCard } from "hooks/useCriteriaCard";
import { FC } from "react";
import Card from "./Card";
import Letters from "./Letters";
import Grid from "@mui/material/Grid";

type CommentProps = {
  verifier: Verifier;
  noDivider?: boolean;
};

const Comment: FC<CommentProps> = ({verifier}) => {
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
          <Card
            card={firstCard}
            cardImage={firstCardImage}
            verifier={verifier}
            onToggleCriteria={toggleFirstCardCriteria}
          />
          <Letters card={firstCard} verifier={verifier} letters={letters} toggleLetter={toggleLetter}/>
        </Grid>
      )}
      {secondCard && (
        <Grid item md={6} xs={12}>
          <Card
            card={secondCard}
            cardImage={secondCardImage}
            verifier={verifier}
            onToggleCriteria={toggleSecondCardCriteria}
          />
        </Grid>
      )}
    </>
  );
};

export default Comment;
