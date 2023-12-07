import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { alpha } from "@mui/material/styles";
import TextField from "components/TextField";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { FC, useState } from "react";
import { commentsActions } from "store/slices/commentsSlice";
import { digitCodeActions } from "store/slices/digitCodeSlice";
import { registrationActions } from "store/slices/registrationSlice";
import { roundsActions } from "store/slices/roundsSlice";

function correctCards(cards: number[]) {
  return (
    cards.length === cards.filter((card) => card >= 1 && card <= 48).length
  );
}

function cardsAreUnique(cards: number[]) {
  const uniqueCards = new Set(cards);
  if (uniqueCards.size !== cards.length) {
    return false;
  }
  return true;
}

function cardsAreSorted(cards: number[]) {
  const sortedCards = [...cards];
  sortedCards.sort((a, b) => a - b);
  for (let i = 0; i < cards.length; i += 1) {
    if (sortedCards[i] !== cards[i]) {
      return false;
    }
  }
  return true;
}

function parseCards(cardText: string) {
  return cardText
    .replaceAll(/[^0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter((s) => s.length > 0)
    .map((s) => Number(s));
}

function validateCards(cards: number[]) {
  if (cards.length === 0) {
    return [];
  }
  const errors = [];
  if (!cardsAreSorted(cards)) {
    errors.push("The cards are not sorted ascending.");
  }
  if (!cardsAreUnique(cards)) {
    errors.push("There are duplicate cards.");
  }
  if (cards.length < 4) {
    errors.push("There are less than four cards.");
  }
  if (cards.length > 6) {
    errors.push("There are more than six cards.");
  }
  if (!correctCards(cards)) {
    errors.push("There are invalid cards.");
  }
  return errors;
}

const ManualRegistration: FC = () => {
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);
  const [mode, setMode] = useState(0);
  const [cardText, setCardText] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  function validateCardText(cardText: string) {
    const cards = parseCards(cardText);
    const errors = validateCards(cards);
    setErrors(errors);
  }

  function onSubmit() {
    const cards = parseCards(cardText);

    console.log(cards);
    dispatch(roundsActions.reset());
    dispatch(commentsActions.reset());
    dispatch(digitCodeActions.reset());
    dispatch(registrationActions.fetchDone());
    dispatch(
      commentsActions.setCards({
        ind: cards,
        crypt: [1, 2, 3, 4, 5, 6],
        color: 0,
        m: mode,
      })
    );
  }

  if (registration.status !== "new") {
    return <></>;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Choose Mode
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={mode}
            onChange={(e) => setMode(Number(e.target.value))}
          >
            <FormControlLabel value={0} control={<Radio />} label="Classic" />
            <FormControlLabel value={2} control={<Radio />} label="Nightmare" />
          </RadioGroup>
        </FormControl>
        <Typography>Enter Cards</Typography>
        <TextField
          iconRender={<div />}
          value={cardText}
          onChange={(value) => {
            setCardText(value);
            validateCardText(value);
          }}
          withReset={true}
          onReset={() => {
            setCardText("");
            setErrors([]);
          }}
        />
        {errors.length > 0 &&
          errors.map((error) => <div key={error}>{error}</div>)}

        <Box pt={0.5}>
          <Button
            aria-label="search"
            disabled={cardText === "" || errors.length > 0}
            fullWidth
            size="large"
            type="submit"
            sx={(theme) => ({
              background: alpha(theme.palette.primary.main, 0.1),
              borderRadius: theme.spacing(0, 0, 2, 2),
              fontFamily: "Kalam",
              fontSize: 24,
              height: theme.spacing(6),
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.2),
              },
            })}
          >
            Start Game
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ManualRegistration;
