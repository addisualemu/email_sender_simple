const axios = require('axios');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

loadEnvFile();
const {
  firstName,
  renderEmail,
  header,
  rule,
  content,
  note,
  paragraph,
  label,
  panel,
  signoff,
  footer
} = require('./email-layout');

async function sendApplicationEmail() {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const url = "https://api.brevo.com/v3/smtp/email";

  if (!BREVO_API_KEY) {
    console.error("BREVO_API_KEY is missing. Add it to .env, then run npm start again.");
    return;
  }

  const receivers_info = [
    {
      name: "Edengirma Danesa",
      email: "edengirma4550@gmail.com",
      personalNote: "I am grateful to have you as a leader. I am looking forward to working with you."
    }]
    const receivers_info_2 = [
      {
        name: "Addisu Dalesa",
        email: "addisudamena49@gmail.com",
        personalNote: "I am grateful to have you as a leader. I am looking forward to working with you."
      },
      {
        name: "Wondimu Kenea",
        email: "addisudalemu@gmail.com",
        personalNote: "I am grateful to have you as a leader. I am looking forward to working with you."
      }
  ];


  const httpAgent = new http.Agent({ keepAlive: false });
  const httpsAgent = new https.Agent({ keepAlive: false });

  const MeetingDate = "November 17, 2026 at 10:00 AM";

  for (const receiver of receivers_info) {
    const payload = {
      sender: { 
        name: "Kingdom Tech Army",//"ActClear App", 
        email: "info@kingdomtecharmy.com"//"noreply@actclearapp.com" 
      },


      /*
      name: "Kingdom Tech Army",//"ActClear App", 
        email: "noreply@kingdomtecharmy.com"//"noreply@actclearapp.com" 
      */
      to: [
        {
          email: receiver.email,
          name: receiver.name
        }
      ],
      subject: `${receiver.name}, let's build something for the Kingdom!`,
      htmlContent: buildEmailHtml({
        name: receiver.name,
        personalNote: receiver.personalNote,
        meetingDate: MeetingDate
      }),
    };

    try {
      console.log(`Sending to ${receiver.email}...`);

      const response = await axios.post(url, payload, {
        headers: {
          "accept": "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json"
        },
        // Forces Node to ignore any environment overrides or proxy environments
        proxy: false,
        httpAgent,
        httpsAgent
      });

      console.log(`Success! Email sent to ${receiver.email}. Message ID:`, response.data.messageId);

    } catch (error) {
      if (error.response) {
        console.error(`Server error for ${receiver.email}:`, JSON.stringify(error.response.data, null, 2));
      } else {
        console.error(`Network configuration error for ${receiver.email}:`, error.message);
      }
    }
  }
}

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function buildEmailHtml({ name, personalNote, meetingDate }) {
  return renderEmail({
    preheader: `First leaders' gathering on ${meetingDate}. We will pray together and plan the first visit.`,
    sections: [
      header({
        title: `Good evening, ${firstName(name)}.`,
        lede: "Thank you for saying yes. It meant a great deal to hear it from you personally."
      }),
      rule(),
      content([
        note(personalNote),
        paragraph("Kingdom Tech Army is a volunteer ministry, not a business. We serve churches with technology as a gift, listening first and helping where we can."),
        label("How we begin"),
        paragraph("Our first goal is simple: three free Church Tech Listening Visits. We will start with visit #1 through warm introductions from the two churches we already serve.", { spaceAfter: 28 }),
        panel({
          label: "First leaders' gathering",
          title: meetingDate,
          text: "Please join us. We will pray together and plan that first visit."
        }),
        paragraph("I am praying for you and grateful to serve alongside you.", { spaceAfter: 22 }),
        signoff({ name: "Addisu", role: "Kingdom Tech Army" })
      ]),
      footer()
    ]
  });
}

if (require.main === module) {
  sendApplicationEmail();
}

module.exports = { buildEmailHtml };