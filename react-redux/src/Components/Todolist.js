import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Modal } from 'react-responsive-modal';
import '../../node_modules/react-responsive-modal/styles.css';
import './todorender.css'
import Reducer from './redux/reduxinfo/Usereducer';
const Todolist=()=> {
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[Getprevalue,setPrevalue]=useState('');
    const [updatename,setUpdateName]=useState('');
    const [updateID,setUpdateID]=useState('');
    const [updateEmail,setUpdateEmail]=useState('');
    const [loading,setloading]=useState(false);
    const [open, setOpen] = useState(false);
    const usedispatch=useDispatch();
    const Getvaluestore=useSelector(state=>state);
    console.log("data",Getvaluestore);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    // this submit handler method, in this method, dispatch hooks call, send userform value in redux store.
        const Submithandler=(e)=>{
            e.preventDefault();
            setloading(true);
            setTimeout(()=>{
                usedispatch({ type:'adduser', id:Math.random().toString(), name,email});
                    setloading(false);
                    setname("");
                    setemail("");
            },1000)}
// this is function for preview value of any specific IdleDeadline.
            function Previewvalue(id){
                Getvaluestore.map((prevalue)=>{
                 const Prevalue=prevalue.id===id?{id:prevalue.id,prename:prevalue.name,preemail:prevalue.email}:null
                 setPrevalue(Prevalue)
                 });
            }
    //this is methood use for get value of update user 
          const Getof_Updatevalue=(index)=>{
            setUpdateName(Getvaluestore[index].name);
            setUpdateEmail(Getvaluestore[index].email);
            setUpdateID(Getvaluestore[index].id)
            onOpenModal();
          }
    // this is method update value, call dispatch hooks in redux Reducer.
    const UpdateSubmitHandler=(e)=>{
         e.preventDefault();
         usedispatch({type:'edite',name:updatename,email:updateEmail,id:updateID});
         onCloseModal();
    }
    // remove value of user
      const removevalue=(index,id)=>{
        usedispatch({index:index,type:'delete'});
        Previewvalue(id);
      }
  return <>
  {/* this is user form jsx code */}
     <div style={{ marginTop:'10px' }}>
                <h3>Todolist React Redux:</h3>
                    <form onSubmit={Submithandler} autoComplete="ON" className="form-box">
                    <label htmlFor='name'>Name:</label>
                    <input type="text" placeholder='enter name' id="name" value={name}  onChange={(e)=>{  setname(e.target.value)}} required />
                    <br/>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" placeholder='enter email' id="email" value={email}  onChange={(e)=>{setemail(e.target.value)}}  required/><br/>
                    {loading===true?<button type="submit"><i className="fa fa-spinner fa-spin" style={{fontSize:'24px',marginRight:'5px'}}/>loading...</button>:<button type="submit">submit</button>}
                </form>
       </div>
       {/* close form tag */}
       {/* start table , rendering value */}
        <table  id="customers">       
        <tr>
        <th>Name</th><th>Email</th><th>Delete</th> <th>Preview</th><th>Edite</th></tr>
        {
        Getvaluestore.map((items,index)=>{
         return(<>
            <tr key={index}>
            <td>{items.name}</td> <td>{items.email}</td> 
            <td className='operation' onClick={ ()=>{removevalue(index,items.id)}}><i class="fa fa-trash-o" style={{ fontSize:'24px' }}></i></td> 
            <td className='operation' onClick={()=>{Previewvalue(items.id)}}><i class="fa fa-eye"  style={{ fontSize:'24px' }}></i></td>
            <td className='operation' onClick={()=>{Getof_Updatevalue(index)}}><i class="fa fa-edit" style={{ fontSize:'24px' }}></i></td></tr>
            </>)}) }</table>
{/* now start the Previewvalue code of specific id */}
            {Getprevalue&&
            (<table id="customers" style={{ marginTop:'40px' }}>
            <tr><th>Name</th><th>Email</th></tr>
            <tr><td>{Getprevalue.prename}</td> <td>{Getprevalue.preemail}</td></tr>
            </table>) }

           {/* // now starting the update modal box code  */}
           <Modal open={open} onClose={onCloseModal} center style={{ width:'60%' }}>
          <br/>
        <h2>Update the Values React Redux </h2>
              <Form onSubmit={UpdateSubmitHandler}>
              <Form.Group className="mb-3" controlId="formBasicid">
              <Form.Control type="hidden" name="id" value={updateID}  />
               </Form.Group>
                <Form.Group className="m-3 py-5" controlId="formBasicname">
                <Form.Label>Name:  </Form.Label>
                <Form.Control type="text" name="name"  value={updatename} onChange={(e)=>{setUpdateName(e.target.value)}}/>
               </Form.Group><br/>
               <Form.Group className="m-3 py-5" controlId="formBasicemail">
                <Form.Label>Email:   </Form.Label>
                <Form.Control type="email" name="name"  value={updateEmail} onChange={(e)=>{setUpdateEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUpdate">
                <Form.Control className="button" type="submit" value="Edite" style={{margin:'15px'}}/>
                </Form.Group>
            </Form> 
      </Modal> 
           </>}
export default Todolist;
