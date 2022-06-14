export default async (req, res) => {
  const { password } = req.body;
  if (password === process.env.ZOOM_MAGIC_WORD) {
    return res.status(200).json({ ok: true, link: process.env.ZOOM_LINK });
  }
  return res.status(403).json({ ok: false, error: "Incorrect password" });
};
