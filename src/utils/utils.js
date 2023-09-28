import validator from 'validator';

export const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
};

export const emailIsValid = (email) => {
if (validator.isEmail(email)) {
    return true;
}
return false;
};

export const passwordIsValid = (password) => (password.length >=8 && /^[a-zA-Zа-яА-Я0-9_!"№;%:?*()<>]*$/.test(password));
export const nameIsValid = (name) => (name.length >=2 && /^[a-zA-Zа-яА-Я- ]*$/.test(name));

