import { GET_VENDOR_LIST, GET_HR_LIST } from '../../actions'

const store = {
    vendor: [],
    hr: []
}

const user = (state=store, action) => {
    switch(action.type) {
        case GET_VENDOR_LIST:
            return{ 
                ...state,
                vendor: action.payload
            }
        case GET_HR_LIST:
            return {
                ...state,
                hr: action.payload
            }
        default:
            return state
    }
}

export default user