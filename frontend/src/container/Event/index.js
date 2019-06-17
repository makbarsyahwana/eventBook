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
  Row,
  Table,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';
import jwtSimple from 'jwt-simple'
import axios from 'axios';
import { API_SERVER, READ_EVENT, APPROVAL } from '../../api'
import { toast } from 'react-toastify';
import { actionGetEventList } from '../../actions'

class _Event extends Component {
  constructor(props){
    super(props)
    this.getAllEvent = this.getAllEvent.bind(this)
    this.actionApproval = this.actionApproval.bind(this)
    this.credential = jwtSimple.decode(localStorage.getItem('token'), "SECRET")
    this.state = {
      adminType: this.credential.adminType, // toget admin type account vendor/hr admin
      accountId: this.credential._id,
      confirmedDate: '',
      reason: '',
      status: ''
    }
  }

  componentWillMount(){
    this.getAllEvent()
  }

  // toget all event by account type vendor/hr admin
  getAllEvent(){
    axios
      .get(API_SERVER + READ_EVENT + `?adminType=${this.state.adminType}&accountId=${this.state.accountId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(response => {
        var result = response.data
        if(!result.error) {
          this.props.setEventList(result.data)
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
      }).catch(error => {
        toast.error(error)
      })
  }

  actionApproval(status, eventId){
    axios
      .post(API_SERVER + APPROVAL, {
        eventId: eventId,
        status: status,
        confirmedDate: this.state.confirmedDate,
        reason: this.state.reason
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(response => {
        var result = response.data
        if(!result.error){
          toast.success(result.message)
          this.setState({
            confirmedDate: '',
            reason: '',
            status: status
          })
          this.getAllEvent()
        } else {
          toast.error(result.message)
        }
      }).catch(error => {
        toast.error(error)
      })
  }



  render(){
    console.log(this.props.events)
    console.log(this.state.accountId, this.state.adminType)
    return(
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Event Name</th>
          <th>Company Name</th>
          <th>Vendor Name</th>
          <th>Proposed Date</th>
          <th>{this.state.status === "Approved" ? "Confirmed Date" : "Reason"}</th>
          <th>Status</th>
          <th>Date Created</th>
          <th>Location</th>
          {
            this.state.adminType == 2 ? (
              <th>Action</th>
            ) : (
              null
            )
          }
        </tr>
      </thead>
      <tbody>
          {
            this.props.events.map((event, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{event.eventName}</td>
                <td>{event.companyId.username}</td>
                <td>{event.vendorId.username}</td>
                <td>
                {
                  event.proposedDate.map((date, index)=> (
                    <p key={index}>{new Date(date).toLocaleDateString()}</p>
                  ))
                }
                </td>
                <td>{event.status === "Approved" ? new Date(event.confirmedDate).toLocaleDateString() : event.reason}</td>
                <td>{event.status ? event.status : "Pending"}</td>
                <td>{new Date(event.created_at).toLocaleDateString()}</td>
                <td>{event.proposedLocation}</td>
                {
                  this.state.adminType == 2 ? (
                    <td>
                      <Button id="PopView" color="success">View</Button>
                      <UncontrolledPopover placement="bottom" target="PopView">
                      <PopoverHeader>Approval</PopoverHeader>
                        <PopoverBody>
                          <Input
                            type="select"
                            onClick={val => {
                              this.setState({
                                confirmedDate: val.target.value
                              })}
                            }
                          >
                            <option value="" disabled selected>Choose confirmed date</option>
                            {
                              event.proposedDate.map((date, index) => (
                                <option key={index} value={date}>{new Date(date).toLocaleDateString()}</option>
                              ))
                            }
                          </Input>
                          <Button onClick={() => this.actionApproval("Approved", event._id)} color="success">Aprove</Button>
                          <Input
                            type="text"
                            placeholder="Reason for reject"
                            value ={this.state.reason}
                            onChange={val => {
                              this.setState({
                                reason: val.target.value
                              })}
                            }
                          />
                          <Button onClick={() => this.actionApproval("Rejected", event._id)} color="danger">Reject</Button>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </td>
                  ) : (
                    null
                  )
                }
              </tr>
            ))
          }
          {/* <th scope="row">1</th>
          <td>Healthsys</td>
          <td>Otto</td>
          <td>02/09/2019</td>
          <td>Pending</td>
          <td>02/02/2019</td>
          <td><Button color="success">View</Button></td> */}
      </tbody>
      {
        this.state.adminType == 1 ? (
          <Button style={{
            alignContent: "center"
          }} color="success" onClick={() => {
            window.location.href = '/event/create'
          }}>
            Create New Event
          </Button>
        ) : (
          null
        )
      }
      <Button
        color="danger"
        onClick={() => {
          localStorage.removeItem('token')
          window.location.href = '/'
        }}
      >
        Logout
      </Button>
    </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  events: state.event.event
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setEventList: data => dispatch(actionGetEventList(data))
})

export const Event = connect(mapStateToProps, mapDispatchToProps)(_Event)
export default Event