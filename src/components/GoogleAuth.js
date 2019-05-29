import React from 'react';

class GoogleAuth extends React.Component {

    state = { isSignedIn: null };

    componentDidMount() {
       window.gapi.load('client:auth2', () => {
           window.gapi.client.init({
               clientId: '768334732400-ri21cgfjdjjou44j3g2d6qe9hh9681c5.apps.googleusercontent.com',
               scope: 'email'
           }).then(() => {
               this.auth = window.gapi.auth2.getAuthInstance();
               this.setState( { isSignedIn: this.auth.isSignedIn.get() });
               this.auth.isSignedIn.listen(this.onAuthChange);
           });
       });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button" >
                    <i className="google icon" ></i>
                    Sign Out
                </button>
            )
        } else {
            return(
            <button className="ui green google button" onClick={this.onSignInClick}>
                <i className="google icon"></i>
                Sign In with Google
            </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

export default GoogleAuth;