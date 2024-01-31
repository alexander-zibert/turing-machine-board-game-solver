import PersonIcon from "@mui/icons-material/PersonRounded";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import HashCodeRegistration from "components/HashCodeRegistration";
import ManualRegistration from "components/ManualRegistration";
import PasteRegistration from "components/PasteRegistration";
import { TMInputProvider } from "components/TMInput";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import React, { FC, useState } from "react";
import { registrationActions } from "store/slices/registrationSlice";
import TextField from "../components/TextField";


const Registration: FC = () => {
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);
  const [registrationMethod, setRegistrationMethod] = useState("paste");

  return (
    <Box
      id="registration-section"
      component="section"
      width={480}
      margin="auto"
      mb={2}
    >
      <TextField
        prefixId="registration__name"
        disabled={registration.status !== "new"}
        iconRender={<PersonIcon />}
        withStackRadius
        value={registration.name}
        onChange={(value) => dispatch(registrationActions.updateName(value.toUpperCase()))}
        withReset={registration.status === "new"}
        onReset={() => dispatch(registrationActions.updateName(""))}
      />
      {registration.status === "new" && (
        <Box sx={theme => ({
          px: 2, pt: 1, pb: 0, mb: 0.5,
          background: alpha(theme.palette.primary.main, 0.1),
        })}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Game Setup
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={registrationMethod}
              onChange={(event) =>
                setRegistrationMethod(event.target.value)
              }
            >
              <FormControlLabel value="manual" control={<Radio />} label="Manual" />
              <FormControlLabel value="paste" control={<Radio />} label="Paste" />
              <FormControlLabel value="turing-hash" control={<Radio />} label="Hashcode" />
            </RadioGroup>
          </FormControl>
        </Box>
      )}
      {registrationMethod === "turing-hash" && <HashCodeRegistration />}
      {registrationMethod === "manual" && <TMInputProvider><ManualRegistration /></TMInputProvider>}
      {registrationMethod === "paste" && <PasteRegistration />}
    </Box>
  );
};

export default Registration;
