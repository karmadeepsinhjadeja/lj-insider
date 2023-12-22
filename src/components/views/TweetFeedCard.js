import React from 'react';
import '../css/TweetFeedCard.css'
import lj from '../../assets/lj2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TweetFeedCard = ({name, username, tweetText, timestamp, onDelete }) => {
  return (
    <div className="tweet-card">
      <div className="user-info">
        <img src={lj} className="user-avatar" />
        <span className="user-name">{name}</span>
        <span className="username">@{username}</span>

        <button className="delete-button" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} className="delete-icon" />
        </button>

      </div>
      <div className="tweet-content">
        <p>{tweetText}</p>
        <img src={lj} className="tweet-image" />

        <span className="timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default TweetFeedCard;
