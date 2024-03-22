import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Input, message, Row, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useCurrentAccount } from "../popup/hook/currentAccount";
import { usePassword } from "../popup/hook/password";
import { Notice } from "../api/Notice";

export default function ViewAccountKey() {
	const currentAccount = useCurrentAccount();
	const [value, setValue] = useState("");
	const password = usePassword();
	const [currentPassword, setCurrentPassWord] = useState("");
	const navigate = useNavigate();

  useEffect(()=>{
    setValue(currentAccount.privateKey);
  },[currentAccount]);
	/**
	 * 是否显示私钥
	 */
	const [showPrivate, setShowPrivate] = useState(false);

	const onchange = (_value: string) => {
		if (_value === "private key") {
			setValue(currentAccount.privateKey);
		} else if (_value === "seed Word") {
			if (currentAccount.phrase) {
				setValue(currentAccount.phrase);
			}else {
        Notice('info','不存在秘钥',"");
      }
		}
	};

	return (
		<div className="showKey_container" style={{ color: "#1f1375", padding: "1.25rem" }}>
			<div className="header">
				<Row align="top">
					<Col span={2}>
						<a onClick={() => navigate(-1)}>
							<i className="iconfont icon-fanhui"></i>
						</a>
					</Col>
					<Col span={20}>
						<h2 style={{ fontSize: "18px", textAlign: "center" }}>View</h2>
					</Col>
				</Row>
			</div>
			<div style={{ marginTop: "30px" }}>
				<Input style={{ fontSize: "12px" }} size="large" value={currentAccount.address} prefix={<UserOutlined />} />
				<div style={{ padding: "20px 0" }}>
					{showPrivate ? (
						<div>
							<Row align="middle" style={{ fontSize: "1.2rem", margin: "20px 0" }}>
								<Col>查看</Col>
								<Col>
									<Select
										bordered={false}
										defaultValue="private key"
										onChange={onchange}
										options={[
											{ value: "private key", label: "private key" },
											{ value: "seed Word", label: "seed Word" },
										]}
									/>
								</Col>
							</Row>
							<Card bodyStyle={{ padding: "10px" }}>
								<TextArea
									autoFocus
									className={"TextAreaClass"}
									style={{
										backgroundColor: "white",
										padding: "8px",
										fontSize: "14px",
										fontWeight: 600,
										color: "#333333",
										cursor: "text",
									}}
									value={value}
									bordered={false}
									autoSize={{ minRows: 2 }}
								/>
							</Card>
						</div>
					) : (
						<div>
							<p style={{ fontSize: "12px", margin: "20px 0" }}>{`输入密码以显示`}</p>
							<Input.Password
								placeholder={"********"}
								value={currentPassword}
								onChange={event => {
									{
										setCurrentPassWord(event.target.value);
									}
								}}
							/>
							<Button
								type="primary"
								style={{ margin: "20px auto", background: "#0284ad" }}
								htmlType="submit"
								onClick={() => {
									if (currentPassword === password) {
										setCurrentPassWord("");
										setShowPrivate(true);
										// 15s 后自动关闭
										setTimeout(() => {
											setShowPrivate(false);
										}, 15000);
									} else {
										message.error("password wrong!");
									}
								}}>
								显示
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
