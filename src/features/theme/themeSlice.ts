import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type themeMode = "light" | "dark";
interface themeState {
    mode: themeMode
}
const getInitialTheme = (): themeMode => {
    const saveMode = localStorage.getItem("themeMode");
    return (saveMode === "light" || saveMode === "dark") ? saveMode : "light"
}
const initialState: themeState = {
    mode: getInitialTheme()
}
export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeMode: (state, { payload }: PayloadAction<themeMode>) => {
            state.mode = payload
            localStorage.setItem("themeMode", payload)
        },
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("themeMode", state.mode)
        }
    }
})
export const { setThemeMode, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer