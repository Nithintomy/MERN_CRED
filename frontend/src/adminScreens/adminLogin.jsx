import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/authSlice';
const AdminLogin = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passErr, setPassErr] = useState('')
    const nav = useNavigate()
    const dispatch = useDispatch();
    


    const AdminLogin = (e) => {
        e.preventDefault()

        axios.post('/api/admin/adminlogin', { email: email, password: password })
            .then((res) => {
                const adminDetails = res.data
                dispatch(setCredentials({...adminDetails}))
                setemail('')
                setpassword('')
                
                if (res.data) {

                    nav('/adminhome')
                }
                if (res.data.emailErr) {
                    setEmailErr(res.data.emailErr)
                }
                if (res.data.passErr) {
                    setPassErr(res.data.passErr)
                }
            })
            .catch((err) => {
                console.log(err, 'admin login post error ')
            })
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setEmailErr('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [emailErr]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPassErr('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [passErr]);


    return (

        <FormContainer>
            <form onSubmit={AdminLogin} >
                <h3>Admin-login</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                {
                    emailErr ? <div id="msg" class="alert alert-danger ml-4 ">{emailErr}</div> : ''
                }


                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>

                {
                    passErr ? <div id="msg" class="alert alert-danger ml-4 ">{passErr}</div> : ''
                }

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

            </form>
        </FormContainer>
    );
}

export default AdminLogin;
