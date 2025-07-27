import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token.accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    timeMax: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = response.data.items;

  const totalDurationHours = events.reduce((sum, event) => {
    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);
    const duration = (end - start) / (1000 * 60 * 60);
    return sum + duration;
  }, 0);

  const salary = req.query.salary ? parseFloat(req.query.salary) : 100;
  const totalCost = totalDurationHours * salary;

  res.status(200).json({ totalHours: totalDurationHours, totalCost });
}
