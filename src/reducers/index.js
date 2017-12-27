import { combineReducers } from 'redux'
import tickets from './ticketReducers'
import auth from './authReducer'
import incidents from './incidentReducers'
import engagements from './engagementReducer'
import events from './eventReducer'
import expandSection from './expandSectionReducer'
import filter from './filterReducer'
import signalR from './signalRReducer'
import popup from './popupReducer'
import forms from './formReducer'
import eventTypes from './eventTypeReducer'

const rootReducer = (filters) => combineReducers({
    incidents,
    auth,
    tickets,
    engagements,
    events: events(filters),
    filter,
    popup,
    forms,
    expandSection,
    signalR,
    eventTypes
})

export default rootReducer
