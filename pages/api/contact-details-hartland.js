import hartlandData from "@/data/hartland-data.json";

export default function handler(req, res) {
  const { email, phone } = hartlandData.general;

  res.status(200).json({ phone, email });
}
