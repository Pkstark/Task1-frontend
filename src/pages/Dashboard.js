import React, { useEffect, useState } from 'react'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';
import { ToastContainer, toast } from 'react-toastify'

function Dashboard() {
    const [UserData, setUserData] = useState([]);
    const [Data, setData] = useState('');

    // const toastOptions = {
    //     position: "bottom-right",
    //     autoClose: 4000,
    //     pauseOnHover: false,
    //     draggable: true,
    //     theme: "dark",
    //   }

    const post = () => {
        var elems = document.querySelectorAll('.modal');
        var trigg = M.Modal.init(elems, {})
    }

    useEffect(() => {
        GetData();
      }, [])
      
    const GetData = () => {
    
        axios.post("http://localhost:7000/quotedata").then((data) => {
          console.log(data.data)
          setUserData(data.data.data)
        }).catch((err) => {
            console.log(err)
        })

      }

      const HandleSubmit = (e) => {
        e.preventDefault();

        const pk = {
            name : Data.name,
            email : Data.email,
            address : Data.address,
            mobile : Data.mobile,
            department : Data.department
        }

        axios.post("http://localhost:7000/quote",pk).then((data) => {
            console.log(data);
            if(data.data.status === 1){     
                alert("Success")
                GetData();
            }else if(data.data.status === 0){
                alert("Wrong")
            }
        }).catch((err) => {
            console.log(err)
        })
      }

      const handleChange = (e) => {
        const name = e.target.name;
        setData({...Data,[name] : e.target.value})
      }
    return (
        <div>
            <nav className="nav-wraper indigo accent-1">
                <div className="container">
                    <div>
                        <a className="brand-logo left">LOGO</a>
                        <a className=' right btn style modal-trigger' data-target="change" onClick={post}>Add User</a>
                    </div>
                </div>
            </nav>


            <div className='container'>
               {UserData.map((data) => {
                return (<>
                      <div className='card'>
                        <div className='card-content'>
                            <div className='row s12'>
                                <div className='col s6'>
                                    <p>Name :&nbsp;&nbsp;&nbsp;{data.name}</p>
                                </div>
                                <div className='col s6'>
                                    <p>Email :&nbsp;&nbsp;&nbsp;{data.email}</p>
                                </div>
                            </div>
                            <div className='row s12'>
                                <div className='col s6'>
                                    <p>Department :&nbsp;&nbsp;&nbsp;{data.department}</p>
                                </div>
                                <div className='col s6'>
                                    <p>Mobile :&nbsp;&nbsp;&nbsp;{data.mobile}</p>
                                </div>
                            </div>
                            <div className='row s12'>
                                <div className='col s12'>
                                    <p>Address :&nbsp;&nbsp;&nbsp;{data.address}</p>
                                </div>
                            </div>
                        </div>
                      </div>
                </>)
               })}
            </div>
{/* 
            <ToastContainer/>
 */}


            <div id="change" className="modal z-depth-4 bg15">
                <form>
                    <div className="modal-content">
                        <h5 className='center'>Add User</h5>

                        <div className='row'>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="icon_prefix" type="text" name='name' className="validate" onChange={handleChange}/>
                                <label for="icon_prefix">Username</label>
                            </div>
                        </div>

                        <div className='row s12'>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">email</i>
                                <input id="icon_prefix" type="text" name='email' className="validate" onChange={handleChange}/>
                                <label for="icon_prefix">Email</label>
                            </div>

                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="icon_prefix" type="text" name='department' className="validate" onChange={handleChange}/>
                                <label for="icon_prefix">Department</label>
                            </div>

                        </div>

                        <div className='row s12'>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">add_location</i>
                                <input id="icon_prefix" type="text" name='address' className="validate" onChange={handleChange}/>
                                <label for="icon_prefix">Address</label>
                            </div>

                            <div className="input-field col s6">
                                <i className="material-icons prefix">add_location</i>
                                <input id="icon_prefix" type="text" name='mobile' className="validate" onChange={handleChange}/>
                                <label for="icon_prefix">Mobile</label>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer bg16">
                        <button type='submit' className='btn mod modal-close style1'>Cancel</button>&nbsp;&nbsp;
                        <button type='submit' className='btn mod modal-close style1' onClick={HandleSubmit}>add</button>
                    </div>
                </form>
            </div>
        </div>



    )
}

export default Dashboard