import PersonIcon from "@mui/icons-material/PersonRounded";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "components/TextField";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { FC, useState } from "react";
import { registrationActions } from "store/slices/registrationSlice";
import HashCodeRegistration from "components/HashCodeRegistration";
import ManualRegistration from "components/ManualRegistration";
import { Card } from "@mui/material";
import PasteRegistration from "components/PasteRegistration";

const Registration: FC = () => {
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);
  const [registrationMethod, setRegristationMethod] = useState("paste");
  function changeRegistrationMethod(e: React.ChangeEvent<HTMLInputElement>) {
    setRegristationMethod((e.target as HTMLInputElement).value);
  }

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
        onChange={(value) =>
          dispatch(registrationActions.updateName(value.toUpperCase()))
        }
        withReset={registration.status === "new"}
        onReset={() => dispatch(registrationActions.updateName(""))}
      />
      {registration.status === "new" && (
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Game Setup
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={registrationMethod}
            onChange={changeRegistrationMethod}
          >
            <FormControlLabel
              value="manual"
              control={<Radio />}
              label="Manual"
            />
            <FormControlLabel value="paste" control={<Radio />} label="Paste" />
            <FormControlLabel
              value="turing-hash"
              control={<Radio />}
              label="Hashcode"
            />
          </RadioGroup>
        </FormControl>
      )}
      {registrationMethod === "turing-hash" && <HashCodeRegistration />}
      {registrationMethod === "manual" && registration.status === "new" && (
        <Card>
          <Box m={2}>
            <ManualRegistration />
          </Box>
        </Card>
      )}
      {registrationMethod === "paste" && <PasteRegistration />}
    </Box>
  );
};

export default Registration;
