import data from "@/data/general-data.json";

export default function handler(req, res) {
  const { general, accounts } = data.homePage.contact;

  res.status(200).json({ accounts, general });
}
