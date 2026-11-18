export const getDayName = (timestamp: number, lang: string = 'fa-IR') => {
    return new Date(timestamp * 1000).toLocaleDateString(lang, { weekday: "long" });
};

export const formatFullDate = (timestamp: number, lang: string = 'fa-IR') => {
    const date = new Date(timestamp * 1000);
    if (lang === 'fa-IR') {
        return date.toLocaleDateString('fa-IR', {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }
    return date.toLocaleDateString('en-US', {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};
export const getFormattedDate = (date: Date = new Date(), lang: string = "en") => {
    const isFa = lang.startsWith("fa");
    const currentLang = isFa ? "fa-IR" : "en-US";

    // clock
    const timeStr = new Intl.DateTimeFormat(currentLang, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);

    // get date in persian and display in persian order
    if (isFa) {
        const weekday = new Intl.DateTimeFormat("fa-IR", { weekday: "long", calendar: "persian" }).format(date);
        const day = new Intl.DateTimeFormat("fa-IR", { day: "numeric", calendar: "persian" }).format(date);
        const month = new Intl.DateTimeFormat("fa-IR", { month: "long", calendar: "persian" }).format(date);
        const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric", calendar: "persian" }).format(date);

        return `${timeStr}  ${weekday} ${day} ${month} ${year}`;
    } else {

        // get date in english
        const dateStr = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            calendar: "gregory",
        }).format(date);

        return `${timeStr} . ${dateStr}`;
    }
}