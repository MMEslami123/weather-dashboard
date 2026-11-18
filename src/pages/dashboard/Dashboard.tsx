import NavBar from "../../components/navBar/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CurrentWeatherCard from "../../components/cards/CurrentWeatherCard/CurrentWeatherCard";
import AverageTemperatureCard from "../../components/cards/AverageTemperatureCard/AverageTemperatureCard";
import Stack from "@mui/material/Stack";
import TwoWeeksForecast from "../../components/TwoWeeksForecast/TwoWeeksForecast";
import Footer from "../../components/footer/Footer";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide, { type SlideProps } from "@mui/material/Slide";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";

const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="down" />
}
const Dashboard = () => {
    const { t } = useTranslation();
    const username = localStorage.getItem("name");
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(() => {
        const shouldShowWelcome = sessionStorage.getItem("showWelcome");
        return Boolean(username && shouldShowWelcome === "true");
    });

    useEffect(() => {
        if (openSnackbar) {
            sessionStorage.removeItem("showWelcome");
        }
    }, [openSnackbar]);
    const handleCloseSnackbar = (
        _event?: React.SyntheticEvent | Event | null,
        reason?: string
    ) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
            }}>

            {/* welocme message when you login to dashboard */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                slots={{ transition: SlideTransition }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant={isDark ? "filled" : "outlined"}
                    sx={{
                        width: "100%",
                        borderRadius: 2,
                        boxShadow: 3,
                        color: isDark ? "white" : "green"
                    }}
                >
                    {t("dashboard.welcomeMessage", { name: username })}
                </Alert>
            </Snackbar>

            <NavBar />
            <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "background.default" }}>
                <Grid container spacing={{ xs: 3, lg: 5 }}>

                    <Grid size={{ xs: 12, md: 4 }} >
                        <CurrentWeatherCard />
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <AverageTemperatureCard />
                    </Grid>

                </Grid>
                <Stack>
                    <TwoWeeksForecast />
                </Stack>
            </Box>
            <Footer />
        </Box>

    );
}

export default Dashboard;