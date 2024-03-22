import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Tabs } from "antd";
import Recovery from "./recovery";
import "../create/create.less";

export default function Import() {
	const navigate = useNavigate();
	return (
		<div className="create-container">
			<div className="header">
				<Row align="top">
					<Col span={2} style={{ height: "28px", lineHeight: "28px" }}>
						<a onClick={() => navigate(-1)}>
							<i className="iconfont icon-fanhui"></i>
						</a>
					</Col>
					<Col span={20}>
						<h1>导入钱包</h1>
					</Col>
				</Row>
			</div>
			<div className="main">
				<Tabs defaultActiveKey="1" centered style={{ width: "100%" }}>
					<Tabs.TabPane key="1" tab="助记词">
						<Recovery placeholder={'请输入12位助记词'} type={1} />
					</Tabs.TabPane>
          <Tabs.TabPane key="2" tab="私钥">
						<Recovery placeholder={'请输入秘钥'} type={2} />
					</Tabs.TabPane>
          <Tabs.TabPane key="3" tab="地址">
						<Recovery placeholder={'请输入钱包地址'} type={3} />
					</Tabs.TabPane>
				</Tabs>
			</div>
		</div>
	);
}
