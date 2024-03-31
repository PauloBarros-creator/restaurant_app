import { useState } from "react";
import axios from 'axios';
import HomeWaiter from './Waiter/home_waiter.js'
import HomeChef from './Chef/home_chef.js'
import HomeManager from './Manager/home_manager.js'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
        const response = await axios.post("http://localhost:3000/login",
            JSON.stringify({email, password}),
            {
                headers: { "Content-type": "application/json" }
            });

            setUser(response.data);
        } catch (error) {
            if(!error?.response){
                setError("Error accessing the server");
            }else if (error.response.status == 401) {
                setError("Invalid email or password")
            }
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
        setError("");
    };
    return (
   
          <div className="login-form-wrap">
            {user == null ? (
                <div>
            <h2 >Login</h2>
            <form className="login-form">
              <input type="email"  
                        name="email" 
                        placeholder="Email" 
                        required 
                        onChange={(e) => setEmail(e.target.value)}
                        />
              <input type="password"
                        name="password"
                        placeholder="Password"  
                        required 
                        onChange={(e) => setPassword(e.target.value)}
                        />
              <button type="submit" 
                        className="btn-login"
                        onClick={(e) => handleLogin(e)}>Login</button>
            </form>
            <p>{error}</p>
            </div>
            ): (
                <div>
                    {user.role === 'manager' ? (
                        <HomeManager user={user}/>
                         ) : user.role === 'chef' ? (
                        <HomeChef user={user}/>
                        ) : (
                        <HomeWaiter user={user}/>
                        )}
                        <button type="buttom" 
                            className="btn-login"
                            onClick={(e) => handleLogout(e)}>Logout</button>
                </div>

            )}
          </div>
    );
  };

export default Login;