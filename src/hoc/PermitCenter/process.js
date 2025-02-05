import React from "react";
import { Space } from "antd";

export const permitCenterProcess = (actionMap, record) => {
	const permit = [
		// {},
		{
			key: "delete",
			name: "删除",
			permit: true,
			color: "red"
		}
	];

	return (
		<Space size={10}>
			{permit
				?.filter(item => item.permit)
				.map?.(item => (
					<span
						key={item.key}
						style={{ color: item.color, cursor: "pointer" }}
						onClick={item.key !== "delete" ? () => actionMap[item.key](record) : args => args}
					>
						{item.name}
					</span>
				))}
		</Space>
	);
};
