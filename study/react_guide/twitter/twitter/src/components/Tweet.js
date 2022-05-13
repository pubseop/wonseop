import { dbService } from "fbase";
import React, {useState} from "react";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const TweetTextRef =doc(dbService, "tweets", `${tweetObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this tweet?');
        if(ok) {
            await deleteDoc(TweetTextRef );
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(TweetTextRef, {text: newTweet});
        setEditing(false);
    };
    const onChange = (event) => {
        const {target: {value},} = event;
        setNewTweet(value);
    };
    return(
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input onChange={onChange} type="text"  placeholder="Edit your tweet" value={newTweet} required />
                            <input type="submit" value='Update Tweet' />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{tweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Tweet</button>
                                <button onClick={toggleEditing}>Edit Tweet</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    );
}

export default Tweet;