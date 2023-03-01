import { useEffect, useState } from "react";
import Head from "next/head";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { githubDark } from "@uiw/codemirror-theme-github";
import { Checkbox } from "../src/components/Checkbox";
import pckg from "../package.json";

import {
	button,
	errorStyles,
	footer,
	footerText,
	header,
	heading,
	link,
	linkSpaced,
	paragraph,
	version,
} from "@/styles/globals";

const DEFAULT_OBJECT = {
	name: "Fetch Posts",
	route: "/api/v1/posts?author=mike+carbone",
	description: "Fetch list of posts.",
	operation_start: 1125108643.4489841,
	operation_end: 1125108810.4074783,
	operation_duration: 166.95849418640137,
	request_failed: false,
	http_status: 200,
	http_method: "GET",
	params: {
		author: "mike carbone",
	},
	results: {
		data: [
			{
				id: "194fa24b-28gg-4d75-8e8c-b045f5370f67",
				author_id: "215gb35c-28ff-4d75-8e8c-b042f3320f89",
				created_at: "2022-12-01T00:31:19.452Z",
				content: "Hello world",
				likes: 451,
				comments: 22,
				title: "Mastering Product & Distribution",
				slug: "mastering-product-and-distribution",
			},
			{
				id: "194fa24b-28gg-4d75-8e8c-b045f5370f67",
				author_id: "215gb35c-28ff-4d75-8e8c-b042f3320f89",
				created_at: "2022-12-01T00:31:19.452Z",
				content: "Hello world",
				likes: 223,
				comments: 12,
				title: "Say No To Premature Optimization",
				slug: "say-no-to-premature-optimization",
			},
		],
	},
};

interface Options {
	forceOptional: boolean;
	renderSemis: boolean;
	useTypes: boolean;
}

interface Response {
	file: string;
	json: string;
}

export default function Home() {
	const [response, setResponse] = useState<Response>({
		file: "",
		json: "",
	});
	const [obj, setObj] = useState<object | string>(DEFAULT_OBJECT);
	const [options, setOptions] = useState<Options>({
		forceOptional: false,
		renderSemis: false,
		useTypes: false,
	});
	const [err, setError] = useState("");
	const run = async () => {
		if (!obj) return;
		const api =
			process.env.NODE_ENV === "development"
				? "http://localhost:3000/api/type"
				: "https://type-genius.carbonology.in/api/type";
		try {
			setError("");

			const res = await fetch(api, {
				method: "POST",
				body: JSON.stringify({ obj, options }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			setResponse(data);
		} catch (err) {
			console.log(err);
			setError("Invalid JSON.");
		}
	};

	const setOption = (field: keyof Options) => {
		setOptions({
			...options,
			[field]: !options[field],
		});
	};

	useEffect(() => {
		run();
	}, []);

	useEffect(() => {
		run();
	}, [options]);

	return (
		<>
			<Head>
				<title>Type Genius</title>
				<meta
					name="description"
					content="Typescript generator to create interfaces and types from any JSON object."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta
					name="og:image"
					content="https://type-genius.carbonology.in/meta.jpg"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div css={header}>
					<div
						css={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<div css={{ display: "flex", alignItems: "center" }}>
							<h1 css={heading}>Type Genius</h1>
							<p css={version}>
								Alpha v{pckg.dependencies["type-genius"]}
							</p>
						</div>
						<div>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/mikecarbone/type-genius"
								css={linkSpaced}
							>
								GitHub
							</a>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.npmjs.com/package/type-genius"
								css={linkSpaced}
							>
								NPM
							</a>
						</div>
					</div>
					<p css={paragraph}>
						Generate Typescript types from any JSON object.
					</p>
					<div>
						<Checkbox
							label="Render Semicolons"
							onChange={() => setOption("renderSemis")}
						/>
						<Checkbox
							label="Force Optional"
							onChange={() => setOption("forceOptional")}
						/>
						<Checkbox
							label="Use Types"
							onChange={() => setOption("useTypes")}
						/>
					</div>
					<button css={button} onClick={run}>
						Generate types
					</button>
					<p css={errorStyles}>{err}</p>
				</div>
				<div css={{ backgroundColor: "black", paddingLeft: "50px" }}>
					<p css={{ color: "grey" }}>Paste your own JSON below 👇</p>
				</div>
				<div
					style={{
						display: "flex",
						height: "95vh",
						justifyContent: "space-between",
						border: "15px solid black",
					}}
				>
					<CodeMirror
						value={JSON.stringify(
							response?.json || DEFAULT_OBJECT,
							null,
							4
						)}
						onChange={(e: string) => setObj(e)}
						extensions={[json()]}
						contextMenu="none"
						height={"100%"}
						theme={githubDark}
						basicSetup={{
							autocompletion: false,
						}}
					/>
					<CodeMirror
						value={response?.file || ""}
						extensions={[javascript({ typescript: true })]}
						contextMenu="none"
						height={"100%"}
						theme={githubDark}
						basicSetup={{
							autocompletion: false,
						}}
					/>
				</div>
			</main>
			<footer css={footer}>
				<p css={footerText}>
					Created by{" "}
					<a css={link} href="https://twitter.com/MikeCarbone">
						Mike Carbone
					</a>
				</p>
			</footer>
		</>
	);
}
