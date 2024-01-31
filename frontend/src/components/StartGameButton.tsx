import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";
import InputUIWrapper from "./InputUIWrapper";


const StartGameButton: FC<{disabled: boolean}> = ({disabled}) => {
  return (
    <InputUIWrapper withStackRadius>
      <Button
        aria-label="search"
        disabled={disabled}
        fullWidth
        size="large"
        type="submit"
        sx={(theme) => ({
          fontFamily: "Kalam",
          fontSize: theme.spacing(3),
          height: theme.spacing(6),
          borderRadius: theme.spacing(0, 0, 2, 2),
          "&:hover": {
            background: alpha(theme.palette.primary.main, 0.2),
            borderRadius: theme.spacing(0, 0, 2, 2),
          },
        })}
      >
        Start Game
      </Button>
    </InputUIWrapper>
  );
};

export default StartGameButton;
