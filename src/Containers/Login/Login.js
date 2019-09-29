import React from 'react'
import './Login.css'
import {
    MDBNavbar, MDBNavbarBrand, MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardHeader,
    MDBBtn
} from "mdbreact";
import { OutlinedTextFields } from '../../Components'
import { LoginUser } from '../../Config/Functions/Functions';
import firebaseApp from '../../Config/Firebase/Firebase';


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            name: 'snackbar',
            message: '',
            loader: false

        }
    }

    //  Admin  Login  Function

    Login = async () => {
        let { email, password } = this.state
        try {
            let admin = await LoginUser(email, password)
            firebaseApp.firestore().collection('admin').doc(admin.id).set(admin).then(
                this.props.history.push('/home')
            )
            await localStorage.setItem('path', JSON.stringify('/home'))
        }
        catch (err) {
            this.setState({
                name: 'show',
                message: err
            })
            setTimeout(() => { this.setState({ name: 'snackbar' }) }, 3000);
        }
        this.setState({
            email: '',
            password: ''
        })
    }


    render() {
        return (
            <div>
                <MDBNavbar color="unique-color-dark"  >
                    <MDBNavbarBrand href="#">
                        <h5 className="my-3">
                            <MDBIcon icon="user" />  &nbsp; Attendance Portal
                        </h5>
                    </MDBNavbarBrand>
                </MDBNavbar>
                <div className='login'>
                    <MDBContainer>
                        <MDBRow center>
                            <MDBCol md="5">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardHeader className="form-header unique-color-dark rounded">
                                            <h3 className="my-3">
                                                <MDBIcon icon="user" />  &nbsp;Login
                                            </h3>
                                        </MDBCardHeader>
                                        <OutlinedTextFields name='email' value={this.state.email} type='email' label='Email'
                                            onChange={(e) => this.setState({ email: e.target.value })} />
                                        <OutlinedTextFields name='password' value={this.state.password} type='password' label='Password'
                                            onChange={(e) => this.setState({ password: e.target.value })} />
                                        <div className="text-center mt-4">
                                            <MDBBtn color="dark" className="mb-3" type="button" onClick={this.Login} >
                                                Login
                                            </MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
                <div id="snackbar" className={this.state.name}>{this.state.message}</div>
            </div>
        )
    }

}

export default Login