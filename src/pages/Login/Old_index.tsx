// @ts-nocheck
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/admin_logo.png";
import illustrationUrl from "../../assets/images/illustration.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import Alert from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";
import loginImg from "../../assets/images/login_img.png";

import { userLogin } from "./loginSlice"
import { verifyUserLogin } from "./verifyLogin"

import { useAppSelector, useAppDispatch } from "../../stores/hooks";

function Main() {
    const dispatch = useAppDispatch();

    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')

    const [alertMessage, setAlertMessage] = useState('')

    const adminLogin = async () => {
        let loginResp = await dispatch(userLogin({ "email": userEmail, "password": userPass }))

        if (loginResp.payload !== undefined) {
            console.log(loginResp)
            setAlertMessage('')
            window.location.href = '/'
        } else {
            setAlertMessage("login failed please try again")
        }
    }

    const verifyLogin = async () => {
        let verificationResponse = await dispatch(verifyUserLogin());
        if (verificationResponse.payload.success === true) {
            window.location.href = '/'
        }
    }

    useEffect(() => {
        verifyLogin()
    }, []);

    return (
        <>
            <div
                className={clsx([
                    "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
                    "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
                    "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
                ])}
            >
                {/* <DarkModeSwitcher />
                <MainColorSwitcher /> */}
                <div className="container relative z-10 sm:px-10">
                    <div className="block grid-cols-2 gap-4 xl:grid">
                        {/* BEGIN: Login Info */}
                        <div className="flex-col hidden min-h-screen xl:flex">
                            <a href="" className="flex items-center pt-5 -intro-x">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    className="w-52 ml-16 mt-16"
                                    src={logoUrl}
                                />
                                {/* <span className="ml-3 text-lg text-white"> Rubick </span> */}
                            </a>
                            <div className="my-auto">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    className="w-1/2 -mt-20 -intro-x"
                                    src={loginImg}
                                />
                                <div className="mt-10 text-5xl font-bold italic leading-tight text-white -intro-x">
                                    Welcome to SST
                                </div>
                            </div>
                        </div>
                        {/* END: Login Info */}
                        {/* BEGIN: Login Form */}
                        <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
                            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                                    Sign In
                                </h2>
                                {
                                    alertMessage === ''
                                        ? null
                                        : <Alert variant="soft-danger" className="flex items-center mt-2">
                                            <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" />{" "}
                                            {alertMessage}
                                            <Alert.DismissButton type="button" className="btn-close" onClick={() => setAlertMessage('')} aria-label="Close">
                                                <Lucide icon="X" className="w-4 h-4" />
                                            </Alert.DismissButton>
                                        </Alert>
                                }
                                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                                    A few more clicks to sign in to your account. Manage all your
                                    e-commerce accounts in one place
                                </div>
                                <div className="mt-8 intro-x">
                                    <FormInput
                                        type="text"
                                        className="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[450px]"
                                        placeholder="Email"
                                        onChange={(event) => setUserEmail(event.target.value)}
                                    />
                                    <FormInput
                                        type="password"
                                        className="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[450px]"
                                        placeholder="Password"
                                        onChange={(event) => setUserPass(event.target.value)}
                                    />
                                </div>
                                <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                                    <div className="flex items-center mr-auto">
                                        <FormCheck.Input
                                            id="remember-me"
                                            type="checkbox"
                                            className="mr-2 border"
                                        />
                                        <label
                                            className="cursor-pointer select-none"
                                            htmlFor="remember-me"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="">Forgot Password?</a>
                                </div>
                                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                                    <Button
                                        variant="primary"
                                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                                        onClick={() => adminLogin()}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* END: Login Form */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
