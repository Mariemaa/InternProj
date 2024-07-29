import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import login from '../assets/IconLogo.png'; 
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../Hooks/useAuth';

// Validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

type LoginFormInputs = {
    email: string;
    password: string;
};

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

     const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');

    // react-hook-form setup
    const {  handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const handleLogin = async (formData: LoginFormInputs) => {
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(JSON.stringify(response.data));
            const accessToken = response.data.accessToken;
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol
                    col='10' md='6'
                    className="d-flex justify-content-center align-items-center"
                    style={{ backgroundImage: `url(${login})`, backgroundSize: '690px 650px', backgroundPosition: '30% 50%' }}
                >
                    <div className="text-center text-secondary custom-padding" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '10px' }}>
                        <h4 className="mt-1 mb-5 pb-1">Login</h4>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <MDBInput
                                wrapperClass={`mb-4 ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Email" 
                                id='email'
                                type='email'
                        
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            {errors.email && <div className="text-danger">{errors.email.message}</div>}
                            <MDBInput
                                wrapperClass={`mb-4 ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Password" 
                                id='password'
                                type='password'
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            {errors.password && <div className="text-danger">{errors.password.message}</div>}
                            <MDBBtn type="submit" className="mb-4 w-100 btn btn-secondary">Sign in</MDBBtn>
                        </form>
                        {errMsg && <p className="text-danger">{errMsg}</p>}
                        <a className="text-muted" href="#!">Forgot password?</a>
                    </div>
                </MDBCol>
                <MDBCol col='6' md='5'>
                    <div className="d-flex flex-row align-items-center justify-content-center" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)', height: '80vh', borderRadius: '10px' }}>
                        <p className="lead fw-normal mb-0 me-3 text-white">Welcome</p>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;
