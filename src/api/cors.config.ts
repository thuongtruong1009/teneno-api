const whiteList = ['http://127.0.0.1:5500', 'http://localhost:5500'];

export const corsOptions = function (req, callback) {
  let option;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    option = { origin: true };
  } else {
    option = { origin: false };
  }
  callback(null, option);
};
