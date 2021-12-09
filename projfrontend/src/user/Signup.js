import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper'

function Signup() {

    const [values,setValues]= useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });
    const { name,email,password,error,success}= values;

    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const handleSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:false})
        signup({name,email,password})//from auth
        .then(data=>{
            console.log("data.error="+data.error + typeof(data.error))
            if(data && data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues(
                    {...values,
                     name:"",
                     email:"",
                     password:"",
                     error:"",
                     success:true
                })
            }
        })
        .catch(err=>{
            console.log(err.array())
            console.log("error in Signup : "+err.message)
        })
    }

    const successMessage = ()=>{
        return (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success" style={{display:success ?"":"none"}}>
                    New Account Created succesfully.
                    Please <Link to="/signin"  >Login Here</Link>
                </div>
            </div>
            </div>
        )
    }
    const errorMessage = ()=>{
        return (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger" style={{display:error ?"":"none"}}>
                    {error}
                </div>
            </div>
            </div>   
        )
    }
    const signUpForm = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label text-light">Name</label>
                            <input type="text" className="form-control" onChange={handleChange("name")} value={name} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label text-light">Email</label>
                            <input type="email"className="form-control" onChange={handleChange("email")} value={email}  />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label text-light">Password</label>
                            <input type="password"className="form-control"onChange={handleChange("password")} value={password}  />
                        </div>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block ">Signup</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="Signup Page" description="A page for User to Signup">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup
