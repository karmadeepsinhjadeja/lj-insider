import React, { useState, useEffect } from 'react';
import TweetFeedCard from './TweetFeedCard';
import firestore from "../../database/firebase";

function Tweeting() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [newuname, setNewUname] = useState("");
    const [newDesc, setNewDesc] = useState("");

    const date = new Date();

    const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });

    const getItems = async () => {
        const itemsRef = await firestore.collection("items").get();
        const itemsData = itemsRef.docs.map((doc) => [doc.data(), doc.id]);
        console.log(itemsData);
        setItems(itemsData);
    };

    useEffect(() => {
        getItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firestore.collection("items").doc(newItem).set({ name: newItem , username: newuname, desc: newDesc, date: formattedDate });
        setNewItem("");
        setNewDesc("");
        setNewUname("")
        getItems();
    };

    const handleDelete = async (id) => {
        console.log(id);
        await firestore.collection("items").doc(id).delete();
        getItems();
      };

    return (
        <div>
            UserName: <input type="text" value={newuname} onChange={(e) => setNewUname(e.target.value)} />
            Name: <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
            Description: <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
            Image: <input type='file'/>

            <button type='submit' onClick={handleSubmit}>Add Tweet</button>

            {items.map((tweet, index) => (
                <TweetFeedCard
                    key={tweet[1]}
                    name={tweet[0].name}
                    username={tweet[0].username}
                    tweetText={tweet[0].desc}
                    timestamp={tweet[0].date}
                    onDelete={() => handleDelete(tweet[1])}
                />
            ))}
        </div>
    );
};

export default Tweeting