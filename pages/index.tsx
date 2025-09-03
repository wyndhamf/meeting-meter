import { useState } from "react";
import Link from "next/link";

export default function Landing() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			if (res.ok) setSubmitted(true);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<nav className="bg-white shadow-sm sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0 flex items-center">
								<i className="fas fa-chart-line text-blue-600 text-2xl mr-2" />
								<span className="text-xl font-bold text-gray-900">Meeting Meter</span>
							</div>
						</div>
						<div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
							<Link href="#features" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Features</Link>
							<Link href="/pricing" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Pricing</Link>
							<Link href="/dashboard" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Dashboard Demo</Link>
						</div>
						<div className="flex items-center">
							<a href="#signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">Get Started</a>
						</div>
					</div>
				</div>
			</nav>

			<header className="bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Stop wasting money on unproductive meetings</h1>
						<p className="text-xl mb-8 opacity-90">Meeting Meter shows the real-time dollar cost of every meeting in your calendar based on attendees' salaries.</p>
						<div className="flex flex-col sm:flex-row gap-3">
							<a href="#signup" className="bg-white text-blue-700 font-semibold px-5 py-3 rounded-md">Join the Waitlist</a>
							<Link href="/pricing" className="border border-white/70 text-white px-5 py-3 rounded-md">View Pricing</Link>
						</div>
					</div>
					<div className="hidden md:block">
						<div className="bg-white/10 rounded-xl p-6 shadow-lg">
							<p className="font-semibold mb-2">Example overlay</p>
							<div className="bg-white text-gray-900 rounded-md p-4">
								<div className="flex items-center justify-between">
									<span>Weekly Staff Sync (30m)</span>
									<span className="bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded">$125</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<section id="features" className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold mb-8">Top Features</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="p-6 border rounded-lg">
							<h3 className="font-semibold mb-2">Calendar Overlay</h3>
							<p>Adds a cost badge inside each Google Calendar event.</p>
						</div>
						<div className="p-6 border rounded-lg">
							<h3 className="font-semibold mb-2">Team Salary Importer</h3>
							<p>CSV upload, Notion sync, or Google Sheet.</p>
						</div>
						<div className="p-6 border rounded-lg">
							<h3 className="font-semibold mb-2">Meeting Analytics Dashboard</h3>
							<p>See cost summaries and top expensive meetings.</p>
						</div>
					</div>
				</div>
			</section>

			<section id="signup" className="py-16 bg-gray-50">
				<div className="max-w-2xl mx-auto px-4">
					<h2 className="text-2xl font-bold mb-4">Join the waitlist</h2>
					{submitted ? (
						<p className="text-green-700">Thanks! Well be in touch soon.</p>
					) : (
						<form onSubmit={submit} className="flex gap-3">
							<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 border rounded px-3 py-2" />
							<button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
								{loading ? "Submitting..." : "Join"}
							</button>
						</form>
					)}
				</div>
			</section>

			<footer className="py-12 text-center text-sm text-gray-500">
				<div className="space-x-4">
					<Link href="/pricing">Pricing</Link>
					<Link href="/privacy">Privacy</Link>
					<Link href="/terms">Terms</Link>
				</div>
				<p className="mt-4">© {new Date().getFullYear()} Meeting Meter</p>
			</footer>
		</div>
	);
}