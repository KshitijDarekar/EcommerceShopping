import React,{Fragment} from 'react'
import { Link,withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper'
// import { useHistory } from 'react-router-dom'

// const history = useHistory();
const activeTab = (history,path)=>{
    if(history.location.pathname=== path){
        return {color:"#FFFFFF"}
    }
    else{
        return {color:"#d1d1d1 "}
    }
}

function Navbar({history}) {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style = {activeTab(history,"/")}className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style = {activeTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
                </li>
                {isAuthenticated()&& isAuthenticated().user.role==0 &&(
                     <li className="nav-item">
                         <Link style = {activeTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role===1 && (
                    <li className="nav-item">
                        <Link style = {activeTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                    </li>                
                )}
                { !isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link style = {activeTab(history,"/signup")} className="nav-link" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link style = {activeTab(history,"/signin")} className="nav-link" to="/signin">Signin</Link>
                    </li>
                </Fragment>                
                )}
                {isAuthenticated() && (
                <li className="nav-item">
                    <span
                    onClick={()=>{// onclick = {callback( signout(callback()) )}
                        signout(()=>{
                            history.push("/")
                        })
                    }
                    }
                    style = {activeTab(history,"/signout")} 
                    className="nav-link text-warning" to="/signout">
                    Signout
                    </span>
                </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Navbar)
