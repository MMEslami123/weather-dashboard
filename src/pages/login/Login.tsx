import "./Login.css"
import cloudy from "../../assets/images/Moon cloud fast wind.svg";
import sunny from "../../assets/images/Sun cloud angled rain.svg";
import rainy from "../../assets/images/Moon cloud mid rain.svg";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { useState } from "react";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

function Login() {
    const mode = useAppSelector((state) => state.theme.mode);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newLang = event.target.value;
        if (newLang !== null && newLang !== i18n.language) {
            i18n.changeLanguage(newLang);

        }
    };
    const submitHandler = () => {
        localStorage.setItem("name", username);
        sessionStorage.setItem("showWelcome", "true");
        navigate("/dashboard");
    }
    return (
        <Box data-theme={mode} className="login-container">

            <Box className="login-page">

                <Box
                    className="login-form-section"
                    sx={{
                        width: { xs: "100%", sm: "50%", md: '53%' },
                    }}
                >

                    <Box
                        component="form"
                        className="login-form"
                        sx={{
                            padding: { sm: "102px 30px", md: "102px 60px" },
                        }}
                    >
                        <Stack spacing={3} className="login-form-top">

                            <Typography component={"div"} variant="subtitle1" sx={{ fontWeight: 700, fontSize: "26px" }
                            }>
                                {t("login.title")}
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder={t("login.namePlaceholder")}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="name"
                            />

                        </Stack>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={submitHandler}
                        >
                            {t("login.submitButton")}
                        </Button>

                    </Box>

                </Box>

                <Box
                    className="login-image-section"
                    sx={{
                        display: { xs: 'hidden', sm: 'block' },
                        width: { xs: "0%", sm: "50%", md: '47%' },
                    }}>

                    <Box component="img" loading="lazy" src={rainy} className="weather-image image-one" />

                    <Box component="img" loading="lazy" src={sunny} className="weather-image image-two" />

                    <Box component="img" loading="lazy" src={cloudy} className="weather-image image-three" />

                </Box>

            </Box>
            <Stack sx={{
                width: "100%",
            }}>
                <Box
                    className=""
                    sx={{
                        width: 220,
                        margin: "0px auto"

                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel variant="standard" sx={{
                            color: "#B3B3B3"
                        }}>
                            {t("login.languageLabel")}
                        </InputLabel>
                        <NativeSelect
                            defaultValue={i18n.language}
                            onChange={handleLanguageChange}
                            sx={{
                                "&.MuiInputBase-root::before": {
                                    borderColor: (theme) => theme.palette.mode === "dark" ? "#757575" : "black"
                                },
                                "& .MuiNativeSelect-icon": {
                                    color: "#757575"
                                }
                            }}

                        >
                            <option value={"en"}>{t("login.enLanguage")}</option>
                            <option value={"fa"}>{t("login.faLanguage")}</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
            </Stack>

        </Box>
    );
}

export default Login;