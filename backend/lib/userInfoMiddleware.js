import jwt from "jsonwebtoken";

const userInfo = (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  console.log(req);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decoded.userId;
      next();
    } catch (error) {
      res
        .status(200)
        .json({ success: false, message: "log in error: " + error });
      console.log(error);
    }
  } else {
    res.status(200).json({ success: false, message: "not logged in" });
  }
};

export { userInfo };
