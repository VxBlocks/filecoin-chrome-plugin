import React,{useState,useEffect} from "react";
import { Link, Outlet,useNavigate } from "react-router-dom";
import { Col, Menu, Row } from "antd";
import "./wallet.less";

export default function Wallet() {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);

  // 菜单开关
  const handler = () => {
		if (!open) {
			navigate("/wallet/setting");
		}else{
			navigate("/wallet");
    }
		setOpen(!open);
	};
	return (
		<div className="wallet-container">
			<div className="header">
				<Row align="middle" style={{ display: "flex", justifyContent: "space-between" }}>
					<Col>
						<img style={{ width: 25, height: 25 }} src="images/filcoin.svg" alt="" />
					</Col>
					<Col onClick={handler}>
						<i
							style={{ fontSize: "25px", cursor: "pointer" }}
							className={`iconfont ${open ? "icon-cuowuguanbiquxiao" : "icon-xitongpeizhi"}`}></i>
					</Col>
				</Row>
			</div>
			<div style={{overflow:'hidden',marginBottom:'60px'}}>
				<Outlet />
			</div>
			<footer>
				<Menu
					mode="horizontal"
					defaultSelectedKeys={["钱包详情"]}
					items={item.map(item => {
						return {
							key: item.name,
							label: (
								<Link to={item.link}>
									<i className={`iconfont ${item.icon}`}></i>
									<p>{item.name}</p>
								</Link>
							),
						};
					})}
				/>
			</footer>
		</div>
	);
}
const item = [
	{ name: "钱包详情", link: "/wallet", icon: "icon-31shouye" },
	{ name: "活动记录", link: "/wallet/activityList", icon: "icon-jiaoyimingxi" },
]

