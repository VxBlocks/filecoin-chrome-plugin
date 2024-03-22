import React, { useEffect, useState } from "react";
import Return from "../../../../components/Return";
import { useLocation } from "react-router-dom";
import { Divider, Skeleton, Tooltip } from "antd";
import Clipboard from "copy-to-clipboard";
import { ToolTip } from "../../../../components/ToolTips";
import EllipsisMiddle from "../../../../api/EllipsisMiddle";

interface DataObj {
	cid: string;
	to?: Addr;
	from?: Addr;
	nonce: number;
	height: number;
	method: number;
	params: string;
	value: string;
	gasFeeCap: string;
	gasPremium: string;
	gasLimit: number;
	__typename: string;
}
interface Addr {
	id: string;
	robust: string;
	__typename: string;
}

const ActivityDetails = () => {
	const { state } = useLocation();
	const [data, setData] = useState({} as DataObj);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getTransition();
	}, []);

	const getTransition = async () => {
		try {
			console.log(state);
			const res = await fetch("https://graph-wallaby.glif.link/query", {
				credentials: "omit",
				headers: {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0",
					Accept: "*/*",
					"Accept-Language": "en-US,en;q=0.5",
					"content-type": "application/json",
					"Sec-Fetch-Dest": "empty",
					"Sec-Fetch-Mode": "cors",
					"Sec-Fetch-Site": "cross-site",
					Pragma: "no-cache",
					"Cache-Control": "no-cache",
				},
				referrer: "https://explorer.glif.io/",
				body: `{"operationName":"Message","variables":{"cid":"${state}"},"query":"query Message($cid: String!) {\\n  message(cid: $cid) {\\n    cid\\n    to {\\n      id\\n      robust\\n      __typename\\n    }\\n    from {\\n      id\\n      robust\\n      __typename\\n    }\\n    nonce\\n    height\\n    method\\n    params\\n    value\\n    gasFeeCap\\n    gasPremium\\n    gasLimit\\n    __typename\\n  }\\n}"}`,
				method: "POST",
				mode: "cors",
			});
			const { data } = await res.json();
			if (data) {
				console.log("请求的数据", data);
				setData(data.message);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const copyFunction = (text: string) => {
		Clipboard(text);
		ToolTip.success("复制成功");
	};
	return (
		<Skeleton active loading={loading}>
			<Return MiddleText={"活动详情"} />
			<div style={{ padding: "1rem" }}>
				<br></br>
				<p className="arrangement">
					<div>
						<p style={{ marginBottom: "0.2rem" }}>状态</p>
						<p>已确定</p>
					</div>
					<div>
						<Tooltip title="跳转到区块链浏览器">
							<p style={{ marginBottom: "0.2rem" }}>
								<a href={`https://imfil.io/messages/${data.cid}`} target="_blank">
									<img width={20} src="/images/imfil.svg" alt="" />
								</a>
							</p>
						</Tooltip>
						<Tooltip title="复制交易ID">
							<p className="element" onClick={() => copyFunction(data.cid)} style={{ textAlign: "right" }}>
								<i className="iconfont icon-copy-template"></i>
							</p>
						</Tooltip>
					</div>
				</p>
				<Divider />
				<p className="arrangement">
					<span>From</span>
					<span>{EllipsisMiddle({ suffixCount: 8, children: data.from?.robust || "" })}</span>
				</p>
				<Divider />

				<p className="arrangement">
					<span>To</span>
					<span>{EllipsisMiddle({ suffixCount: 8, children: data.to?.robust || "" })}</span>
				</p>
				<Divider />

				<p className="arrangement">
					<span>Account</span>
					<p>
						<span style={{ fontSize: "22px" }}>{Number(data.value) / 10 ** 18} </span>
						<i>FIL</i>
					</p>
				</p>
				<Divider />
				<p className="arrangement">
					<span>Gas:</span>
					<span>{Number(data.gasFeeCap) / 10 ** 18}FIL</span>
				</p>
			</div>
		</Skeleton>
	);
};

export default ActivityDetails;
