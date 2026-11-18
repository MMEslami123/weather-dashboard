import Box from "@mui/material/Box";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import companyLogo from "../../assets/images/company logo.svg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getFormattedDate } from "../../utils/ConvertDate";

function Footer() {
    const { t, i18n } = useTranslation();
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                padding: "28px 24px",
                background: (theme) => theme.palette.mode === "dark" ? "linear-gradient(90deg, #292F45 0%, #3F4861 50%, #151D32 100%)" : "linear-gradient(90deg, #F3FAFE 0%, #CCDDDD 60%, #F3FAFE 100%)",
            }}
        >
            <Stack
                sx={{
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "40px"

                }}
            >
                {/* Nadin logo & copyRight text*/}
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        gap: "12px"
                    }}
                >
                    <Box
                        component="img"
                        loading="lazy"
                        src={companyLogo}
                        alt="Nadin Sadr Aria Logo"
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.primary",
                        }}
                    >
                        {t("footer.copyright")}
                    </Typography>
                </Stack>

                {/* email & date*/}
                <Stack
                    sx={{
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        gap: "40px"
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: "4px"
                        }}
                    >
                        <MailOutlinedIcon />
                        <Typography variant="body2">
                            {t("footer.contactUs")} : info@nadin.ir
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: "4px"
                        }}
                    >
                        <CalendarMonthOutlinedIcon />
                        <Typography variant="body2">
                            {getFormattedDate(currentTime, i18n.language)}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Footer;