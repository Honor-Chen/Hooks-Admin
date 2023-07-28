import { useEffect, useRef } from "react";
import { useInterval } from "ahooks";

import { co } from "@/utils/util";

// *自动执行 Generator 函数，并且按顺序输出
const TestIndex = () => {
	useInterval(
		() => {
			console.log(new Date().toLocaleTimeString());
		},
		1000,
		{ immediate: true }
	);

	function* animation(start = false) {
		// console.log(2);
		if (start) {
			yield new Promise(resolve => setTimeout(resolve, 5000));
		}

		yield new Promise(resolve => setTimeout(resolve, 1000));
		// console.log(4);
	}

	const task = useRef<any>({});
	useEffect(() => {
		let start = true;

		function* loop() {
			// console.log(1);

			while (true) {
				yield* animation(start);

				start = false;
				// console.log(start, 3);

				yield new Promise(resolve => setTimeout(resolve, 5000 - 1000));
				// console.log(5);
			}
		}

		task.current = co(loop);
		return task.current.end;
	}, []);

	return <div>TestIndex</div>;
};

export default TestIndex;
