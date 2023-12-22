import {React,useState} from 'react'
import { CloseRounded, Http, Logout } from '@mui/icons-material';
import '../css/Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeIcon from "@mui/icons-material/Home";
import { Button } from '@mui/material';
import img from "../../assets/lj2.png"
import { ContactMail } from '@mui/icons-material';
import firestore from "../../database/firebase"
import {auth} from "../../database/firebase"
import {useAuthState} from 'react-firebase-hooks/auth';


function Sidebar() {
    const [user] = useAuthState(auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState("");
    const [newuname, setNewUname] = useState("");
    const [newDesc, setNewDesc] = useState("");

    const date = new Date();

    const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });

    const handleAdd = async (e) => {
        e.preventDefault();
        await firestore.collection("confess").add({uid:user.uid, name: user.displayName,email:user.email, desc: newDesc, date: formattedDate,img:user.photoURL,like:0,likestatus:false,comment:[],time: new Date().getTime().toLocaleString()}).then(()=>{
            closeModal()
        });
        setNewItem("");
        setNewDesc("");
        setNewUname("")
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const logout = () => {
        auth.signOut();
    }
    return (
        <div className="sidebar">
           
            {/*Twitter icon */}
           <div style={{display:"flex",justifyContent:"space-around"}}>
           <img style={{maxWidth:"20%", paddingLeft:"30px"}} src={img}/>
           <h2>LJ Insider's</h2>
           </div>
            
            {/*SIDEBAROPTION */}
    
            <SidebarOption active Icon={HomeIcon} text="Home" link="/"/>
            <SidebarOption Icon={ContactMail} text="Feedback" link="/"/>
           
       {/*button -> tweet */}
       <Button variant="outlined" className="sidebar__logout" fullWidth onClick={logout}>Logout</Button>
       <Button variant="outlined" className="sidebar__tweet" fullWidth onClick={openModal} >
                Post
            </Button>

     {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal__content">
                            <form className="modal__form">
                                <label>
                                    {/* Description:<input type="" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required/> */}
                                    Description:<textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required></textarea>

                                </label>
                                <button type="submit" onClick={handleAdd}>
                                    Add
                                </button>
                            </form>
                        </div>
                        <button className="close-button" onClick={closeModal}>
                            <CloseRounded/>
                        </button>
                    </div>
                </div>
            )}
            </div>
    )
}

export default Sidebar
