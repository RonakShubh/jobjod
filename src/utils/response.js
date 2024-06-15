const successAction = (data, vMessage = "OK", iCount) => {
  return { iStatusCode: 200, isStatus: true, iCount, data, vMessage };
};

const failAction = (vMessage = "Fail", iStatusCode = 400) => {
  return { iStatusCode, isStatus: false, data: null, vMessage };
};

module.exports = { successAction, failAction };
