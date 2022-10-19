var crypto = require("crypto");

let EncryptResponse = aes_encrypt("{'body': {'key': 'value'}, 'header': {'created_at': '2022-10-16T00:43:16.524516', 'id': '9f55d2d2bbc20b0e10300ce69941408e', 'name': 'test'}}", "56RC51A6046A624881601EQD17V15CBA");

console.log(EncryptResponse);

let DecryptResponse = aes_decrypt("BgBtuyDY4XBt0y4hjsyPvZs2FnJp-48LR0WNK3OUtHrTA8Fs8Ykxkp7UmaZSgWvDjFLmiT0ZplBC-zBo_2yKD04kxgIzKGopArKkO40w8M7-GMJ_GGTbzEpZGA2MRFiMV0n52W-GhNepVI2f8QJbC3zRbGuzeteq-5KeJbsgwU36_1sMbSfvAVCP3eBszh_DlXtygfASUPhDz5gCKw3Lp3ZG293T2LXgnKQwilsLi2Q=","UK0qhZibMzWn2BKttZLNdcpAIhBxpctM")

console.log(DecryptResponse,'=======DecryptResponse=======');



function encode(text) {
  var blockSize = 16;
  var textLength = text.length;
  var amountToPad = blockSize - (textLength % blockSize);
  console.log(amountToPad,'=amountToPad=amountToPad');
  var result = Buffer.alloc(amountToPad);
  result.fill(amountToPad);
  console.log(result,'====result======');

  return Buffer.concat([text, result]);
}

function decode(text) {
  var pad = text[text.length - 1];

  if (pad < 1 || pad > 16) {
    pad = 0;
  }

  return text.slice(0, text.length - pad);
}

function aes_decrypt(text, key) {
  let ourIv = [
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x09, 0x0a, 0x0b, 0x0c,
    0x0d, 0x0e, 0x0f, 0x00,
  ];
  const iv = Buffer.from(ourIv);
  var decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  decipher.setAutoPadding(false);
  var deciphered = Buffer.concat([
    decipher.update(text, "base64"),
    decipher.final(),
  ]);
  deciphered = decode(deciphered);
  return deciphered.toString();
}

function aes_encrypt(text, key) {
  let ourIv = [
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x09, 0x0a, 0x0b, 0x0c,
    0x0d, 0x0e, 0x0f, 0x00,
  ];
  const iv = Buffer.from(ourIv);
  var encoded = encode(Buffer.from(text));
  var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  cipher.setAutoPadding(false);
  var cipheredMsg = Buffer.concat([cipher.update(encoded), cipher.final()]);
  return cipheredMsg.toString("base64");
}
