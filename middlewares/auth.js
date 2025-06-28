const {getUser}=require("../service/auth.js")
function restrictToLoggedInOnly(req, res, next) {
  const useruid = req.cookies?.uuid;
  if (!useruid) return res.redirect("/login");

  const user = getUser(useruid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uuid;
  const user = getUser(userUid);
  req.user = user;
  next();
}
module.exports={restrictToLoggedInOnly,checkAuth}