export function isUserValidation(req) {
  const reqUser = req.user;
  if (!reqUser) {
    return false
  }

  if (reqUser.type != "admin") {
    return false
  }

  return true
}
