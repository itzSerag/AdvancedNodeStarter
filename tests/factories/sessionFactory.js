const Buffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const keys = re;
module.exports = (user) => {
  // first take the user id from user model
  const sessionObj = { passport: { user: id } };
  const keygrip = new Keygrip([keys.cookieKey]);

  const sessionString = Buffer.from(JSON.stringify(sessionObj)).toString(
    "base64"
  );

  const sig = keygrip.sign("session=" + sessionString);

  return { session: sessionString, sig: sig };
};
