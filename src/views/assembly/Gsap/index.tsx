import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./index.less";
import "./gsap-brand.css";

const StaggerComponent = () => {
	const container = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// const boxes: any = gsap.utils.toArray(".box");
			// gsap.staggerTo(boxes, 1, { y: 100, opacity: 0 }, 0.2);

			// * 多个元素同时动画，交错时间为 stagger 值 1s
			gsap.to(".box", { y: -400, opacity: 0, stagger: 1 });
		},
		{ scope: container }
	);

	return (
		<div ref={container} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
			<div className="box gradient-blue">Box 1</div>
			<div className="box gradient-blue">Box 2</div>
			<div className="box gradient-blue">Box 3</div>
			<div className="box gradient-blue">Box 4</div>
		</div>
	);
};

function Gsap() {
	const container = useRef<HTMLDivElement>(null);
	const circle = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// use selectors...
			gsap.to(".box", { rotation: "+=360", duration: 3 });

			// or refs...
			gsap.to(circle.current, { rotation: "-=360", duration: 3 });
		},
		{ scope: container }
	); // <-- scope for selector text (optional)

	// =================== Timeline example ===================
	const boxesContainerRef = useRef<HTMLDivElement>(null);
	const tl = useRef<gsap.core.Timeline | undefined>();

	const toggleTimeline = () => {
		if (!tl.current) return;
		// console.log("🌐 ~ toggleTimeline ~ tl.current:", tl.current.reversed());

		// * 当前反转状态
		tl.current.reversed(!tl.current.reversed());
	};

	useGSAP(
		() => {
			const boxes: any = gsap.utils.toArray(".box");
			tl.current = gsap
				.timeline()
				.to(boxes[0], { x: 120, rotation: 360 })
				.to(boxes[1], { x: -120, rotation: -360 }, "<")
				.to(boxes[2], { y: -166 })
				.reverse();
		},
		{ scope: boxesContainerRef }
	);

	return (
		<React.Fragment>
			<div ref={container} className="container">
				{/* <div className="box gradient-blue">selector</div>
			<div className="circle gradient-green" ref={circle}>
				Ref
			</div> */}
				<section className="boxes-container" ref={boxesContainerRef}>
					<h2>Use the button to toggle a Timeline</h2>
					<div>
						<button onClick={toggleTimeline}>Toggle Timeline</button>
					</div>
					<div className="box gradient-blue">Box 1</div>
					<div className="box gradient-blue">Box 2</div>
					<div className="box gradient-blue">Box 3</div>
				</section>
			</div>
			<StaggerComponent />
		</React.Fragment>
	);
}

export default Gsap;
