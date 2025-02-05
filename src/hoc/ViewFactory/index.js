import React from "react";

// eslint-disable-next-line react/display-name
const ViewFactory = CommonView => model => service => props => {
	const domain = service(model, props);
	return <CommonView>{...{ domain, ...props }}</CommonView>;
};

export default ViewFactory;
