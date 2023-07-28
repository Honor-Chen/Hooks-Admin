import ScrollBoard from "@/components/ScrollBoard";
// import TestIndex from "@/components/ScrollBoard/test-index";
import "./index.less";

const Home = () => {
	return (
		<div className="home card">
			This is Home Page
			<ScrollBoard
				config={{
					waitTime: 3000,
					// carousel: "page",
					// header: ["<i style='color: red;'>column1</i>", "column2", "column3"],
					rowNum: 5,
					data: [
						["行1列1行1列1行1列1行1列1行1列1", "行1列2", "行1列3"],
						["行2列1", "行2列2", "行2列3"],
						["行3列1", "行3列2", "行3列3"],
						["行4列1", "行4列2", "行4列3"],
						["行5列1", "行5列2", "行5列3"],
						["行6列1", "行6列2", "行6列3"],
						["行7列1", "行7列2", "行7列3"],
						["行8列1", "行8列2", "行8列3"],
						["行9列1", "行9列2", "行9列3"],
						["行10列1", "行10列2", "行10列3"],
						["行11列1", "行11列2", "行11列3"]
					]
				}}
				style={{ width: "40%", height: "40%" }}
			/>
			{/* <TestIndex /> */}
		</div>
	);
};

export default Home;
