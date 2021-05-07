
const validate = (username, email, phone, address, password, confirm_password) => {
    if(!username || !email || !phone || !address || !password) {
        return "Vui lòng điền vào đầy đủ thông tin";
    }
    if(!validateEmail(email)) {
        return "Email của bạn không hợp lệ";
    }
    if(!phoneNumber(phone)) {
        return "Số điện thoại của bạn chưa hợp lệ";
    }
    if(password.length < 6) {
        return "Vui lòng nhập mật khẩu nhiều hơn 6 ký tự";
    }
    if(password !== confirm_password) {
        return "Nhập lại mật khẩu chưa chính xác";
    }
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function phoneNumber(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}

export default validate;