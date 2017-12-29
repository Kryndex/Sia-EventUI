import { CollapsibleGridSet } from '../elements/CollapsibleGrid'
import { connect } from 'react-redux'
import { IncidentSummary, IncidentSummaryName } from './IncidentSummary'
import { IncidentEvents, IncidentEventsName } from './IncidentEvents'

export const DisplayIncident = ({incident, ticket, ticketSystem, expandSection, dispatch}) => {
    return CollapsibleGridSet('incident-container', 'incident-row', 'incident-col', [
        IncidentSummary(incident, ticket, ticketSystem, ticket.originId, dispatch),
        IncidentEvents([[ticket.originId, incident.id]])
    ],
    [
        IncidentSummaryName(),
        IncidentEventsName()
    ],
    expandSection, dispatch)
}

export const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    expandSection: state.expandSection
})

export default connect(mapStateToProps)(DisplayIncident)
