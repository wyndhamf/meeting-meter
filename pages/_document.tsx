import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<title>Meeting Meter — See the Real Cost of Meetings</title>
					<meta name="description" content="Visualize real-time dollar cost of meetings based on salaries." />
					<script src="https://cdn.tailwindcss.com" />
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
					/>
				</Head>
				<body className="font-sans antialiased text-gray-800">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}