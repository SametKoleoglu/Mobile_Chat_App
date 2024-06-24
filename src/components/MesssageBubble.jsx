import React, {useEffect, useState} from 'react';
import MessageBubbleMe from './MessageBubbleMe';
import MessageBubbleFriend from './MessageBubbleFriend';
import useGlobal from '../core/global';

export default function MesssageBubble({index, message, friend}) {
  const [showTyping, setShowTyping] = useState(false);

  const messagesTyping = useGlobal(state => state.messagesTyping);

  useEffect(() => {
    if(index !== 0) return

    if (messagesTyping === null) {
      setShowTyping(false);
      return;
    }
    

    setShowTyping(true);

    const check = setInterval(() => {
      const now = new Date();

      const ms = now - messagesTyping;

      if (ms > 10000) {
        setShowTyping(false);
      }
    }, 1000);
    return () => clearInterval(check);
  }, [messagesTyping]);

  if (index === 0) {
    if (showTyping) {
      return <MessageBubbleFriend friend={friend} typing={true} />;
    }
    return
  }

  return message.is_me ? (
    <MessageBubbleMe text={message.text} />
  ) : (
    <MessageBubbleFriend text={message.text} friend={friend} />
  );
}
