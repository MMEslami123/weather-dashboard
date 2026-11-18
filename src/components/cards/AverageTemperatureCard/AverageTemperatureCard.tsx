import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { LineChart } from "@mui/x-charts/LineChart";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../hooks/ReduxHooks";
function AverageTemperatureCard() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language.startsWith("fa");
    const months = Array.from({ length: 12 }, (_, i) => t(`months.m${i + 1}`));
    const temperatures = [15, 18, 27, 28, 19, 25, 36, 30, 37, 26, 31, 35];
    const { loading } = useAppSelector((state) => state.weather);
    return (
        <Paper
            elevation={0}
            sx={{
                padding: "16px 16px 6px",
                borderRadius: "24px",
                backgroundColor: "background.paper",
                maxHeight: "234px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
            }}
        >
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4CDFE8" />
                        <stop offset="100%" stopColor="#7947F7" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4CDFE8" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#7947F7" stopOpacity="0.05" />
                    </linearGradient>
                </defs>
            </svg>

            {/* title*/}

            <Typography variant="h6" sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: "10px",
                fontSize: { xs: "16px", sm: "20px" }
            }}
            >
                {t("chart.title")}
            </Typography>

            {/* LineChart */}

            {loading ? (
                <Box sx={{ width: "100%", height: 170, display: "flex", flexDirection: "column", justifyContent: "space-between", pb: "6px" }}>

                    {/* use Skeleton before loading content*/}
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={120}
                        sx={{
                            borderRadius: "12px",
                            bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"
                        }}
                    />

                    {/* skeleton for months*/}
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 10 }}>
                        {[...Array(12)].map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="text"
                                width={30}
                                height={16}
                                sx={{
                                    bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box sx={{ width: "100%" }}>
                    <LineChart
                        xAxis={[{
                            data: months,
                            reverse: isRtl,
                            scaleType: "point",
                            disableLine: true,
                            disableTicks: true,
                            tickLabelStyle: {
                                transform: "translateY(15px)",
                                fontSize: "10px",

                            }
                        }]}
                        yAxis={[{
                            min: 10,
                            max: 40,
                            position: isRtl ? "right" : "left",
                            tickInterval: [10, 20, 30, 40],
                            tickLabelStyle: {
                                transform: isRtl ? "translateX(18px)" : "translateX(-18px)",
                                fontSize: "10px",
                            },
                            valueFormatter: (value: string) => `${value}°c`,
                            disableLine: true,
                            disableTicks: true,
                        }]}
                        series={[
                            {
                                data: temperatures,
                                color: "url(#tempGradient)",
                                showMark: false,
                                area: true,
                                curve: "linear"
                            },
                        ]}
                        height={170}
                        grid={{ horizontal: true }}
                        sx={{
                            "& .MuiChartsAxis-line": { stroke: "transparent" },
                            "& .MuiChartsGrid-line": {
                                strokeDasharray: "4 4",
                                stroke: "#AFBCC4",
                                strokeWidth: 1,
                            },
                            "& path[fill='url(#tempGradient)']": {
                                fill: "url(#areaGradient) !important",
                            },
                        }}
                    />
                </Box>
            )}
        </Paper>
    );
}

export default AverageTemperatureCard;