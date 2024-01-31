import Clear from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import { FC, ReactNode } from "react";


type Props = {
  customFontSize?: string;
  customRadius?: string;
  disabled?: boolean;
  icon?: ReactNode;
  prefixId?: string;
  maxChars?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onReset?: () => void;
  type?: "text" | "number";
  value?: Nullable<number | string>;
  withReset?: boolean;
  withStackRadius?: boolean;
  min?: number;
  max?: number;
};

const TextField: FC<Props> = (props) => {
  const theme = useTheme();

  const sxIconDefaults = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: theme.spacing(6),
    width: theme.spacing(6),
    top: 0,
    color: theme.palette.primary.main,
  };

  return (
    <Box
      position="relative"
      sx={
        props.withStackRadius
          ? {
            "&:not(:last-child)": {
              mb: 0.5,
            },
            "&:first-of-type": {
              input: {
                borderRadius: theme.spacing(2, 2, 0, 0),
              },
            },
            "&:last-child": {
              input: {
                borderRadius: theme.spacing(0, 0, 2, 2),
              },
            },
          }
          : null
      }
    >
      {props.icon && (
        <Box id={"TextField-StartAdornment"} sx={{...sxIconDefaults, left: 0, }}>
          {props.icon}
        </Box>
      )}
      <input
        id={`${props.prefixId}-text-field`}
        type={props.type || "text"}
        min={props.min || 1}
        max={props.max || 5}
        maxLength={props.maxChars}
        disabled={props.disabled}
        value={props.value === null ? "" : props.value}
        onChange={(event) => {
          props.onChange && props.onChange(event.target.value);
        }}
        onBlur={() => {
          props.onBlur && props.onBlur();
        }}
        style={{
          ...theme.typography.body1,
          background: alpha(theme.palette.primary.main, 0.1),
          border: "none",
          borderRadius: props.customRadius,
          color: theme.palette.text.primary,
          height: theme.spacing(6),
          paddingLeft: props.icon ? theme.spacing(6) : undefined,
          paddingRight: props.withReset ? theme.spacing(6) : undefined,
          textAlign: props.icon ? undefined : "center",
          fontSize: props.customFontSize || theme.spacing(3),
          width: "100%",
        }}
      />
      {props.value !== undefined && props.withReset && (
        <Box id={"TextField-EndAdornment"} sx={{...sxIconDefaults, right: 0}}>
          <IconButton
            id={`${props.prefixId}-text-field__clear-button`}
            color="primary"
            onClick={props.onReset}
          >
            <Clear />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default TextField;
