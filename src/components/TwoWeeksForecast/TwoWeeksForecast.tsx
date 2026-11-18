import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { selectDay } from "../../features/weatherApi/weatherSlice";
import { getWeatherIcon } from "../../utils/WeatherIconMapper";
import { getDayName } from "../../utils/ConvertDate";


function TwoWeeksForecast() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const { t, i18n } = useTranslation();
    const locale = i18n.language === "fa" ? "fa-IR" : "en-US";
    const { current, daily, selectedDay, loading } = useAppSelector((state) => state.weather)
    const dispatch = useAppDispatch();

    return (
        <Paper
            elevation={isDark ? 0 : 1}
            sx={{
                padding: "24px 28px",
                borderRadius: "24px",
                backgroundColor: "background.paper",
                mt: "28px",
            }}
        >
            {/* title */}
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "24px", color: "text.primary", mb: 3 }}>
                {t("forecast.title")}
            </Typography>

            {/* cards container */}
            <Box
                sx={{
                    display: "flex",
                    gap: "18px",
                    overflowX: "auto",
                    pb: 1,
                    "&::-webkit-scrollbar": {
                        height: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                        borderRadius: "4px",
                    },
                }}
            >
                {loading ? (

                    // skeleton before content loaded
                    Array.from({ length: 6 }).map((_, idx) => (
                        <Skeleton
                            key={idx}
                            variant="rounded"
                            width={105}
                            height={240}
                            sx={{ borderRadius: "24px", flexShrink: 0 }}
                        />
                    ))
                ) : (
                    <>
                        {/* content */}
                        {current && (

                            // today 
                            <Box
                                onClick={() => dispatch(selectDay(null))}
                                sx={{
                                    backgroundColor: (theme) => theme.palette.mode === "dark" ? "#3F4861" : "#CDD9E0",
                                    borderRadius: "24px",
                                    width: "104px",
                                    cursor: "pointer",
                                    border: selectedDay === null ? "2px solid #2196F3" : "2px solid transparent",
                                    "&:hover .content-wrapper": {
                                        transform: "translateY(-20px)",
                                    },
                                }}
                            >
                                <Box
                                    className="content-wrapper"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "45.5px 18px",
                                        gap: "34px",
                                        height: "100%",
                                        transition: "transform 0.3s ease",
                                    }}
                                >
                                    <Typography variant="body2" sx={{
                                        fontWeight: 500,
                                        color: "text.primary",
                                        padding: "9.5px",
                                        paddingTop: "0px",
                                        borderBottom: "2px solid",
                                        borderImage: "linear-gradient(90deg, transparent 0%, #7E7E7E 50%, transparent 100%) 1"

                                    }}>
                                        {t("forecast.today")}
                                    </Typography>

                                    <Box
                                        component="img"
                                        loading="lazy"
                                        src={getWeatherIcon(current.weather[0]?.main)}
                                        alt="today"
                                        sx={{
                                            width: "69px",
                                            height: "auto",
                                        }}
                                    />

                                    <Typography variant="body1" dir="ltr" sx={{ fontWeight: 500, color: "text.primary", fontSize: "18px" }}>
                                        {Math.round(current.main.temp)}° C
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* next 5 days */}
                        {daily
                            .filter((item) => {
                                if (!current) return true;
                                const itemDate = new Date(item.dt * 1000).toDateString();
                                const currentDate = new Date(current.dt * 1000).toDateString();
                                return itemDate !== currentDate;
                            })
                            .map((item) => {
                                const isSelected = selectedDay?.dt === item.dt;
                                return (
                                    <Box
                                        key={item.dt}
                                        onClick={() => dispatch(selectDay(item))}
                                        sx={{
                                            backgroundColor: (theme) => theme.palette.mode === "dark" ? "#3F4861" : "#CDD9E0",
                                            borderRadius: "24px",
                                            width: "104px",
                                            cursor: "pointer",
                                            border: isSelected ? "2px solid #2196F3" : "2px solid transparent",
                                            "&:hover .content-wrapper": { transform: "translateY(-20px)" },
                                        }}
                                    >
                                        <Box
                                            className="content-wrapper"
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: "45.5px 18px",
                                                gap: "34px",
                                                height: "100%",
                                                transition: "transform 0.3s ease",
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 500,
                                                    color: "text.primary",
                                                    padding: "9.5px",
                                                    paddingTop: "0px",
                                                    borderBottom: "2px solid",
                                                    borderImage: "linear-gradient(90deg, transparent 0%, #7E7E7E 50%, transparent 100%) 1",
                                                }}
                                            >
                                                {getDayName(item.dt, locale)}
                                            </Typography>
                                            <Box
                                                component="img"
                                                loading="lazy"
                                                src={getWeatherIcon(item.weather[0]?.main)}
                                                alt={item.weather[0]?.description}
                                                sx={{ width: "69px", height: "auto" }}
                                            />
                                            <Typography variant="body1" dir="ltr" sx={{ fontWeight: 500, color: "text.primary", fontSize: "18px" }}>
                                                {Math.round(item.main.temp)}° C
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </>
                )}
            </Box>
        </Paper>
    );
}

export default TwoWeeksForecast;