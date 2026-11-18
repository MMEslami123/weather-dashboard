import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SettingMenu from "../settingMenu/SettingMenu";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { useEffect, useState } from "react";
import { clearSearchResults, fetchWeather, searchCities, type CityOption } from "../../features/weatherApi/weatherSlice";
import { CircularProgress } from "@mui/material";

function NavBar() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language as "fa" | "en";
    const { searchResults, searchLoading } = useAppSelector((state) => state.weather);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");

    useEffect(() => {
        console.log("query:", query);
        if (query.trim().length < 2) {
            dispatch(clearSearchResults());
            return;
        }
        let request: { abort: () => void } | undefined;
        const timer = setTimeout(() => {
            request = dispatch(searchCities({ query: query.trim(), lang: currentLang }));
        }, 400);
        return () => {
            clearTimeout(timer);
            request?.abort();
        };
    }, [query, currentLang, dispatch]);

    const handleCitySelect = (_e: unknown, option: CityOption | string | null) => {
        if (!option) return;

        if (typeof option === "string") {
            if (option.trim())
                dispatch(fetchWeather({ city: option.trim(), lang: currentLang }));
            return
        }
        dispatch(fetchWeather({ lat: option.lat, lon: option.lon, lang: currentLang }));
    };
    return (
        <Box>
            <AppBar
                position="relative"
                color="transparent"
                sx={{
                    backgroundColor: "background.default",
                    boxShadow: (theme) => theme.shadows[1],

                }}>
                <Toolbar sx={{
                    p: "20px 24px",
                    justifyContent: { xs: "center", sm: "space-between" },
                    gap: "20px"
                }}>

                    {/*weather logo & title */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}>
                        <Box component={"img"} loading="lazy" src="/src/assets/images/logo.svg" />
                        <Typography
                            component={"div"}
                            sx={{
                                color: "text.primary",
                                fontSize: "12px",
                                display: { xs: "none", sm: "block" }
                            }}>{t("header.title")}</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px"
                    }}>
                        
                        {/* search Box for cities */}
                        <Autocomplete
                            freeSolo
                            options={searchResults}
                            loading={searchLoading}
                            onInputChange={(_e, value, reason) => {
                                if (reason === "input") setQuery(value);
                                else if (reason === "clear") setQuery("");
                            }}
                            onChange={handleCitySelect}
                            getOptionKey={(o) => (typeof o === "string" ? o : `${o.lat},${o.lon}`)}
                            getOptionLabel={(option) => {
                                if (typeof option === "string") return option;
                                const name = option.local_names?.[currentLang] || option.name;
                                return [name, option.state, option.country].filter(Boolean).join("، ");
                            }}
                            filterOptions={(x) => x}
                            sx={{
                                width: { xs: 200, sm: 295 },
                                "& .MuiSvgIcon-root": {
                                    color: "#757575"
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label={t("header.searchPlaceholder", {
                                        defaultValue: "مکان مورد نظر را جستجو کنید",
                                    })}
                                    slotProps={{
                                        ...params.slotProps,
                                        input: {
                                            ...params.slotProps.input,
                                            endAdornment: (
                                                <>
                                                    {searchLoading ? <CircularProgress color="inherit" size={18} /> : null}
                                                    {params.slotProps.input.endAdornment}
                                                </>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />
                        <SettingMenu />

                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default NavBar;