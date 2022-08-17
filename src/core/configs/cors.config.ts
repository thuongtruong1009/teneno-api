const whiteList = process.env.WHITE_LIST;

export const corsOptions = function (req: any, callback: any) {
  let option;

  if (Array(whiteList).indexOf(req.header('Origin')) !== -1) {
    option = {
      origin: true,
      credentials: true,
      methods: 'GET,PUT,PATCH,POST,DELETE',
    };
  } else {
    option = {
      origin: false,
      credentials: false,
      methods: 'GET,PUT,PATCH,POST,DELETE',
    };
  }
  callback(null, option);
};
