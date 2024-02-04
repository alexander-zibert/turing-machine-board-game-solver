import Clear from "@mui/icons-material/CloseRounded";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { FC, ReactElement, ReactNode } from "react";


/**
 * Start `InputAdornment` for this component.
 */
interface ComponentWrapperProps {
    prefixId?: string;
    icon?: ReactElement | string;
    resetIcon?: ReactElement;
    onReset?: React.EventHandler<any>;
    withStackRadius?: boolean;
    sx?: {};
    iconSx?: {};
    children: ReactNode;
}

const InputUIWrapper: FC<ComponentWrapperProps> = (props) => {
    const theme = useTheme();

    const adornmentSx = {
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
        <Box id={"UICW"}
             sx={{
                 position: "relative",
                 minHeight: theme.spacing(6),
                 mb: 0.5,
                 background: alpha(theme.palette.primary.main, 0.1),
                 ...(props.withStackRadius &&
                     {
                         "&#UICW:not(:last-child)": {
                             mb: 0.5,
                         },
                         "&#UICW:first-of-type": {
                            borderRadius: theme.spacing(2, 2, 0, 0),
                         },
                         "&#UICW:last-child": {
                             mt: 0.5,
                             borderRadius: theme.spacing(0, 0, 2, 2),
                         },
                     }),
                 ...props.sx,
             }}
        >
            {props.icon && (
                <Box id={"TMInput-StartAdornment"}
                    sx={{
                        ...adornmentSx,
                        left: 0,
                        ...props.iconSx,
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "x-large",
                    }}
                >
                    {props.icon}
                </Box>
            )}
            <Box
                sx={{
                    paddingLeft: (props.icon ? 6 : undefined),
                    paddingRight: (props.onReset ? 6 : undefined),
                    display: "flex"
                }}
            >
                {props.children}
            </Box>
            {props.onReset && (
                <Box id={"TMInput-EndAdornment"}
                    sx={{
                        ...adornmentSx,
                        right: 0,
                    }}
                >
                    <IconButton
                        id={`${props.prefixId}-text-field__clear-button`}
                        onClick={props.onReset}
                    >
                        {props.resetIcon ??
                            <Clear
                                sx={{
                                    color: theme.palette.primary.main,
                                }}
                            />
                        }
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default InputUIWrapper;
