import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import axios from 'axios';
import { API_SERVER, LOGIN } from '../../api'
import './login.css'

class Login extends Component {
    constructor(props){
        super(props)
        this.check_login = this.check_login.bind(this)
        this.state = {
            username: '',
            password: '',
            types: 'password'
        }
    }

    check_login(e){
        if(this.state.username && this.state.password){
            e.preventDefault()
            console.log(API_SERVER + LOGIN)
            console.log(this.state.username)
            axios
            .post(API_SERVER + LOGIN, {
                username: this.state.username,
                password: this.state.password
            }).then(response => {
                    const result = response.data;
                    console.log(result)
                    if (!result.error) {
                        localStorage.setItem('token', result.data);
                        window.location.href = '/event';
                        console.log(result)
                    } else {
                    // false
                    if (result.message) {
                        alert(result.message);
                    }
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            alert("please check your username and password")
        }
    }

    showHide(e){
        e.preventDefault();
        e.stopPropagation();
        const types = this.state.types
        this.setState({
          types: types === 'password' ? 'input' : 'password'
        })  
      }

    render(){
        console.log(this.state)
        return(
        <Form className="LoginForm">
            <h1>Login</h1>
            <p className="text-muted">Sign In to your account</p>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Username"
                autoComplete="username"
                value={this.state.username}
                onChange={val => {
                  this.setState({
                    username: val.target.value
                  });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type={this.state.types}
                placeholder="Password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={val => {
                  this.setState({
                    password: val.target.value
                  });
                }}
              />
            </InputGroup>
            <Row>
              <Col xs="6">
                <Button
                  color="primary"
                  className="px-4 text-white"
                  type="submit"
                  onClick={this.check_login}
                >
                  Login
                </Button>
              </Col>
              {/* <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                    </Col> */}
            </Row>
        </Form>
        )
    }
}

export default Login
