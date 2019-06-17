import { GET_EVENT_LIST } from '../../actions'

const store = {
    event: []
}

const event = (state=store, action) => {
    switch(action.type) {
        case GET_EVENT_LIST:
            return{ 
                ...state,
                event: action.payload
            }
        default:
            return state
    }
}

export default event