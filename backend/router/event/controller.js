eventCol = require('../../models/event')

const controller = {
    create: (req, res) => {
        const { 
            eventName,
            vendorId,
            companyId,
            proposedDate,
            proposedLocation
        } = req.body

        eventCol.create(
            req.body
        ).then(newEvent => {
            res.status(200).send({
                message: "success to create event",
                data: newEvent
            })
        }).catch(error => {
            res.status(500).send({
                message: "Database Error",
                error: error
            })
        })
    },

    read: (req, res) => {
        const { adminType, accountId } = req.query
        const argQuery = adminType == 1 ? { companyId: accountId } : { vendorId: accountId }
        console.log(adminType, accountId)
        console.log(argQuery)

        eventCol.find(argQuery)
        .populate('vendorId')
        .populate('companyId')
        .exec((err, foundEvent) => {
            console.log(foundEvent)
            if(err) {
                res.status(500).send({
                    message: "Database Error",
                    error: err
                })
            }

            if(foundEvent[0]){
                res.status(200).send({
                    message: "success find event",
                    data: foundEvent
                })
            } else {
                res.status(200).send({
                    message: "no event has been created",
                    error: true
                })
            }
        })
    },

    approval: (req, res) => {
        const { eventId, status, reason, confirmedDate } = req.body

        eventCol.findOne({
            _id: eventId
        }).then(event => {
            event.status = status
            reason ? event.reason = reason : null
            confirmedDate ? event.confirmedDate = confirmedDate : null
            event.save()
            res.status(200).send({
                message: "success to updating status",
                data: event
            })
        }).catch(error => {
            res.status(500).send({
                message: "Database Error",
                error: error
            })
        })
    }
}

module.exports = controller