import Incorrect from "@mui/icons-material/HorizontalRuleRounded";
import Correct from "@mui/icons-material/PanoramaFishEye";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import ShapeIcon from "components/ShapeIcon";
import SingleCharLabel from "components/SingleCharLabel";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { FC } from "react";
import { digitCodeActions } from "store/slices/digitCodeSlice";

const DigitCode: FC = () => {
  const dispatch = useAppDispatch();
  const digitCode = useAppSelector((state) => state.digitCode);
  const theme = useTheme();

  return (
    <Paper
      component="section"
      id="digit-code-section"
      sx={{ width: 320, margin: "auto" }}
    >
      <Box p={2}>
        <Grid container>
          {(["triangle", "square", "circle"] as Shape[]).map((shape) => (
            <Grid key={shape} item xs={4} sx={{ textAlign: "center" }}>
              <Box
                width={1}
                mb={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <ShapeIcon shape={shape as "triangle" | "square" | "circle"} />
              </Box>
              {([5, 4, 3, 2, 1] as Digit[]).map((digit) => (
                <Box key={digit} width={1} position="relative">
                  <IconButton
                    id={`digit-code__${shape}-${digit}-button`}
                    aria-label={`${shape} ${digit}`}
                    color="primary"
                    sx={{
                      height: theme.spacing(6),
                      width: theme.spacing(6),
                    }}
                    onClick={() => {
                      dispatch(
                        digitCodeActions.toggleDigitState({
                          shape,
                          digit,
                        })
                      );
                    }}
                  >
                    <SingleCharLabel>{digit}</SingleCharLabel>
                    <Box
                      position="absolute"
                      top={4}
                      left={4}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {digitCode.find(
                        (entry) =>
                          entry.shape === shape && entry.digit === digit
                      )?.state === "correct" && <Correct fontSize="large" />}
                      {digitCode.find(
                        (entry) =>
                          entry.shape === shape && entry.digit === digit
                      )?.state === "incorrect" && (
                        <Incorrect
                          fontSize="large"
                          sx={{ transform: "rotate(-45deg)" }}
                        />
                      )}
                    </Box>
                  </IconButton>
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default DigitCode;
