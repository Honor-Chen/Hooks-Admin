import { Button, Form, Input, Select, Space, message, DatePicker } from "antd"; // Upload
import dayjs from "dayjs";
import "./index.less";

/* const normFile = (e: any) => {
	console.log("🌐 ~ normFile ~ e:", e);
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
}; */

const dateTimestamp = dayjs("2024-01-01").valueOf();
type FieldType = { date?: string };

const BasicForm = () => {
	const { Option } = Select;
	const [form] = Form.useForm();

	const onGenderChange = (value: string) => {
		switch (value) {
			case "male":
				form.setFieldsValue({ note: "Hi, man!" });
				return;
			case "female":
				form.setFieldsValue({ note: "Hi, lady!" });
				return;
			case "other":
				form.setFieldsValue({ note: "Hi there!" });
		}
	};

	const onFinish = (values: any) => {
		message.success("提交的数据为 : " + JSON.stringify(values));
		console.log(JSON.stringify(values));
	};

	const onReset = () => {
		form.resetFields();
	};

	const onFill = () => {
		form.setFieldsValue({
			user: "mark",
			note: "Hello world!",
			gender: "male",
			date: "2024-11-04"
		});
	};

	return (
		<div className="card content-box">
			<Form form={form} name="control-hooks" onFinish={onFinish} labelCol={{ span: 1 }} initialValues={{ date: dateTimestamp }}>
				<Form.Item name="user" label="User">
					<Input placeholder="Please enter a user" />
				</Form.Item>
				<Form.Item name="note" label="Note">
					<Input placeholder="Please enter a user note" />
				</Form.Item>
				<Form.Item name="gender" label="Gender">
					<Select placeholder="Select a option and change input text above" onChange={onGenderChange} allowClear>
						<Option value="male">male</Option>
						<Option value="female">female</Option>
						<Option value="other">other</Option>
					</Select>
				</Form.Item>
				{/* 查看 DatePicker 组件的用法 */}
				<Form.Item<FieldType>
					label="Date"
					name="date"
					rules={[{ required: true }]}
					getValueProps={value => {
						console.log("🌐 ~ BasicForm ~ value:", value);
						console.log(dayjs().isValid());
						return { value: value && dayjs(Number(value)) };
					}}
					normalize={value => {
						console.log("🌐 ~ BasicForm ~ value:", value);
						return value && `${dayjs(value).valueOf()}`;
					}}
				>
					<DatePicker />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 1 }}>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button htmlType="button" onClick={onReset}>
							Reset
						</Button>
						<Button type="link" htmlType="button" onClick={onFill}>
							Fill form
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	);
};

export default BasicForm;

/* getValueFromEvent:: 设置如何将 event 的值转换成字段值 */
/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
	<Upload action="/upload.do" listType="picture-card">
		<button style={{ border: 0, background: "none" }} type="button">
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	</Upload>
</Form.Item> */
