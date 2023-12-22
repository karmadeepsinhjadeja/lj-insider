import { Avatar,Button } from '@mui/material';
import {React,useState} from 'react'
import "../css/Post.css";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChatBubbleOutLineIcon from "@mui/icons-material/ChatBubbleOutline"
import ReapeatIcon from "@mui/icons-material/Repeat"
import FavouriteIcon from "@mui/icons-material/FavoriteBorder"
import PublishIcon from "@mui/icons-material/Publish"
import firestore from '../../database/firebase';
// import firestore from "../../database/firebase"
import {auth} from "../../database/firebase"
import {useAuthState} from 'react-firebase-hooks/auth';
import { CloseRounded, Http, Logout } from '@mui/icons-material';
function Post({
  uid,
  displayName,
  username,
  verified,
  text,
  timestamp,
  image,
  avatar,
  like,
  likestatus,
  comment,
  time
}) {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newuname, setNewUname] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [user] = useAuthState(auth);

  const date = new Date();
  const makelike=async()=>{
    await firestore.collection("confess").doc(uid).update({like:like+1,likestatus:true}).then(async()=>{
      
    })
  }
  const openModal = () => {
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
};
const handleAdd = async (e) => {
  // e.preventDefault();
  await firestore.collection("confess").doc(uid).update({comment:[{name:user.displayName ,"desc":newDesc}]})
  setNewItem("");
  setNewDesc("");
  setNewUname("")
};
// const ndate = new Date();

const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
});

  const unlike=async()=>{
    await firestore.collection("confess").doc(uid).update({like:like-1,likestatus:false})
  }
  return (
    <div className="post">
      <div className="post__avatar">
        <img src={avatar} className="img" alt=''/>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              @{displayName}
              <span className="post_headerSpecial">
                {verified && <VerifiedUserIcon className="post__badge" />}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p style={{fontSize:"18px"}}>{text}</p>
          </div>
          <div className="post__date">
            <p>{timestamp}</p>
          </div>
          <div className='comment'>Comments: 
              {
                comment.map((i)=>{
                    return(
                      <>
                      <p>@{i.name}</p> 
                      <p>{i.desc}</p> 
                      </>
                    ) 
                })
              }
          </div>
        </div>
        <div className="post__footer">
          <Button style={{color:"white"}} onClick={openModal}>
          <ChatBubbleOutLineIcon fontSize="small"/>
          </Button> 
          {
            likestatus==true ? 
            <Button style={{color:"red"}} onClick={unlike}>
            <FavouriteIcon fontSize="small" backgroundColor="white" />     {like}
            </Button> : 
            <Button style={{color:"white"}} onClick={makelike} >
          <FavouriteIcon fontSize="small" />  {like}
          </Button>
          }
          
        </div>
      </div>
      {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal__content">
                            <form className="modal__form">
                                {/* <label>
                                    UserName:<input type="text" value={newuname} onChange={(e) => setNewUname(e.target.value)} required/>
                                </label>
                                <label>
                                    Name:<input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} required/>
                                </label> */}
                                <label>
                                    {/* Description:<input type="" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required/> */}
                                    Comment:<textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required></textarea>

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

export default Post