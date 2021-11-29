import { message } from "antd";

export default function validationMessage(loadingMessage, successMessage, callback) {
    let redirect = () => {
        callback();
    };
    setTimeout(redirect, 3500); // simulate loading while validating
    message
        .loading(loadingMessage, 2)
        .then(() => message.success(successMessage, 2));
}
