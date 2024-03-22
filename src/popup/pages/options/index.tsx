import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card } from "antd";
import { usePassword } from "../../hook/password";
import "./options.less";

export default function Options() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const pwd = usePassword();

	useEffect(() => {
		if (pwd) {
			if (!state) {
				navigate("/relogin", { state: pwd });
			}
		}
	}, [pwd]);

	return (
		<div className="options-container">
			<h1>初次使用Swift钱包?</h1>
			<Card className="card">
				<h2>创建钱包</h2>
				<p>这将创建一个新的钱包和一个12字的恢复短语</p>
				<Button
					type="primary"
					onClick={() => {
						navigate("/createMnemonic", { state: state });
					}}>
					创建新的钱包
				</Button>
			</Card>
			<Card className="card">
				<h2>导入钱包</h2>
				<p>通过输入12个字的恢复短语,导入你现有的钱包</p>
				<Button
					type="primary"
					onClick={() => {
						navigate("/import",{state:state});
					}}>
					导入现有钱包
				</Button>
			</Card>
		</div>
	);
}
