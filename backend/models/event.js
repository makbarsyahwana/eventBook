const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = Schema({
    eventName: String,
    vendorId: { type: Schema.Types.ObjectId, ref:'User'},
    companyId: { type: Schema.Types.ObjectId, ref:'User'},
    proposedDate: [Date],
    confirmedDate: Date,
    proposedLocation: String,
    status: String,
    reason: String,
    created_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Event', Event)