import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Modal } from 'react-bootstrap';


const AdminHome = () => {

    const deleteUser =async(id,name)=>{

        const cofirmDelete =window.confirm(`Are you sure to delete ${name}`)

        if(cofirmDelete){
            await axios.delete(`api/admin/deleteUser/${id}`)
            setUpdateUi((prevState)=>!prevState)
            toast.success('user deleted successfully');
        }else{
            toast.error("user not delete")
        }

    }
  const [show,setShow] = useState(false)
  const handleClose = ()=>setShow(false)

  const [users, setUsers] = useState([]);
  const [updateui,setUpdateUi] =useState(false)
  const [search, setSearch] = useState('');
  const [update,setUpdate] =useState({name:"",email:""})

  const editUser =(user)=>{
    setUpdate(user)
    setShow(true)

  }

  const editChange =(e)=>{
    e.preventDefault()
    const id =update._id;
    axios.put(`api/admin/editUser/${id}`,update).then((res)=>{
        setUsers((prevUser)=>{
            return prevUser.map((user)=>{
                if(user._id === id){
                    return{
                        ...user,
                        name:update.name,
                        email:update.email
                    }
                }
                return user
            });
        });
        toast.success("User Updated SuccessFully")
        setShow(false)
    }).catch((err)=>{
        console.error(err)
        
    })
  }


  useEffect(() => {
    axios.get('api/admin/findUsers')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateui]);

  const filteredData = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <FormContainer>
      <>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputGroup>
        <div className="text-center">
          <div className="row table-responsive col-lg-12">
            <table className="table table-bordered" style={{ width: '100%' }} id="productsTable">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  filteredData.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <a className="btn btn-primary" onClick={() => editUser(user)}>
                          Edit
                        </a>
                      </td>
                      <td>
                        <a className="delBtn btn btn-primary" onClick={() => deleteUser(user._id, user.name)}>
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">NO Users...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>

        {/* Modal */}
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                           
                        />
                    </div>

                  
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                          
                            placeholder="email"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    </FormContainer>
  );
};

export default AdminHome;
