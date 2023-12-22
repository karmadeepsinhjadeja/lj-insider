import React, { useState, useEffect } from 'react'
import "../css/Feed.css"
import Post from './Post'
import firestore from "../../database/firebase"
import {auth} from "../../database/firebase"
import {useAuthState} from 'react-firebase-hooks/auth';
// import TweetBox from "./TweetBox.js"


function Feed() {
    const [user] = useAuthState(auth);
    const [items, setItems] = useState([]);

    {/*}
    const[posts,setPosts]=useState([]);

    useEffect(() => {
        db.collection("posts").onSnapshot(snapshot=>(
         setPosts(snapshot.docs.map(doc=>doc.data()))   
        ))
    },[])*/}
    const getItems = async () => {
        // const itemsRef = await firestore.collection("confess").get();
        // const itemsData = itemsRef.docs.map((doc) => [doc.data(), doc.id]);
        // console.log(itemsData);
        // setItems(itemsData);
        firestore.collection('confess').onSnapshot(function (querySnapshot) {
            const data= [];
            querySnapshot.forEach( doc => {
              console.log("Name : ", doc.data().name);
              console.log("Valeur : ", doc.data().desc);
              data.push({name : doc.data().name, desc: doc.data().desc,date:doc.data().date,img:doc.data().img,like:doc.data().like,likestatus:doc.data().likestatus,time:doc.data().time,comment:doc.data().comment,uid:doc.id})
            })
            setItems(data);
          })
      
    };

    useEffect(() => {
        getItems();
    }, []);


    return (
        <div className="feed">
            {/*header */}
            <div className="feed__header">
                {/* <h2>LJ Insider's</h2> */}
            </div>


            {/*tweetbox */}
            {/* <h2>this is tweetbox</h2> */}
            {/* <TweetBox /> */}


            {/*post */}

            {items.map((tweet, index) => (
                <Post
                    uid={tweet.uid}
                    displayName={tweet.name}
                    verified={true}
                    text={tweet.desc}
                    timestamp={tweet.date}
                    avatar={tweet.img}
                    like={tweet.like}
                    likestatus={tweet.likestatus}
                    time={tweet.time}
                    comment={tweet.comment}
                // onDelete={() => handleDelete(tweet[1])}
                />
            ))}         
        </div>
    )
}

export default Feed