import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Link, Typography, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import InputField from "../../../components/FormControls/InputField";
import PasswordField from "../../../components/FormControls/PasswordField";
import useWindowDimensions from "../../../customHook/WindowDimensions";
import { login } from "../userSlice";

import jwtDecode from "jwt-decode";
import StorageKeys from "../../../constants/storage-keys";
import { useNavigate } from "react-router-dom";
import "./index.scss";

import images from "../../../assets/images";

Login.propTypes = {};

function Login(props) {
  const location = useLocation();
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup
    .object()
    .shape({
      user_name: yup
        .string()
        .required("Please enter your username")
        .test(
          "should has at least 5 characters",
          "Please enter at least 5 characters ",
          (values) => {
            return values.length >= 5;
          }
        ),
      password: yup
        .string()
        .required("Please enter your password")
        .min(6, "Please enter at least 6 characters"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      user_name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    try {
      const action = login(values);

      const resultAction = await dispatch(action);
      console.log(resultAction);
      unwrapResult(resultAction);

      enqueueSnackbar("Logged in successfully", { variant: "success" });
      setTimeout(() => {
        if (location.pathname === "/login") navigate("/home");
        else document.location.reload();
      }, 1000);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };
  const handleSuccess = (credentialResponse) => {
    // Xử lý kết quả đăng nhập thành công

    localStorage.setItem(StorageKeys.TOKEN, JSON.stringify(credentialResponse.credential));
    let tok = localStorage.getItem(StorageKeys.TOKEN);
    const UserGoogle = jwtDecode(credentialResponse.credential);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(UserGoogle));
    if (!tok) {
      return;
    }
    enqueueSnackbar("Logged in successfully", { variant: "success" });
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const handleFailure = (response) => {
    console.log(response);
    // Xử lý kết quả đăng nhập thất bại ở đây
  };

  return (
    <>
      <div className='container'>
        <div className='navbar'>
          <a href='' style={{ display: "flex" }}>
            <img className='logo' src={images.logo} />
            <h2>SAMNOTE</h2>
          </a>
          <ul className='navbar-list-item'>
            <li>
              <a href=''>ABOUT SAMNOTE</a>
            </li>
            <li>
              <a href=''>FEATURE</a>
            </li>
            <li>
              <a href=''>FOR INDIVIDUAL</a>
            </li>
            <li>
              <a href=''>FOR GROUP</a>{" "}
            </li>
            <li>
              <a href=''>HELP</a>
            </li>
          </ul>
          <Button
            sx={{
              color: "#000",
              fontSize: "0.9rem",
              marginLeft: "2px",
              ml: "1.8rem",
            }}
          >
            Sign in
          </Button>
          <Button
            sx={{
              height: "35px",
              color: "#3A4BE0",
              fontSize: "0.9rem",
              border: "1px solid #3A4BE0",
              borderRadius: "6px",
              ml: "1.6rem",
              mt: "7px",
            }}
          >
            Download
          </Button>
        </div>
      </div>
      <Box
        sx={{
          height: "600px",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${images.bgrLogin})`,
        }}
      >
        <Box>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "68%",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "2rem",
                    fontWeight: "700",
                  }}
                >
                  SAMNOTE
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "1.8rem",
                    fontWeight: "700",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur. Etiam mauris dignissim phasellus blandit.
                  Malesuada donec m
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "70%",
                  minWidth: "400px",
                  height: "90%",
                  maxWidth: "1500px",
                  maxHeight: "615px",
                  borderRadius: "10px",
                  minHeight: "350px;",
                  backgroundColor: "white",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: "10px 35px",
                  overflow: "hidden auto",
                }}
                className='box-container'
              >
                <Box sx={{ display: "flex" }}>
                  {window.width > 1200 ? (
                    <img
                      src='../../../assets/login.jpg'
                      style={{
                        width: "50%",
                        minWidth: "450px",
                        maxWidth: "500px",
                        objectFit: "contain",
                      }}
                      alt='login-jpg'
                    />
                  ) : (
                    ""
                  )}

                  <Box
                    sx={{
                      flex: "1 1",
                      padding: "0 10px 0 15px",
                      maxWidth: "500px",
                      margin: "0 auto",
                    }}
                  >
                    <form
                      style={{ display: "flex", flexDirection: "column" }}
                      onSubmit={form.handleSubmit(handleSubmit)}
                    >
                      <InputField label='User name or gmail ' name='user_name' form={form} />
                      <PasswordField label='Password' form={form} name='password' />

                      <Button
                        size='large'
                        sx={{ marginTop: 1, color: "#fff", backgroundColor: "#3A4BE0" }}
                        type='submit'
                      >
                        Log in
                      </Button>
                    </form>

                    <Box sx={{ textAlign: "center", marginTop: "26px" }}>
                      <Link href='/fogot' underline='hover' color='#000' fontWeight='600'>
                        Forgotten password?
                      </Link>
                      <Button
                        size='large'
                        sx={{
                          marginTop: 1,
                          color: "#fff",
                          backgroundColor: "#7BD15D",
                          width: "100%",
                        }}
                        type='submit'
                      >
                        Create a new account
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Login;
