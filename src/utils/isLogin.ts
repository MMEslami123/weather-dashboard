export const isLogin = () => {
    if (localStorage.getItem("name"))
        return true
    return false
}