import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const token = await getToken({ req });
		if (!token || !(token as any).accessToken) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		const oauth2Client = new google.auth.OAuth2();
		oauth2Client.setCredentials({ access_token: (token as any).accessToken as string });

		const calendar = google.calendar({ version: "v3", auth: oauth2Client });
		const response = await calendar.events.list({
			calendarId: "primary",
			timeMin: new Date().toISOString(),
			timeMax: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
			singleEvents: true,
			orderBy: "startTime",
		});

		const events = response.data.items || [];
		const totalDurationHours = events.reduce((sum, event) => {
			const start = event.start?.dateTime ? new Date(event.start.dateTime) : null;
			const end = event.end?.dateTime ? new Date(event.end.dateTime) : null;
			if (!start || !end) return sum;
			const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
			return sum + duration;
		}, 0);

		const salary = req.query.salary ? parseFloat(String(req.query.salary)) : 100;
		const totalCost = totalDurationHours * salary;

		return res.status(200).json({ totalHours: totalDurationHours, totalCost });
	} catch (err: any) {
		return res.status(500).json({ error: err?.message || "Internal Server Error" });
	}
}