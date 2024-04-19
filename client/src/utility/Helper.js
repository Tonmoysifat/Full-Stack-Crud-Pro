class Helper {
    static isLogin() {
        let token = localStorage.getItem("token")
        return token !== null;
    }

    static tokenHeader() {
        return {
            headers: {
                "token": localStorage.getItem("token")
            }
        }
    }
    static isEmptyEmail(value) {
        return value.length === 0;
    }
    static isEmptyFName(value) {
        return value.length === 0;
    }
    static isEmptyLName(value) {
        return value.length === 0;
    }
    static isEmptyMobile(value) {
        return value.length === 0;
    }
    static isEmptyPassword(value) {
        return value.length === 0;
    }
}
export default Helper