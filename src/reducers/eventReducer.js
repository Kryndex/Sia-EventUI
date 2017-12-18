import paginated from 'paginated-redux'
import moment from 'moment'
import * as eventActions from '../actions/eventActions'
import { mergeWithOverwrite } from './reducerHelpers'

const defaultEventCollection = []

const makeSearchable = (event) => ({
    ...event,
    filterableIncidentId: event.incidentId.toString()
})

const addEventsToState = (state, events) => mergeWithOverwrite(state, events.map(event => makeSearchable(event)))

export const list = (state = defaultEventCollection, action) => {
    switch (action.type) {
        case eventActions.RECEIVE_EVENT:
        case eventActions.POST_EVENT_SUCCEED:
            return addEventsToState(state, [{...action.event, timeReceived: moment()}])
        case eventActions.RECEIVE_EVENTS:
            return addEventsToState(state, action.events)
        default:
            return state
    }
}

export const events = paginated(list, eventActions.pagination.types, {
    defaultPage: 1,
    defaultSortOrder: 'desc',
    defaultSortBy: 'occurred',
    defaultPer: 10,
    defaultFilter: '',
    defaultTotal: 0
  })

export default events
