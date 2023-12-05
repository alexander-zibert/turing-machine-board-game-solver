import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Comment from "components/Comment";
import { FC } from "react";

const Comments: FC = () => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Paper
      component="section"
      sx={{width: isUpMd ? 656 : 320, margin: theme.spacing(0, "auto", 2)}}
    >
      <Box p={2} mb={2}>
        <Grid container spacing={2}>
          {(["A", "B", "C", "D", "E", "F"] as Verifier[]).map((verifier) => (
            <Comment
              key={verifier}
              verifier={verifier}
            />
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default Comments;
