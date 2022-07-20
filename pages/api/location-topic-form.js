export default function handler(req, res) {
  const body = req.body;
  let redirectURL = "/";
  body.location ? (redirectURL += `${body.location}/topic/`) : res.redirect("/");
  body.topic ? (redirectURL += body.topic) : (redirectURL += "All");
  res.status(200).redirect(redirectURL);
}
