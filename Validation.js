export function isUserValidation(req) {
  const reqUser = req.user;
  console.log(reqUser);
  
  if (reqUser==null) {
    return false
  }

  if (reqUser.type != "Admin") {
    return false
  }

  return true
}
