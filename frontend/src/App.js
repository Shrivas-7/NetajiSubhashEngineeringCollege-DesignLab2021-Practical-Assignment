import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Axios from 'axios'

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");

    const [lpassword, setlpass] = useState("");
    const [lemail, setlEmail] = useState("");

    const [updatename, setun] = useState("");
    const [updatemobile, setmob] = useState(0);
    const [img,setImg]= useState("");
    const [isImgUploaded, setisImgUploaded] = useState(false);
    const [imgUrl,setImgUrl] = useState("");
   

    const[loginchck,setlog] = useState(false);

    const register = () =>{
      Axios.post('http://localhost:3001/register',{username : name,
    email :email ,password : password,mobile:contact})
    .then((response)=>{
      console.log(response);
    });
    }

    const update = () =>{
      Axios.post('http://localhost:3001/update',{username : updatename,
    email :lemail,mobile:updatemobile})
    .then((response)=>{
      console.log(response);
    });
    }

    const uploadImg = () =>{

      if(img)
      {
        setisImgUploaded(true);
        const formData = new FormData();
        formData.append("file",img)
        formData.append("upload_preset","m0hbssic")
        Axios.post("https://api.cloudinary.com/v1_1/dw1zpq6gn/image/upload",formData)
        .then((response) =>{
          console.log(response.data.secure_url)
          setImgUrl(response.data.secure_url)
          Axios.post('http://localhost:3001/upload',{
          email :lemail,photo:response.data.secure_url})
        });
        
        
          
      }
    }

    const Login = (e) =>{
      e.preventDefault();
      
      Axios.post('http://localhost:3001/login',{
    email :lemail ,password : lpassword})
    .then((response)=>{
      if(response.data.message){
       
        // setloginstatus(response.data.message)
        
      }
      else{
        
        // setloginstatus(response.data[0].name)
        // setloginstatus1(response.data[0].email)
        // setloginstatus2(response.data[0].mobile)
        // var dname = document.getElementById('dname');
        // var dmobile = document.getElementById('dmobile');
        
        // dname.value = response.data[0].name
        // dmobile.value = response.data[0].mobile
        // console.log(response.data[0])
        setlog(true)
        setun(response.data[0].name)
        setmob(response.data[0].mobile)
        if(response.data[0].image)
        {
          setImgUrl(response.data[0].image)
          setisImgUploaded(true)

        }
        
      }
      
    });
    };
  return(
    <>
         <h1>New User? Register</h1>
         <form action="">
         <div>
                 <label htmlFor = "name">Name</label>
                 <input type ="text" name="name" id="name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}/>
             </div>
             <div>
                 <label htmlFor = "email">Email</label>
                 <input type ="email" name="email" id="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}/>
             </div>
             <div>
                 <label htmlFor = "password">Password</label>
                 <input type ="password" name="password" id="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}/>
             </div>
             <div>
                 <label htmlFor = "phno">Mobile</label>
                 <input type ="number" name="phno" id="phno"
                 value={contact}
                 onChange={(e) => setContact(e.target.value)}/>
             </div>
             <button type="submit" onClick={register}>Register</button>
         </form>

         <h1>Existing User? Login</h1>
         <form action="">
             <div>
                 <label htmlFor = "email">Email</label>
                 <input type ="email" name="email" id="lemail"
                value={lemail}
                onChange={(e) => setlEmail(e.target.value)}/>
             </div>
             <div>
                 <label htmlFor = "password">Password</label>
                 <input type ="password" name="password" id="lpassword"
                 value={lpassword}
                 onChange={(e) => setlpass(e.target.value)}/>
             </div>
             <button type="submit" onClick={Login}>Login</button>

         </form>
         <div>
           {/* <h1>{loginstatus}</h1>
           <h1>{loginstatus1}</h1>
           <h1>{loginstatus2}</h1> */}
          { loginchck?
          <>
            <span>Name : 
            <input type="text" id = "dname"
            value={updatename}
            onChange={(e) => setun(e.target.value)}/><br></br></span>
            <span>Mobile No:
            <input type="int" id = "dmobile"
            value={updatemobile}
            onChange={(e) => setmob(e.target.value)}/></span>
            <button onClick ={update}>Update</button>
            <br />
            <div>Upload Image</div>
            <input type="file" accept="image/*" onChange={(e)=>{
              setImg(e.target.files[0])
            }}/>
            <button onClick={uploadImg}>Upload</button>
            </>
            :null
          }
          { isImgUploaded?
            <img src = {imgUrl} />
            :null
          }
           
         </div>
        
     </>
 )
}

export default App;
