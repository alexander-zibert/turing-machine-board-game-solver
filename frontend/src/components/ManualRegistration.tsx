import HashIcon from "@mui/icons-material/NumbersRounded";
import Box from "@mui/material/Box";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import React, { FC, useContext } from "react";
import { commentsActions } from "store/slices/commentsSlice";
import { digitCodeActions } from "store/slices/digitCodeSlice";
import { registrationActions } from "store/slices/registrationSlice";
import { roundsActions } from "store/slices/roundsSlice";
import StartGameButton from "./StartGameButton";
import TextField from "./TextField";
import TMInput, { TMInputContext } from "./TMInput";


const ManualRegistration: FC = () => {
  const registration = useAppSelector((state) => state.registration);
  const dispatch = useAppDispatch();

  const {isValid, hash, ind, fake, crypt, color, mode} = useContext(TMInputContext);

  function onSubmit() {
    console.log(hash, ind, fake, crypt, color, mode);

    dispatch(registrationActions.updateHash(hash));
    dispatch(roundsActions.reset());
    dispatch(commentsActions.reset());
    dispatch(digitCodeActions.reset());
    dispatch(registrationActions.fetchDone());
    dispatch(commentsActions.setCards({
        ind,
        fake,
        crypt,
        color,
        m: mode,
      }),
    );
  }

  if ( registration.status !== "new" ) {
    return (
      <TextField
        prefixId="manual-registration__hash"
        disabled={true}
        iconRender={<HashIcon />}
        value={registration.hash}
        maxChars={10}
        withStackRadius
      />
    );
  } else {
    return (
      <Box id={"manual-registration"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <TMInput />
          <StartGameButton disabled={!isValid} />
        </form>
      </Box>
    );
  }
};

export default ManualRegistration;
