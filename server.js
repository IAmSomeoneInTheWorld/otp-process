const crypto = require('crypto');
const {generateMinMax , hashOtp , compare} = require('./helpers');

class OtpSystem {
    // this function will be used to do otp generation process
    createOtp(digit = 4, data = {}, expiry = 1, secret = "None") {
        // validation 1
        if(!Number.isInteger(digit)){
            return { error: "digit should be a integer", flag: false };
        }else if (!Number.isInteger(expiry)){
            return { error: "expiry should be a integer", flag: false };
        }
        // validating digit 2
        if (digit < 4) {
            return { error: "digit should be atleast 4", flag: false };
        } else if (digit > 12) {
            return { error: "digit should be less than 13", flag: false };
        } else {
            // holding min max for deciding otp length
            const length = generateMinMax(digit);
            // creating otp
            const otp = crypto.randomInt(Number(length.min), Number(length.max));

            // creating otp hash
            // this is total time
            const expiryTime = 1000 * 60 * expiry;
            // this is expires time
            const expires = Date.now() + expiryTime;

            // creating data string encrypting data
            let dataString = `${otp}.${expires}.`;
            for (let item in data) {
                dataString = dataString + data[item] + ".";
            };

            // purify the dataString
            dataString = dataString.substring(0, dataString.length - 1);
            // this is the secret for creating otp hash
            const SECRET = secret;
            // creating otp hash
            const otp_hash = hashOtp(dataString, SECRET);

            return { error: false, otp, flag: true, data, hash: `${otp_hash}.${expires}` };
        }
    };

    verify(hash, data={}, otp, secret = "None") {
        // validating
        if (!hash || !data || !otp) {
            return { error: "All fields are required", flag: false };
        }

        // validation 2
        if(!Number.isInteger(Number(otp))){
            return { error: "otp should be a integer", flag: false };
        }

        // destructuring hash data
        const [hashedOtp, expires] = hash.split(".");

        // Checking here, Is entered otp expired or not?
        if (Date.now() > Number(expires)) {
            // console.log({ "msg": "Otp has been expired", flag: false });
            return { error: "otp has expired", flag: false };
        };

        // this is the data for creating otp hash 
        let dataString = `${otp}.${expires}.`;
        for (let item in data) {
            dataString = dataString + data[item] + ".";
        };

        // purify the dataString
        dataString = dataString.substring(0, dataString.length - 1);

        // this is the secret for creating otp hash
        const SECRET = secret;

        // user will be verified or not
        const verifyingUser = compare(dataString, SECRET, hashedOtp);

        if(!verifyingUser){
            return {error:"Otp verification failed, please enter valid details" , flag:false};
        }

        return {error : false , data , flag:"Otp verified"};
    }
}

module.exports = new OtpSystem();