const crypto = require('crypto');
// private function for creating min and max
const generateMinMax = (digit = 4) => {
    // this is for creating opt a/c to digit
    let min = "", max = "";
    // generating min and max
    for (let i = 0; i < digit; i++) {
        if (i === 0) {
            min = min + "1",
                max = max + "9";
            continue;
        };

        min = min + "0",
            max = max + "9";
    };

    return { min, max };
};

 // for creating hash
const hashOtp = (data, SECRET) => {
    return crypto
        .createHmac('sha256', SECRET)
        .update(data)
        .digest('hex');
};

 // for comparing hash
const compare = (data, secret, hashedOtp) => {
    const newOtp = hashOtp(data, secret);
    if (newOtp === hashedOtp) {
        return true;
    } else {
        return false;
    }
};

module.exports = {generateMinMax , hashOtp , compare};