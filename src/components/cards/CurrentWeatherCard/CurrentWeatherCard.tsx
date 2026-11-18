import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import PlaceIcon from '@mui/icons-material/Place';
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import { fetchWeather } from "../../../features/weatherApi/weatherSlice";
import { useEffect } from "react";
import { formatFullDate, getDayName } from "../../../utils/ConvertDate";
import { getWeatherIcon } from "../../../utils/WeatherIconMapper";

function CurrentWeatherCard() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const { current, selectedDay, error, loading } = useAppSelector((state) => state.weather)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchWeather({ city: 'San Francisco', lang: currentLang }));
    }, [dispatch, currentLang]);
    if (loading) {

        // use skeleton before content loaded
        return (
            <Paper
                elevation={isDark ? 0 : 1}
                sx={{
                    padding: { xs: "20px 14px", lg: "20px 24px" },
                    borderRadius: "24px",
                    backgroundColor: "background.paper",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "234px",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, width: "50%" }}>
                    <Skeleton variant="rounded" width={140} height={36} sx={{ borderRadius: "16px" }} />
                    <Skeleton variant="text" width={120} height={42} />
                    <Skeleton variant="text" width={160} height={20} />
                    <Skeleton variant="text" width={100} height={48} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <Skeleton variant="circular" width={85} height={85} />
                    <Skeleton variant="text" width={90} height={36} />
                    <Skeleton variant="text" width={130} height={22} />
                </Box>
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper sx={{ p: 4, borderRadius: "24px", textAlign: "center", color: "error.main" }}>
                {error}
            </Paper>
        );
    }

    if (!current) return null;


    // check chosing a card from forecast
    const activeData = selectedDay
        ? {
            cityName: current.name,
            dt: selectedDay.dt,
            temp: selectedDay.main.temp,
            high: selectedDay.main.temp_max,
            low: selectedDay.main.temp_min,
            feelsLike: selectedDay.main.feels_like,
            mainCondition: selectedDay.weather[0]?.main,
            description: selectedDay.weather[0]?.description,
        }
        : {
            cityName: current.name,
            dt: current.dt,
            temp: current.main.temp,
            high: current.main.temp_max,
            low: current.main.temp_min,
            feelsLike: current.main.feels_like,
            mainCondition: current.weather[0]?.main,
            description: current.weather[0]?.description,
        };

    const locale = currentLang === "fa" ? "fa-IR" : "en-US";
    return (
        <Paper
            elevation={isDark ? 0 : 1}
            sx={{
                padding: { xs: "20px 14px", lg: "20px 24px" },
                borderRadius: "24px",
                backgroundColor: "background.paper",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                position: "relative",
                overflow: "hidden",
                maxHeight: "234px",
            }}
        >
            {/* town location */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, zIndex: 1 }}>
                <Chip
                    icon={<PlaceIcon fontSize="small" sx={{ color: "#3D4852 !important" }} />}
                    label={activeData.cityName}
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === "dark" ? "#CDD9E0" : "rgba(0, 0, 0, 0.06)",
                        color: "#3D4852",
                        fontWeight: 500,
                        fontSize: { xs: "12px", lg: "16px" },
                        width: "fit-content",
                        gap: "3px",
                        borderRadius: "16px",
                        padding: { xs: "10.5px 15px 10.5px 3px", lg: "10.5px 25px 10.5px 5px" },
                        "span.MuiChip-label": {
                            padding: 0
                        },
                        "svg.MuiSvgIcon-root": {
                            margin: 0
                        }

                    }}
                />

                {/* date */}
                <Box
                    sx={{
                        color: "text.primary"
                    }}>
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        fontSize: { xs: "26px", lg: "32px" }
                    }}>
                        {getDayName(activeData.dt, locale)}
                    </Typography>
                    <Typography variant="body2" sx={{
                        fontSize: { xs: "12px", lg: "14px" },
                        mt: .8
                    }}>
                        {formatFullDate(activeData.dt, locale)}
                    </Typography>
                </Box>

                {/* tempreture*/}
                <Box sx={{
                    color: "text.primary"
                }}>
                    <Typography
                        variant="h5"
                        component="span"
                        dir="ltr"
                        sx={{ fontWeight: 700, fontSize: { xs: "30px", lg: "40px" } }}
                    >
                        {Math.round(activeData.temp)}° C
                    </Typography>
                    <Typography variant="body2" sx={{
                        fontSize: { xs: "12px", lg: "14px" }
                    }}>
                        {t("currentWeather.high")}: <Box component={"span"} dir="ltr">{Math.round(activeData.high)}</Box> {t("currentWeather.low")}: <Box component={"span"} dir="ltr">{Math.round(activeData.low)}</Box>
                    </Typography>
                </Box>
            </Box>

            {/* weather image and situation */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    zIndex: 1,
                    color: "text.primary",
                }}
            >
                <Box
                    component="img"
                    loading="lazy"
                    src={getWeatherIcon(activeData.mainCondition)}
                    alt={activeData.description}
                    sx={{
                        width: "155px",
                        height: "115px",
                        filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.15))",
                        mb: 1,
                        scale: { xs: .7, lg: 1 }
                    }}
                />
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: { xs: "26px", lg: "34px" }
                    }}
                >
                    {t(`weatherConditions.${activeData.mainCondition?.toLowerCase()}`, {
                        defaultValue: activeData.description,
                    })}
                </Typography>
                <Typography variant="body1" sx={{
                    fontSize: { xs: "14px", lg: "16px" },
                    mt: 1
                }}>
                    <Box component={"span"} dir="ltr">{Math.round(activeData.feelsLike)}</Box>
                    &nbsp;
                    {t("currentWeather.feelsLike")}
                </Typography>
            </Box>
        </Paper>
    );
}

export default CurrentWeatherCard;