import { useEffect } from "react";
import autofit from "autofit.js";

function Autofit() {
	useEffect(() => {
		autofit.init({
			el: "#__autofit-container",
			dw: 1920,
			dh: 1080,
			transition: 1,
			ignore: [".autofit-ignore"],
			resize: true
		});

		return () => {};
	}, []);

	return (
		<div
			id="__autofit-container"
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				backgroundColor: "pink"
			}}
		>
			<section
				style={{
					width: "400px",
					height: "200px",
					backgroundColor: "blue",
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				Autofit
			</section>
			<hr />
			<main
				className="autofit-ignore"
				style={{
					width: "100px",
					height: "80px",
					backgroundColor: "teal",
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				Autofit-Ignore
			</main>
		</div>
	);
}

export default Autofit;
