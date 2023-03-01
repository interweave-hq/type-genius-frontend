import { buildTypesFileString } from "type-genius";
import { NextApiRequest, NextApiResponse } from "next";
import mixpanel from "mixpanel-browser";

mixpanel.init("7c307a0580f1ae2e559917e7c39b075d", {
	debug: process.env.NODE_ENV === "development",
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { obj, options } = req.body;

		mixpanel.track("Type generation trigger");

		let json;
		if (typeof obj === "string") {
			json = JSON.parse(obj);
		} else {
			json = obj;
		}

		try {
			const file = buildTypesFileString(json, options);
			res.status(200).json({
				file,
				json,
			});
		} catch (err) {
			res.status(500).json({
				file: "",
				json: "",
			});
		}
	}
}
