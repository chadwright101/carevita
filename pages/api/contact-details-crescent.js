import crescentData from "@/data/crescent-data.json";

export default function handler(req, res) {
  const { email, phone } = crescentData.general;

  res.status(200).json({ phone, email });
}
