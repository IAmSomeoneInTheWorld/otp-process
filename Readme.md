# Otp-process

_This piece of code will used to generate "**OTP**" on the server and as well as verify the otp on the server side without storing otp in database_

## How to use

import `otp-process`

```javascript
const otp = require("otp-process");
```

Basic, How to **`create OTP`**

```javascript
const Otp = otp.createOtp();

if (!Otp.error) {
  const { error, ...data } = Otp;
  console.log(data);
}
```

Basic, How to **`VerifyOtp`**

```javascript
// To verify it we need to {hash , data , otp}
// verifying otp
const isVerify = otp.verify(Otp.hash, Otp.data, Otp.otp);
console.log(isVerify);

/*
Output will be
{ error: false, data: {}, flag: 'Otp verified' }
*/
```

**In upper code we created unsecure otp system and verified it.**

---

Let's learn about createOtp here

**In `createOtp` we have four arguments there -**

## Otp Length

_Otp length decides your otp length it have length restrictions here_

1. Minimum length should not be less than 4.
2. Max length should be less than 13.
3. Only `Integer` will be accepted here.

## Data

_Data is a javascript `Object` this will be used to make your Otp system more secure and this have no restrictions here._

## Expiry

_This argument is useful in verifying process. it will decide that, "Is this otp expired or not". And only one restriction is there that only `Integer` will be accepted here._

## Secret

_By default it set tobe `None` but it is not good, this argument is highly sensitive and you should keep it in `.env` files, Anybody can easily bypass this otp system with this secret that's why you have to make your **''Secret''** more strong._

---

Let's create a secure otp using `createOtp`

```javascript
// creating data
const data = {
  email: "example@gmail.com",
  name: "Abcd",
};

// creating expiry time for 1 minute
const expiry = 1;

// setting length 6 char
const length = 6;

// creating otp
const Otp = otp.createOtp(length, data, expiry, process.env.OTP_SECRET);

// logging otp
console.log(Otp);
/*
  Output
  {
    error: false,
    otp: 876186,
    flag: true,
    data: { email: 'example@gmail.com', name: 'Abcd' },
    hash: '9b365348306e109c2f00f5128864114570a8ec39fe0e9837f30e1cee9d35c842.1656484856707'
  }
*/

// Now verifying otp
if (!Otp.error) {
  const { hash, data, otp:userOtp } = Otp;
  const isVerify = otp.verify(hash, data, userOtp, process.env.OTP_SECRET);
}
```
