import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "waitlist.json");

function ensureDataFile() {
	const dir = path.dirname(dataFile);
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
	if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({ emails: [] }, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	ensureDataFile();
	if (req.method === "POST") {
		const { email } = req.body || {};
		if (!email || typeof email !== "string") return res.status(400).json({ error: "Invalid email" });
		const json = JSON.parse(fs.readFileSync(dataFile, "utf8"));
		if (!json.emails.includes(email)) json.emails.push(email);
		fs.writeFileSync(dataFile, JSON.stringify(json, null, 2));
		return res.status(200).json({ ok: true });
	}
	if (req.method === "GET") {
		const json = JSON.parse(fs.readFileSync(dataFile, "utf8"));
		return res.status(200).json(json);
	}
	return res.status(405).end();
}