import Link from "next/link";

export default function Pricing() {
	return (
		<div className="max-w-5xl mx-auto px-4 py-16">
			<h1 className="text-4xl font-bold mb-8">Pricing</h1>
			<div className="grid md:grid-cols-3 gap-6">
				<div className="border rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-2">Free</h2>
					<p className="text-sm text-gray-600 mb-4">Up to 5 seats</p>
					<p className="text-3xl font-bold mb-6">$0</p>
					<Link href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md">Get Started</Link>
				</div>
				<div className="border rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-2">Team</h2>
					<p className="text-sm text-gray-600 mb-4">Up to 20 seats</p>
					<p className="text-3xl font-bold mb-6">$10<span className="text-base font-normal">/month</span></p>
					<Link href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md">Start Trial</Link>
				</div>
				<div className="border rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-2">Unlimited</h2>
					<p className="text-sm text-gray-600 mb-4">Unlimited teams</p>
					<p className="text-3xl font-bold mb-6">$49<span className="text-base font-normal">/month</span></p>
					<Link href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md">Contact Sales</Link>
				</div>
			</div>
		</div>
	);
}