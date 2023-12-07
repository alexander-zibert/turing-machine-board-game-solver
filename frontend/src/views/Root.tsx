import ContentIcon from "@mui/icons-material/ContentPasteRounded";
import SearchIcon from "@mui/icons-material/ContentPasteSearchRounded";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import SaveIcon from "@mui/icons-material/SaveRounded";
import CheckIcon from "@mui/icons-material/RuleFolderRounded";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { usePaletteMode } from "hooks/usePaletteMode";
import { FC, useState } from "react";
import { useUpdateEffect } from "react-use";
import { savesActions } from "store/slices/savesSlice";
import Comments from "./Comments";
import DigitCode from "./DigitCode";
import Registration from "./Registration";
import Rounds from "./Rounds";
import Saves from "./Saves";
import { checkDeductions } from "deductions";
import LanguageSelect from "components/LanguageSelect";
import { NewButton } from "components/NewButton";
import { settingsActions } from "store/slices/settingsSlice";
import { alertActions } from "store/slices/alertSlice";
import { useCanBeSaved } from "hooks/useCanBeSaved";
import { PossibleCodes } from "components/PossibleCodes";

const Root: FC = () => {
  const { theme, togglePaletteMode } = usePaletteMode();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const language = useAppSelector((state) => state.settings.language);

  const [savesDialog, setSavesDialog] = useState(false);
  const [hasBadge, setHasBadge] = useState(false);

  useUpdateEffect(() => {
    state.saves.length === 0 && setSavesDialog(false);
  }, [state.saves]);

  const canBeSaved = useCanBeSaved();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        textAlign="center"
        position="relative"
        width={320}
        margin="auto"
        mb={6}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/logo.png"}
          alt="logo"
          style={{ width: 320 }}
        />
        <Box
          position="absolute"
          bottom={theme.spacing(-3)}
          left="50%"
          sx={{
            background: theme.palette.background.paper,
            transform: "translateX(-50%)",
          }}
        >
          <h3
            style={{
              margin: theme.spacing(-0.25, 0, 2),
              transform: "rotate(-2deg)",
            }}
          >
            Interactive Sheet
          </h3>
          <Box display="flex" justifyContent="center" position="relative">
            <IconButton
              aria-label="check"
              disabled={state.registration.status !== "ready"}
              sx={{ position: "relative", color: theme.palette.primary.dark }}
              onClick={() => {
                checkDeductions(state);
              }}
            >
              <ContentIcon />
              <Box
                sx={{
                  background: theme.palette.background.default,
                  width: theme.spacing(2),
                  height: theme.spacing(2),
                  bottom: 8,
                  position: "absolute",
                  right: 8,
                }}
              >
                <CheckIcon
                  fontSize="small"
                  sx={{
                    position: "absolute",
                    right: -4,
                    bottom: -3,
                    fontSize: 18,
                  }}
                />
              </Box>
            </IconButton>
            <Divider
              orientation="vertical"
              sx={{ height: "auto", margin: theme.spacing(0, 1) }}
            />
            <NewButton />
            <IconButton
              aria-label="save"
              color="primary"
              disabled={state.registration.status !== "ready" || !canBeSaved}
              onClick={() => {
                state.registration.hash && setHasBadge(true);

                dispatch(savesActions.save({ ...state, date: Date.now() }));
              }}
              sx={{ position: "relative" }}
            >
              <ContentIcon />
              <Box
                sx={{
                  background: theme.palette.background.default,
                  width: theme.spacing(2),
                  height: theme.spacing(2),
                  bottom: 8,
                  position: "absolute",
                  right: 8,
                }}
              >
                <SaveIcon
                  fontSize="small"
                  sx={{
                    position: "absolute",
                    right: -3,
                    bottom: -3,
                    fontSize: 18,
                  }}
                />
              </Box>
            </IconButton>
            <IconButton
              aria-label="saves"
              disabled={state.saves.length === 0}
              color="primary"
              onClick={() => {
                setHasBadge(false);
                setSavesDialog(!savesDialog);
              }}
            >
              <Badge variant="dot" color="secondary" invisible={!hasBadge}>
                <SearchIcon />
              </Badge>
            </IconButton>
            <Divider
              orientation="vertical"
              sx={{ height: "auto", margin: theme.spacing(0, 1) }}
            />
            <LanguageSelect
              value={language}
              disabled={false}
              prefixId="settings__lang"
              onChange={(value) =>
                dispatch(settingsActions.updateLanguage(value))
              }
            />
            <Divider
              orientation="vertical"
              sx={{ height: "auto", margin: theme.spacing(0, 1, 0, 0) }}
            />
            <IconButton
              aria-label="toggle palette mode"
              onClick={togglePaletteMode}
            >
              {theme.palette.mode === "light" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="github"
              href="https://github.com/alexander-zibert/turing-machine-board-game-solver"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </Box>
          <Collapse in={state.alert.open}>
            <Alert
              severity={state.alert.level}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => dispatch(alertActions.closeAlert())}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {state.alert.message}
            </Alert>
          </Collapse>
        </Box>
      </Box>
      <Registration />
      <Container sx={{ maxWidth: isUpMd ? 704 : undefined }}>
        <Collapse in={state.registration.status === "ready"}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item lg={3} md={6} xs={12}>
              <Rounds />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              {isUpLg ? <Comments /> : <DigitCode />}
            </Grid>
            <Grid item lg={3} xs={12}>
              {isUpLg ? <DigitCode /> : <Comments />}
              <PossibleCodes />
            </Grid>
          </Grid>
        </Collapse>
      </Container>
      <Saves
        isOpen={savesDialog}
        onClose={() => {
          setSavesDialog(false);
        }}
        onLoad={() => {
          setSavesDialog(false);
        }}
      />
    </ThemeProvider>
  );
};

export default Root;
