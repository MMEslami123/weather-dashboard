import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { setThemeMode } from "../../features/theme/themeSlice";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";


function SettingMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOutClose = () => {
        localStorage.removeItem("name");
        sessionStorage.removeItem("showWelcome");
        navigate("/");
    }

    const mode = useAppSelector((state) => state.theme.mode);
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();

    const handleLanguageChange = (
        _event: React.MouseEvent<HTMLElement>,
        newLang: 'en' | 'fa' | null
    ) => {
        if (newLang !== null && newLang !== i18n.language) {
            i18n.changeLanguage(newLang);

        }
    };
    return (
        <Box component={"div"}>
            <IconButton
                onClick={handleClick}
                sx={{
                    border: (theme) => theme.palette.mode === "dark" ? (`1px solid ${open ? "#009CD8" : "#757575"} `) : (`1px solid ${open ? "#009CD8" : "#BBC1C4"}`),
                    backgroundColor: open ? "#CFEDFA" : "transparent",
                    color: (theme) => theme.palette.mode === "dark" ? (open ? "#009CD8" : "#757575") : (open ? "#009CD8" : "#BBC1C4"),
                    borderRadius: "8px",
                    p: "8px",
                }}
            >
                <SettingsOutlinedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        width: '220px',
                        borderRadius: '8px',
                        padding: '0px 16px',
                        mt: 1,
                        backgroundColor: (theme) => theme.palette.mode === "dark" ? "#292F45" : "#ffffff",
                        boxShadow: (theme) => theme.palette.mode === "dark" ? "0px 5px 10px 3px #ffffff33" : "0px 5px 10px 3px #00000033",
                    },
                }}
            >

                {/* mode */}
                <Box>
                    <Typography variant="body1" sx={{ mb: "6px" }}>
                        {t("menu.mode")}
                    </Typography>
                    <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={
                            (_, newMode) => newMode && dispatch(setThemeMode(newMode))

                        }
                        fullWidth
                        sx={{
                            "& .MuiToggleButton-root": {
                                border: "1px solid #8895A0",
                                textTransform: 'none',
                                py: 0.6,
                                color: "#8895A0",
                                "&.Mui-selected": {
                                    color: "primary.main",
                                    backgroundColor: "transparent",
                                    borderColor: "primary.main",
                                    zIndex: "1",
                                    "&:hover": { backgroundColor: "transparent" },
                                },
                            },
                        }}
                    >
                        <ToggleButton value="light">
                            <LightModeOutlinedIcon sx={{ fontSize: 16, mr: .5 }} /> {t("menu.light")}
                        </ToggleButton>
                        <ToggleButton value="dark">
                            <DarkModeOutlinedIcon sx={{ fontSize: 16, mr: .5 }} /> {t("menu.dark")}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Divider sx={{
                    margin: "13px 0px 18px"
                }}
                />

                {/* language */}
                <Box>
                    <Typography variant="body1" sx={{ mb: "6px" }}>
                        {t("menu.language")}
                    </Typography>
                    <ToggleButtonGroup
                        value={i18n.language}
                        exclusive
                        onChange={handleLanguageChange}
                        fullWidth
                        sx={{
                            "& .MuiToggleButton-root": {
                                border: "1px solid #8895A0",
                                textTransform: 'none',
                                py: 0.6,
                                color: "#8895A0",
                                "&.Mui-selected": {
                                    color: (theme) => theme.palette.primary.main,
                                    backgroundColor: "transparent",
                                    borderColor: (theme) => theme.palette.primary.main,
                                    zIndex: "1",
                                    "&:hover": { backgroundColor: "transparent" },
                                },
                            },
                        }}
                    >
                        <ToggleButton value="en">{t("menu.english")}</ToggleButton>
                        <ToggleButton value="fa">{t("menu.persian")}</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Divider
                    sx={{
                        margin: "13px 0px 12px"
                    }}
                />

                {/* logout */}
                <MenuItem
                    onClick={logOutClose}
                    sx={{
                        borderRadius: '6px',
                        gap: .5,
                        padding: "8px 3.5px",
                        color: (theme) => theme.palette.mode === "dark" ? "#F3F4F7" : "#3D4852",
                        transition: "all .2s",
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.mode === "dark" ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.1)",
                            color: '#ef4444',
                        },
                    }}
                >
                    <LogoutIcon />
                    <Typography variant="body2">
                        {t("menu.exit")}
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>

    );
}

export default SettingMenu;