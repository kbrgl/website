export default async (req, res) => {
  const { email } = req.body;
  const response = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    body: JSON.stringify({
      email,
      referrer_url: "kabirgoel.com",
    }),
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return res.status(response.status).json({
    ok: response.status === 201,
  });
};
