// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import React from 'react';
import Lucide from "../base-components/Lucide";
import Notification from "../base-components/Notification";
import { NotificationElement } from "../base-components/Notification";

const notify = React.forwardRef((props, ref) => {
  const [message,setmessage] = useState('Message')
  const [subText,setsubText] = useState('Sub Text')
  
  const notificationRef = useRef<NotificationElement>();
  const notifToggle = (msg,text) => {
    console.log({msg,text})

    setmessage(msg)
    setsubText(text)
    // const msgElement = document.getElementById('notifMsg');
    // if (msgElement) {
    //     msgElement.innerHTML = msg;
    // }

    // const subTextElement = document.getElementById('notifSubText');
    // if (subTextElement) {
    //     subTextElement.innerHTML = text;
    // }

    // Show notification
    notificationRef.current?.showToast();
  };

  // Assign the ref to the child component
  React.useImperativeHandle(ref, () => ({
    notifToggle
  }));

  return (
    <Notification
        getRef={(el) => {
            notificationRef.current = el;
        }}
        options={{
            duration: 3000,
        }}
        className="flex flex-col sm:flex-row"
        >
        <Lucide icon="CheckCircle" className="text-success" />
        <div className="ml-4 mr-4">
            <div id="notifMsg" className="font-medium">{message}</div>
            <div id="notifSubText" className="mt-1 text-slate-500">
                {subText}
            </div>
        </div>
    </Notification>
  )
});

export default notify;
