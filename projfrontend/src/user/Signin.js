import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import Base from '../core/Base'
import {Link,Redirect} from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '../auth/helper'

function Signin() {

    const [values,setValues] = useState({
        email:"kshitij@gmail.com",
        password:"12345",
        error:"",
        loading:false,
        didRedirect:false,
    })
    const { email,password,loading,didRedirect,error}= values;
    const {user} = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    const handleSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
            .then(data=>{
                console.log("data.error="+data.error + typeof(data.error))
                if(data && data.error){
                    console.log("data.erro="+data.error)
                    setValues({...values,error:data.error,loading:false})
                }
                else{
                    authenticate(data,()=>{
                        setValues(
                            {...values,
                            didRedirect:true,
                            error:false,
                            loading:true})
                    })
                }
            })
            .catch(err=>{
                console.log("Signin request failed :" + err.msg);
            })
    }

    const performRedirect = ()=>{
        //TODO: Do a redirection    
        if(didRedirect){
            if(user && user.role ===1){
                return <Redirect to = "/admin/dashboard"/>
            }
            else{
                return <Redirect to = "/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    const loadingMessage = ()=>{
        return (
            
            loading &&  (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    Loading
                </div>
            </div>)
        )
    }
    const errorMessage = ()=>{
        return (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger" style={{display:error ?"":"none"}}>
                    {console.log(error)}
                    {error}
                </div>
            </div>
            </div>   
        )
    }

    const signInForm = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label text-light">Email</label>
                            <input onChange={handleChange("email")} value ={email} type="email" className="form-control"  name="" id="" />
                        </div>
                        <div className="form-group mb-3">
                            <label  className="form-label text-light">Password</label>
                            <input onChange={handleChange("password")} value={password} type="password"className="form-control"   />
                        </div>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block ">Signin</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signin Page" description="A page for User to Signin">
            {performRedirect()}
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}

            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin
