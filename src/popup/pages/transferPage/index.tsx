import { Form, Input, Button } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Return from "../../../components/Return";
import { useNavigate } from "react-router-dom";
import NumericInput from "../../../components/NumberInput";
import { getBalance, getTransition } from "../../../servers/api";
import { Notice } from "../../../api/Notice";
import { Transaction,Address,Token, Methods } from "@zondax/izari-filecoin";
import "./index.less";

const TRANSFER = "转账";

const TransferPage = () => {
	const [value, setValue] = useState("");
	const navigate = useNavigate();
	const [fil, setfil] = useState("");
	const [address, setAddress] = useState("");
  const [loading,setLoading] = useState(false);

	useEffect(() => {
		chrome.storage.local.get("current", res => {
			console.log(res);
			if (res.current) {
				console.log(res.current);
				setAddress(res.current.address);
				getWalletBalance(res.current.address);
			} else {
				Notice("warning", "没有账户", "");
			}
		});
	}, []);
	// 提交表单
	const onFinish = async (_values: any) => {
		console.log("Success:", _values);
    setLoading(true);
		try {
      const to = Address.fromString(_values.toAddr);
      const from = Address.fromString(address);
      const token = Token.fromWhole('1');
      const res = Transaction.getNew(to,from,token,Methods.Transfer).toJSON();
      console.log(res);
      setLoading(false);
      navigate('/wallet/transactionDetails',{state:res});
		} catch (e) {
      console.log(e);
			Notice("error", "转账地址错误", "");
      setLoading(false);
		}
	};

	const getWalletBalance = async (prop: string) => {
		const res = await getBalance({ walletAddr: prop });
		setfil(res.balance);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Return MiddleText={TRANSFER} />
			<Form
				name="basic"
				style={{ padding: "2rem" }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				layout="vertical">
				<Form.Item
					label="接收地址"
					name="toAddr"
					rules={[{ required: true, message: "Please enter the address you want to go to!" }]}>
					<Input
						size="large"
						suffix={<IdcardOutlined onClick={() => navigate("/wallet/accounts", { state: true })} />}
					/>
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "0" }}
					label="转账金额"
					name="value"
					rules={[{ required: true, message: "Please input your money!" }]}>
					{/* <Input size="large" suffix={<CaretLeftOutlined />} /> */}
					<NumericInput style={{}} value={value} onChange={setValue} />
				</Form.Item>
				{/* <i style={{ fontSize: "4px", color: "#7e7e7e" }}>需要保留一定余额作为gas费</i> */}
				<br />
				<br />
				<div style={{ display: "flex", justifyContent: "center" }}>可用余额:{fil}</div>
				<br />
				<br />
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={loading} style={{ width: "200px" }} type="primary" htmlType="submit">
						下一步
					</Button>
				</div>
			</Form>
		</>
	);
};

export default TransferPage;
