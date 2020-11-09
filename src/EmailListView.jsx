import React from 'react'

function EmailListView(props){
    let emailListing = props.emailListing.map(each => (
        <div>{each.subject} --- {each.sender} <button onClick={() => props.viewEmail(each.id)}>View Email</button> </div>
    ))
    return(
        <div>
            {emailListing}
        </div>
    )
}

export default EmailListView