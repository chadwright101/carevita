export const fetchEmail = async (property) => {
  try {
    const response = await fetch(`/api/contact-details-${property}`);
    const data = await response.json();
    return data.email;
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
};
