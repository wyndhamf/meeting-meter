import { useMemo, useState } from "react";

type Person = { name: string; email: string; annualSalary: number };

type Meeting = { title: string; durationMinutes: number; attendees: string[] };

function parseCsv(text: string): Person[] {
	const lines = text.trim().split(/\r?\n/);
	const header = lines.shift() || "";
	const cols = header.split(",").map((h) => h.trim());
	const idxName = cols.indexOf("name");
	const idxEmail = cols.indexOf("email");
	const idxSalary = cols.indexOf("annualSalary");
	if (idxName < 0 || idxEmail < 0 || idxSalary < 0) return [];
	return lines.map((line) => {
		const parts = line.split(",");
		return {
			name: parts[idxName]?.trim() || "",
			email: parts[idxEmail]?.trim() || "",
			annualSalary: Number(parts[idxSalary]) || 0,
		};
	}).filter((p) => p.email && p.annualSalary > 0);
}

function hourlyFromAnnual(annual: number) {
	return annual / 2080;
}

const sampleMeetings: Meeting[] = [
	{ title: "Weekly Staff Sync", durationMinutes: 30, attendees: ["a@company.com", "b@company.com"] },
	{ title: "Product Review", durationMinutes: 60, attendees: ["a@company.com", "c@company.com", "d@company.com"] },
];

export default function Dashboard() {
	const [people, setPeople] = useState<Person[]>([]);
	const [meetings, setMeetings] = useState<Meeting[]>(sampleMeetings);

	const totals = useMemo(() => {
		const emailToPerson = new Map(people.map((p) => [p.email, p] as const));
		let totalMinutes = 0;
		let totalCost = 0;
		for (const m of meetings) {
			totalMinutes += m.durationMinutes;
			const attendeeCost = m.attendees.reduce((sum, email) => {
				const person = emailToPerson.get(email);
				if (!person) return sum;
				const hourly = hourlyFromAnnual(person.annualSalary);
				return sum + hourly * (m.durationMinutes / 60);
			}, 0);
			totalCost += attendeeCost;
		}
		return { totalHours: totalMinutes / 60, totalCost };
	}, [people, meetings]);

	async function onCsvFile(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const text = await file.text();
		setPeople(parseCsv(text));
	}

	return (
		<div className="max-w-6xl mx-auto px-4 py-12">
			<h1 className="text-3xl font-bold mb-6">Dashboard Demo</h1>
			<div className="grid md:grid-cols-3 gap-6">
				<div className="md:col-span-2 border rounded-lg p-4">
					<h2 className="font-semibold mb-3">Upload Team Salaries (CSV)</h2>
					<input type="file" accept=".csv" onChange={onCsvFile} />
					{people.length > 0 && (
						<div className="mt-4 text-sm text-gray-700">Loaded {people.length} team members</div>
					)}
					<div className="mt-6">
						<h3 className="font-semibold mb-2">Meetings</h3>
						<ul className="space-y-2">
							{meetings.map((m, idx) => (
								<li key={idx} className="border rounded p-3 flex items-center justify-between">
									<div>
										<div className="font-medium">{m.title}</div>
										<div className="text-xs text-gray-500">{m.durationMinutes} min • {m.attendees.length} attendees</div>
									</div>
									<div className="text-sm bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
										${/* cost computed below */ m.attendees.reduce((sum, email) => {
											const person = people.find((p) => p.email === email);
											if (!person) return sum;
											return sum + hourlyFromAnnual(person.annualSalary) * (m.durationMinutes / 60);
										}, 0).toFixed(2)}
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="border rounded-lg p-4">
					<h2 className="font-semibold mb-3">Summary</h2>
					<div className="space-y-2">
						<div>Total Hours: {totals.totalHours.toFixed(2)}</div>
						<div>Estimated Cost: ${totals.totalCost.toFixed(2)}</div>
					</div>
				</div>
			</div>
		</div>
	);
}