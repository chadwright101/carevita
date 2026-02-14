interface EmailTemplateData {
  name: string;
  email: string;
  phone: string;
  message: string;
  property?: string;
}

export const contactEmailTemplate = ({
  name,
  email,
  phone,
  message,
  property,
}: EmailTemplateData): string => {
  return `<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CareVita</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
    <table style="width: 100%; background-color: ${
      property ? "#94C36A" : "#5C873C"
    };">
      <tr>
        <td>
          <h1 style="padding: 1rem; ${
            property ? "" : "color: #fff;"
          }">CareVita</h1>
        </td>
      </tr>
    </table>

    <table style="width: 100%; padding: 1rem;">
      <tr>
        <td>
          <h3 style="font-size: 1.25rem">${
            !property
              ? "Website submission: Business Portfolio page"
              : "Website form submission"
          }</h3>
          <p style="font-size: 1rem; margin-top: 1rem; font-weight: 500;">
            Name: <span style="font-weight: 200; font-style: italic;">${name}</span>
          </p>
          <p style="font-size: 1rem; font-weight: 500;">
            Email address: <span style="font-weight: 200; font-style: italic;">${email}</span>
          </p>
          <p style="font-size: 1rem; font-weight: 500;">
            Phone: <span style="font-weight: 200; font-style: italic;">${phone}</span>
          </p>
          ${
            property
              ? `<p style="font-size: 1rem; font-weight: 500;">
            Property: <span style="font-weight: 200; font-style: italic;">${property}</span>
          </p>`
              : ""
          }
          <p style="font-size: 1rem; font-weight: 500;">
            Message:
            <br />
            <span style="font-weight: 200; font-style: italic;">${message}</span>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
