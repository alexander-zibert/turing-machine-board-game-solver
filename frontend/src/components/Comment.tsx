import Box from "@mui/material/Box";
import { useCriteriaCard } from "hooks/useCriteriaCard";
import { FC } from "react";
import Card from "./Card";
import SingleCharLabel from "./SingleCharLabel";
import Incorrect from "@mui/icons-material/HorizontalRuleRounded";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

type Props = {
  verifier: Verifier;
  noDivider?: boolean;
};

const Comment: FC<Props> = ({ verifier, noDivider }) => {
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
    toggleCriteria: togglesecondCardCriteria,
  } = useCriteriaCard(verifier, 1);

  const theme = useTheme();

  return (
    <Box mb={noDivider ? 0 : 2}>
      <Box position="relative">
        {firstCard && (
          <>
            {!firstCard.nightmare && (
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
            )}
            <Card
              card={firstCard}
              cardImage={firstCardImage}
              onToggleCriteria={toggleFirstCardCriteria}
            />
          </>
        )}
        {secondCard && (
          <Box mt={0.5}>
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
            <Card
              card={secondCard}
              cardImage={secondCardImage}
              onToggleCriteria={togglesecondCardCriteria}
            />
          </Box>
        )}
      </Box>
      {firstCard &&
        firstCard.nightmare &&
        letters?.map((letter) => (
          <Box key={letter.letter} position="relative" display={"inline-block"}>
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
                sx={{ color: theme.palette.text.primary }}
              >
                {letter.isIrrelevant && (
                  <Incorrect
                    fontSize="large"
                    sx={{ transform: "rotate(-45deg)" }}
                  />
                )}
              </Box>
            </IconButton>
          </Box>
        ))}
    </Box>
  );
};

export default Comment;
