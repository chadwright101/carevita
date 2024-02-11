import sereneData from "@/data/serene-data.json";

export default function handler(req, res) {
  const { email, phone } = sereneData.general;

  res.status(200).json({ phone, email });
}
