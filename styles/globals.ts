import { type CSSObject } from "@emotion/react";

export const footer: CSSObject = {
	backgroundColor: "black",
};

export const footerText: CSSObject = {
	color: "grey",
	fontFamily: "sans-serif",
};

export const link: CSSObject = {
	textDecoration: "underline",
	color: "white",
};

export const header: CSSObject = {
	padding: "75px 50px 25px 50px",
	backgroundColor: "black",
};

export const button: CSSObject = {
	border: "none",
	borderRadius: "4px",
	cursor: "pointer",
	fontWeight: 500,
	padding: "8px 16px",
	backgroundColor: "white",
	color: "black",
	margin: "16px 0",
};

export const heading: CSSObject = {
	color: "white",
};

export const paragraph: CSSObject = {
	color: "grey",
	margin: "16px 0 48px 0",
};

export const errorStyles: CSSObject = {
	color: "red",
	margin: "16px 0",
};

export const linkSpaced: CSSObject = {
	...link,
	marginLeft: "8px",
};

export const version: CSSObject = {
	marginLeft: "8px",
	fontSize: "14px",
	color: "grey",
};
