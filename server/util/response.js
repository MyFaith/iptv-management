export function error(code, msg) {
    return {
        err: true,
        code,
        msg
    };
};

export function success(msg, data) {
    return {
        err: false,
        code: 200,
        msg,
        data
    };
};
