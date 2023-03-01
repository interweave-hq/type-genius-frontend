import { buildTypesFileString, type BuildOptions } from "type-genius";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { obj, options } = req.body;

		let json;
		if (typeof obj === "string") {
			json = JSON.parse(obj);
		} else {
			json = obj;
		}

		const file = buildTypesFileString(json, options);

		res.status(200).json({
			file,
			json,
		});
	}
}
