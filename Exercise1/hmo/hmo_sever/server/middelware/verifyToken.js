
import jwt  from "jsonwebtoken";
import { passwordKey } from "../../password.js";

const verifyToken = (req, res, next) => {

  try {
    console.log("verifyToken");
    console.log(req.headers)
    const token=req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).send("auth was not success");
    }

    const decoded = jwt.verify(token, passwordKey);
    req.staff = decoded;

  } catch (err) {
    console.log("auth was not succeed");
    console.log(err)
    return res.status(401).send("auth was not success");;
  }
  console.log("auth succeed");
  return next();
};

export default  verifyToken;