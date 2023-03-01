const css = {
	color: "white",
	marginRight: "24px",
};

const labelStyles = {
	marginRight: "8px",
};

export default function Checkbox({
	label,
	onChange,
}: {
	label: string;
	onChange: () => void;
}) {
	return (
		<label css={css}>
			<span css={labelStyles}>{label}</span>
			<input type="checkbox" onChange={onChange} />
		</label>
	);
}
