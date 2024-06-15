var admin = require("firebase-admin");
var serviceAccount = {
  type: "service_account",
  project_id: "jobjod-bd9e4",
  private_key_id: "52bc9b3d837879daf667d75ef04b5101d07025af",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGiZjtIZfzGVi3\n8+BsB0bw2cVMpuh/UDICfgkPiAMgx1XxxllO+lwqZcYDP6IT2sL2pmKYoiV7NUF6\nAuwqoB50Z/9Czq6eHD0s+0CYDAqXXXRGzdjONtffX+hnTAZptddo7MG/epOn2DaH\nBvt7HvD00+rypdNe2FoZR7rgxJq5O40pS0ZItJ6F89Oy/GqCpD24VERgL1TSKFt7\nxU/vFjY1J64NQSmX+rUK2sB8VOL45JYED3vcKQZh1lAtoBRyoyShrYCshH2XhQ5c\nHs2oVYCRblaXtGigsi4vBBshiAIpCSWnVmJxbVFfGoCW7t9tR2ZOuMzSjzIwJTUz\nrr6/yj4pAgMBAAECggEAFfuZT7RXB0dIsAGUWVHK9JMgSfb3KlWeW/FJnosgUYpQ\nxVcBf4GwH8+qB6UNlKY1zSqqIx1dChHhAJn/PU8CYEA9ns+UvRQCYA8n3U4EBDOI\nUuiq91ZSO7z6VimwUhcc1VTVtRZk8AI8M2I+CSlpY6ptStW6nDdXbpInKokKWrT/\nq05NjYqpjFF4a/8mJ7M9Y1bS/AItTffPu9Uclgj+asilv+u9MkbGnOGzj1/801Vp\n5jsbj7pAvkqGyGysRnlPVehPu5pZzcj7cSszy7zz06iEnI5PNAR4lucKqwcpC039\nMCT2EhluSdRLC3LFUNiEAR6pi8tQbMd4P9cMY0DvgQKBgQD36MmBr3L47VX1jN6S\nBWIRw5tasNmEqa1hOQ8m0NbpYMTeVj8by7rKh3jA9F2JBJYdH8YRbC5rmh3+HvD2\npNm9vSMwoHkm8+55ltR+yo77ImPr6ttHnLpR/8d+0qKXcvJSA00O8pz3jIUHg5jI\nIrBSFemiuTbHB6gA/uKRhEdESQKBgQDNBFKI5Rkbw02isBJN3e0F/kZ+FzmvWAOs\n7LCban/YHitMlNvOwRW+iGGctnY96f8oT2AE5LkFwuUasGu+omQSDrFzEG78iEo/\nZA6Zn78pz58kaj6m54KAbdWPGAazI8T/fM0djVS8+1z6gS7ejyAAP9dp7/fn6wUG\npoaQUdlq4QKBgFmEvKbQpPKQORb27DPML9J8UK/Z5mHKJ2pRAVCh3sjdAZnLiPRP\nh760Vn1OgCwG9PHFVG9cIhMGzsfBgn99nYavMnLPr4/KS5WqSkcSe7jhfTVmVBIy\n3PDZLL917fJENo441O2N2/Jj0nGZKmUyaXrqoLf6q3YJJLhfUY78NgPJAoGBAKTx\noFGhOIU8qV6FmARr04Gp5R8XIoLvJe3fc+tmULsY8q8naH08nXjwktAZgKIpe+77\nhX4KYs2+0sKZQ+ZZEnfwuFWh2Bl2sX20y4ZPnuZNs3UBwaxYwIcBVvtMUj+YPKts\nxj3LcmylM1YbzxCiSBXLR01lEqfVTvLd0Y+VOn4hAoGBAPWsy3+xSmNGsVsTTl3/\nMsEUsWPwceHlcgy4m79pTXRVzTtv4zFBTsIU+jTxts4g8iq/zI14T9V53seu7W0N\nAw4I9U9Uyf0JY1fk97SMicoQh0h30TQi4LxPxzcNYMH/A5syv7Xnm2iRm60NVPew\n4zXy76TkzMligMjH4oMWQgka\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-dyms6@jobjod-bd9e4.iam.gserviceaccount.com",
  client_id: "115637514209474922468",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dyms6%40jobjod-bd9e4.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
admin.initializeApp({
  apiKey: "AIzaSyBhyEk7y8b93tw95UHzMfntr_fBOcZNB6o",
  authDomain: "jobjod-bd9e4.firebaseapp.com",
  projectId: "jobjod-bd9e4",
  storageBucket: "jobjod-bd9e4.appspot.com",
  messagingSenderId: "1090079926898",
  appId: "1:1090079926898:web:a2a71f17c88d8c329eb0eb",
  measurementId: "G-KC1LFQZJF1",
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
