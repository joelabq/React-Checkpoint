import NewEmail from './NewEmail';
import EmailView from './EmailView';
import EmailListView from './EmailListView';
import './App.css';
import React from 'react';

const apiURL = 'http://localhost:3001/emails'
const sendEmailAPI = 'http://localhost:3001/send'
const searchEmailAPI = 'http://localhost:3001/search'

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
        allEmails: [],
        fullEmailList: [],
        email: {},
        viewingEmail: false,
        sendingEmail: false,
        newEmailState: [],
        sentEmailResponse: {},
        searchBoxText: '',
    }
  }

  async componentDidMount() {
    this.getData();
  }

  async getData() {
    const response = await fetch(apiURL)
    const json = await response.json()
    
    this.setState({allEmails: json})
    this.setState({fullEmailList: json})
  }

  async getSearchData() {
    const response = await fetch(searchEmailAPI)
    const json = await response.json()
    
    this.setState({allEmails: json})
    this.setState({fullEmailList: json})
  }
  viewEmail = (emailID) => {
    
    let currentEmail = this.state.allEmails.filter(each => each.id === emailID); //NEXT TIME WE WILL READ API DOC BEFORE RE-CREATING WHEEL

    this.setState({email: currentEmail});
    this.setState({viewingEmail: true})
  }
  viewAll = () => {
    this.setState({viewingEmail: false})
  }
  newEmail = () => {
    this.setState({allEmails: [], sendingEmail: true,});

  }

  emailCancelled = (e) => {
    e.preventDefault();
    this.setState({allEmails: this.state.fullEmailList, sendingEmail: false});
  }
  sendEmail = (e) => {
    e.preventDefault();
    
    let [sender,recipient,subject,message] = Array.from(e.target.elements).slice(0,4).map(element => element.value);
     
    let messageid = this.state.fullEmailList[this.state.fullEmailList.length - 1].id + 1; 

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: sender,
        recipient: recipient,
        subject: subject,
        message: message,
        id: messageid
      })
    };
    
    fetch(sendEmailAPI, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({sentEmailResponse: data}))
        .then(() => {
            if (this.state.sentEmailResponse.status === "success") {
              alert("Your email was sent!");
              this.getData();
            }
            else{
              alert("Your email failed to send!");
            }
            
          });
      
    
        // alert("Gonna Send Successful Email..."+sender)
    this.setState({allEmails: this.state.fullEmailList, sendingEmail: false});
  }
  search = () => {

  }
  getText = (e) => {
      this.setState({searchBoxText: e.target.value});
  }
  render(){
  
    return (
      <div > <label>Search </label> <input type="text" name="search" onChange={this.getText} /> <button onClick={this.search}>Search</button>
          {(!this.state.viewingEmail) ? 
            <div>
            <button onClick={this.newEmail}>New Email</button>
          <EmailListView emailListing={this.state.allEmails} viewEmail={this.viewEmail}/>
            </div> : <div>
            <EmailView currentEmail={this.state.email} />
            <button onClick={this.viewAll}>Back</button>
            </div>
         }
         
           <div >
            <NewEmail cancelAction={this.emailCancelled} sendAction={this.sendEmail} sendingEmail={this.state.sendingEmail} />
          </div>
       
      </div>
          
    );
  }
}

export default App;
