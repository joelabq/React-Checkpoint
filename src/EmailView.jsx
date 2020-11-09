import React from 'react'

function EmailView(props){
    if (props.currentEmail.length > 0)
    {
        return(
            <div>
                <div><span>Message ID: </span> <span>{props.currentEmail[0].id}</span> </div>
                <div><span>Sender: </span> <span>{props.currentEmail[0].sender}</span> </div>
                <div><span>Recipient: </span><span>{props.currentEmail[0].recipient}</span></div>
                <div><span>Subject: </span><span>{props.currentEmail[0].subject}</span></div>
                <div><span>Sender: </span><span>{props.currentEmail[0].sender}</span></div>
                <div><span>message: </span><span>{props.currentEmail[0].message}</span></div>
            </div>
        )
    }
    else { return (<div></div>)}
}

export default EmailView