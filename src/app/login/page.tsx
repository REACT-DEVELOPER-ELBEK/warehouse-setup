"use client";
import { loginUser } from "@/redux/slicers/login";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Button, Flex, Form, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { Title } = Typography;
  const [isPassword, setIsPassword] = useState(true);
  const dispatch = useDispatch<AppDispatch>()
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  function passwordChange(e:any){
    const {name, value} = e.target
    setLogin((data)=>({
      ...data, [name]:value
    }))
  }
  const data = useSelector((state:RootState)=>state.login.data)

  function submitUser(){
    dispatch(loginUser(login))
  }
  return (
    <div style={{ padding: "0 200px" }}>
      <Flex align="center" justify="space-between">
        <div className="login__form">
          <Title level={2}>Добро пожаловать, пользователь</Title>
          <Form layout="vertical" style={{ maxWidth: "80%" }}>
            <Form.Item label="Username">
              <Input
                type="text"
                placeholder="Username"
                style={{ padding: "10px 30px" }}
                name="username"
              />
            </Form.Item>
            <Flex align="center">
              <Form.Item label="Password">
                <Input
                  type={isPassword?"password":"text"}
                  placeholder="Password"
                  style={{ padding: "10px 10px", width: "360px" }}
                  name="password"
                  onChange={passwordChange}
                />
              </Form.Item>
              <Button
                type="text"
                style={{ marginLeft: "-40px", marginTop: "10px" }}
                onChange={passwordChange}
                onClick={()=>isPassword?setIsPassword(false):setIsPassword(true)}
                icon={isPassword?<FaEye />:<FaEyeSlash/>}
              />
            </Flex>
            <Button onClick={submitUser} type="primary">Submit</Button>
          </Form>
        </div>
        <img
          height="500vh"
          src="https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png"
          alt="logo"
        />
      </Flex>
    </div>
  );
};

export default Login;
