import React, { Component } from 'react';
import { connect } from 'react-redux';
import Datepicker from 'react-multiple-datepicker'
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
import { API_SERVER, CREATE_EVENT, ALL_USERS  } from '../../api'
import { toast } from 'react-toastify'
import jwtSimple from 'jwt-simple'
import { actionGetVendorList } from '../../actions'

class _createEvent extends Component {
    constructor(props){
        super(props)
        this.submitEvent = this.submitEvent.bind(this)
        this.getAllVendor = this.getAllVendor.bind(this)
        this.credential = jwtSimple.decode(localStorage.getItem('token'), "SECRET")
        this.state = {
            eventName: '',
            vendorId: '',
            companyId: this.credential._id,
            proposedDate: [],
            proposedLocation: '',
        }
    }

    componentWillMount(){
      this.getAllVendor()
    }

    submitEvent(e){
      e.preventDefault()
      axios
        .post(API_SERVER + CREATE_EVENT, this.state, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }).then(response => {
          var result = response.data
          console.log(result)
          if (!result.error) {
            window.location.href = '/event'
            toast.success(result.message)
            console.log(result)
          } else {
            alert.error(result.error)
          }
        }).catch(error => {
          alert.error(error)
        })
    }

    getAllVendor(){
      axios
        .get(API_SERVER + ALL_USERS + `?adminType=2`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }).then(response => {
          var result = response.data
          if (!result.error) {
            console.log(result)
            this.props.setVendorList(result.data)
          }
        }).catch(error => {
          
        })
    }

    render(){
        console.log(this.state)
        console.log(this.props.vendors)
        return(
            <Form className="LoginForm">
                <h1>Create Event Form</h1>
                <p className="text-muted">Fill out this form about your event details</p>
                <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="icon-user" />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    placeholder="Event Name"
                    autoComplete="eventname"
                    value={this.state.eventName}
                    onChange={val => {
                    this.setState({
                        eventName: val.target.value
                    });
                    }}
                />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="icon-user" />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    type="select"
                    placeholder="Vendor Name"
                    autoComplete="Vendor Name"
                    onClick={val => {
                    this.setState({
                        vendorId: val.target.value
                    });
                    }}
                >
                <option value="" disabled selected>Choose Vendor</option>
                {
                  this.props.vendors[0] ? this.props.vendors.map((vendors, key) => (
                    <option key={key} value={vendors._id}>{vendors.username}</option>
                  )) : null
                }
                </Input>
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                     Choose Proposed Date
                    </InputGroupText>
                </InputGroupAddon>
                <Datepicker 
                    className="DatePicker"
                    onSubmit={dates => this.setState({
                        proposedDate: dates
                    })}
                />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="icon-user" />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    placeholder="Proposed Location"
                    autoComplete="proposedlocation"
                    value={this.state.proposedLocation}
                    onChange={val => {
                    this.setState({
                        proposedLocation: val.target.value
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
                    onClick={this.submitEvent}
                    >
                    submit
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

const mapStateToProps = (state, ownProps) => ({
  vendors: state.user.vendor
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setVendorList: data => dispatch(actionGetVendorList(data))
})

export const createEvent = connect(mapStateToProps, mapDispatchToProps)(_createEvent)
export default createEvent