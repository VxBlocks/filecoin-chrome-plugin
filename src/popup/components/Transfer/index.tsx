import { Col, Form, Input, Row } from "antd";
import React from "react";
import "../../../common/styles/second.less";

export default function Transfer() {
	return (
		<div className="transfer_container">
			<div className="header">
				<a href="">
					<Row align="top">
						<Col span={2}>
							<i className="iconfont icon-fanhui"></i>
						</Col>
						<Col span={2}>
							<h4>返回</h4>
						</Col>
						<Col span={16} style={{ textAlign: "center", fontWeight: "700" }}>
							<h3>转账</h3>
						</Col>
					</Row>
				</a>
			</div>
			<div className="main">
				<div>
					<p>在下面输入转账地址和金额开始进行转账</p>
					<span>请预留小费</span>
				</div>
        <Form>
          <Form.Item >
            <Input />
          </Form.Item>
        </Form>
			</div>
		</div>
	);
}
