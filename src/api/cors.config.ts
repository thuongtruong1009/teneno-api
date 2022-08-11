const whiteList = process.env.WHITE_LIST;

export const corsOptions = function (req: any, callback: any) {
  let option;

  if (Array(whiteList).indexOf(req.header('Origin')) !== -1) {
    option = { origin: true };
  } else {
    option = { origin: false };
  }
  callback(null, option);
};
