import eastlandsData from "@/data/eastlands-data.json";

export default function handler(req, res) {
  const { email, phone } = eastlandsData.general;

  res.status(200).json({ phone, email });
}
