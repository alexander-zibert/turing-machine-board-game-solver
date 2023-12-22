import Incorrect from "@mui/icons-material/HorizontalRuleRounded";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import ShapeIcon from "components/ShapeIcon";
import SingleCharLabel from "components/SingleCharLabel";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { FC, useCallback, useEffect } from "react";
import { digitCodeActions } from "store/slices/digitCodeSlice";
import { getPossibleCodes } from "../deductions";

const DigitCode: FC = () => {
  const dispatch = useAppDispatch();
  const digitCode = useAppSelector((state) => state.digitCode);
  const theme = useTheme();

  const comments = useAppSelector((state) => state.comments);

  function getPattern(shape: Shape, digit: Digit) {
    switch (shape) {
      case "triangle":
        return digit + "..";
      case "square"  :
        return "." + digit + ".";
      case "circle"  :
        return ".." + digit;
    }
  }

  const dispatchDigitState = useCallback((codes: string[]) => {
    function hasNumbers(codes: string[], shape: Shape, digit: Digit) {
      return codes.filter((code) => new RegExp(getPattern(shape, digit)).test(code)).length > 0;
    }

    ([1, 2, 3, 4, 5] as Digit[]).forEach((digit) => {
      (["triangle", "square", "circle"] as Shape[]).forEach((shape) => {
        dispatch(digitCodeActions.setDigitState({ shape, digit, isValid: hasNumbers(codes, shape, digit) }))
      })
    })
  }, [dispatch]);

  useEffect(() => {
    getPossibleCodes(comments).then((data) => dispatchDigitState(data.codes));
  }, [dispatchDigitState, comments]);

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
                <ShapeIcon shape={shape} />
              </Box>
              {([5, 4, 3, 2, 1] as Digit[]).map((digit) => (
                <Box key={digit} width={1} position="relative">
                  <IconButton
                    disabled={true}
                    id={`digit-code__${shape}-${digit}-button`}
                    aria-label={`${shape} ${digit}`}
                    color="primary"
                    sx={{
                      height: theme.spacing(6),
                      width: theme.spacing(6),
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
