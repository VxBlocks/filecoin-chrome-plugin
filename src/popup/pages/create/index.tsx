import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Checkbox, Row, Col } from "antd";

import "./create.less";
export default function Create() {
	const navigate = useNavigate();
	const passReg = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$");
	const onFinish = async (value: { confirm: any }) => {
		/* global chrome */
		chrome.storage.local.set({ pwd: value.confirm });
		navigate("/wallet");
	};
	return (
		<div className="create-container">
			<div className="header" style={{flexGrow:'1'}}>
				<Row align="top">
					<Col span={2} style={{ height: "28px", lineHeight: "28px" }}>
						<a onClick={() => navigate(-1)}>
							<i className="iconfont icon-fanhui"></i>
						</a>
					</Col>
					<Col span={20}>
						<h1>创建钱包密码</h1>
					</Col>
				</Row>
			</div>
			<div className="main" style={{flexGrow:'2'}}>
				<Form name="create" layout="vertical" onFinish={onFinish}>
					<Form.Item
						label="创建密码"
						name="password"
						rules={[{ required: true, message: "应包含8-18位的字母数字", pattern: passReg }]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="确认密码"
						name="confirm"
						rules={[
							{
								required: true,
								message: "密码不一致",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("你所输入的两个密码不匹配"));
								},
							}),
						]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="remember"
						valuePropName="checked"
						rules={[
							{
								validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("应该接收协议！"))),
							},
						]}>
						<Checkbox>我阅读并同意服务条款和隐私政策。</Checkbox>
					</Form.Item>
					<Form.Item style={{ margin: "30px 0 0 0" }}>
						<Button type="primary" htmlType="submit" style={{ background: "#2c85af" }}>
							创建钱包
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
