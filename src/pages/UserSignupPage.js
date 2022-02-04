import React from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";


class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    }

    onChange = event => {
        const { t } = this.props;
        const { name, value } = event.target;
        const errors = { ...this.state.errors }
        errors[name] = undefined;

        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password Mismatch');
            }
            else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = t('Password Mismatch');
            } else {
                errors.passwordRepeat = undefined;
            }
        }

        this.setState({
            [name]: value,
            errors
        });
    }


    /*
        onChangeUserName = event =>{
            console.log(event.target.value);
            this.setState({
                username : event.target.value
            });
        }
    */
    onClickSignUp = async event => {
        event.preventDefault();
        const { username, displayName, password } = this.state;
        const body = {
            username,
            displayName,
            password
        }
  
        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validitionErrors) {
                this.setState({ errors: error.response.data.validitionErrors });
            }


            // console.log(error.response.data);
        }


        // signup(body)
        //     .then((response) => {
        //         this.setState({ pendingApiCall: false});
        //     }).catch(error => {
        //         this.setState({ pendingApiCall: false});
        //     });

    };


    render() {
        const { t, pendingApiCall } = this.props;
        const { errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name="username" label={t('Username')} onChange={this.onChange} error={username} />
                    <Input name="displayName" label={t('Displayname')} onChange={this.onChange} error={displayName} />
                    <Input name="password" label={t('Password')} onChange={this.onChange} error={password} type="password" />
                    <Input name="passwordRepeat" label={t('Password Repeat')} onChange={this.onChange} error={passwordRepeat} type="password" />
                    <div className="text-center">
                        <ButtonWithProgress  
                        onClick={this.onClickSignUp}
                        disabled={pendingApiCall || passwordRepeat != undefined}
                        text = {t('Sign Up')}
                        pendingApiCall = {pendingApiCall}
                        
                            
                            />
                    </div>
                   
                </form>
            </div>

        );
    }
}

const UserSignupPageWithApiProgress = withApiProgress(UserSignupPage, '/users');
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgress);


export default UserSignupPageWithTranslation;
