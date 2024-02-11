import parsonageData from "@/data/parsonage-data.json";

export default function handler(req, res) {
  const { email, phone } = parsonageData.general;

  res.status(200).json({ phone, email });
}
