import PasteIcon from "@mui/icons-material/ContentPasteGoRounded";
import HashIcon from "@mui/icons-material/NumbersRounded";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TextField from "components/TextField";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { parse as parseProblemBook } from "parsing/problem-book";
import { parse as parseTuringInfo } from "parsing/turing-copy-paste";
import { FC, useState } from "react";
import { commentsActions } from "store/slices/commentsSlice";
import { digitCodeActions } from "store/slices/digitCodeSlice";
import { registrationActions } from "store/slices/registrationSlice";
import { roundsActions } from "store/slices/roundsSlice";
import StartGameButton from "./StartGameButton";


const PasteRegistration: FC = () => {
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);
  const [cardText, setCardText] = useState("");
  const [showNotFound, setShowNotFound] = useState(false);

  function onSubmit() {
    const problem = parseTuringInfo(cardText) || parseProblemBook(cardText);
    console.log(problem);
    if ( problem === null ) {
      setShowNotFound(true);
      return;
    }
    dispatch(registrationActions.updateHash(problem.code.toUpperCase()));
    dispatch(roundsActions.reset());
    dispatch(commentsActions.reset());
    dispatch(digitCodeActions.reset());
    dispatch(registrationActions.fetchDone());
    dispatch(commentsActions.setCards(problem));
  }

  if ( registration.status !== "new" ) {
    return (
      <TextField
        prefixId="paste-registration__hash"
        disabled={true}
        icon={<HashIcon />}
        value={registration.hash}
        maxChars={10}
        withStackRadius
      />
    );
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{horizontal: "center", vertical: "bottom"}}
        open={showNotFound}
        onClose={() => setShowNotFound(false)}
      >
        <Alert
          onClose={() => setShowNotFound(false)}
          severity="error"
          sx={{width: "100%"}}
          variant="filled"
        >
          Could not parse the game setup. Did you copy&paste the whole setup
          from <a href="https://turingmachine.info/">turingmachine.info</a> or
          the{" "}
          <a href="https://boardgamegeek.com/filepage/251409/book-8500-problems-offline-or-analog-use">
            problem book
          </a>
          ?
        </Alert>
      </Snackbar>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Box pt={0.5} pb={1}>
          <Alert severity="info">
            You can paste a game setup string in the following text box. Supported
            methods are: <br />
            1. You can copy a generated game from{" "}
            <a href="https://turingmachine.info/">turingmachine.info</a>. The
            copied text needs to include the "#" and all the cards and verifiers.
            <br />
            2. You can copy from the{" "}
            <a href="https://boardgamegeek.com/filepage/251409/book-8500-problems-offline-or-analog-use">
              problem book
            </a>
            . Be sure to include the whole problem line.
          </Alert>
        </Box>
        <TextField
          icon={<PasteIcon />}
          value={cardText}
          onChange={(value) => setCardText(value)}
          withReset={true}
          onReset={() => setCardText("")}
        />
        <StartGameButton disabled={cardText === ""} />
      </form>
    </>
  );
};

export default PasteRegistration;
