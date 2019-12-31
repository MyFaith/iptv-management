exports.error = function(code, msg) {
    return {
        err: true,
        code,
        msg
    };
};

exports.success = function(msg) {
    return {
        err: false,
        code: 200,
        msg
    };
};
