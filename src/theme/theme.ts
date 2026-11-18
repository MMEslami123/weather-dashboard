import { createTheme, type Shadows } from "@mui/material/styles";
export const getDesignTheme = (mode: "light" | "dark", direction: "rtl" | "ltr") => {

    return createTheme({
        direction,
        palette: {
            mode,
            primary: {
                main: "#2196F3",
            },
            background: {
                default: mode === "dark" ? "#151D32" : "#F3FAFE",
                paper: mode === "dark" ? "#292F45" : "#E1E9EE"
            },
            text: {
                primary: mode === "dark" ? "#F3F4F7" : "#003464"
            },
        },
        typography: {
            fontFamily: direction === "rtl" ? "iranYekan, sans-serif" : "Roboto, sans-serif",
        },
        shadows: ["none", mode === "dark" ? " 0px 4px 10px 0px #A6A5A526" : "0px 4px 10px 0px #00000026",
            ...Array(23).fill("none")
        ] as Shadows,
    })
}