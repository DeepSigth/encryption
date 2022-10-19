import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad

data1 = "B9Z6E2VCcLdGT83X5qDYW0BWnTS9Vo9Z7e21EX1bPFHuM513CEBS4/bJ7a0naFuLh91BNHIdBpO1NVuOF2YJ29ML01CAkEXAwTbOica+LKSdQg6JBFFMOVvFnalFllKXwuvNcj9hM1EYH+eCH6Dp7M6uwclpq3ghWCoupsMTUk1WXRZ53El//UGIg4hrdyZN"
key = '56RC51A6046A624881601EQD17V15CBA'


list = [
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x09, 0x0a, 0x0b, 0x0c,
    0x0d, 0x0e, 0x0f, 0x00,
  ];

iv = bytearray(list)

def _encrypt(data, encryptKey):

    # pad to 16 bytes
    data = data + " " * (16 - len(data) % 16)
    aes = AES.new(bytearray(encryptKey.encode("utf-8")) , AES.MODE_CBC, iv)
    encrypted = aes.encrypt(str.encode(data))
    return base64.urlsafe_b64encode(encrypted).decode("utf-8")

def _decrypt(edata,encryptKey):
    edata = base64.urlsafe_b64decode(edata)
    aes = AES.new(bytearray(encryptKey.encode("utf-8")), AES.MODE_CBC, iv)
    return aes.decrypt(edata).decode("utf-8")

# output = _decrypt(data1, key) 
output2 = _encrypt(data1, key) 
# print(output)
print(output2)