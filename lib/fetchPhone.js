export const fetchPhone = async (property) => {
  try {
    const response = await fetch(`/api/contact-details-${property}`);
    const data = await response.json();
    return data.phone;
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
};
