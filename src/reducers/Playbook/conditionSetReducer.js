import * as eventTypeActions from '../../actions/Playbook/eventTypeActions'
import { mergeToStateById, withParentId } from '../reducerHelpers'

const defaultConditionSetCollection = {}

export const ConditionSetReducer = (state = defaultConditionSetCollection, action) => {
    switch(action.type){
        case eventTypeActions.GET_EVENT_TYPE_SUCCESS:
        case eventTypeActions.POST_EVENT_TYPE_SUCCESS:
            return action.eventType
            ? mergeToStateById(
                state,
                withParentId(
                    'actionId',
                    action.eventType.actions,
                    (act) => act.conditionSets
                )
            )
            : state
        default:
            return state
    }
}

export default ConditionSetReducer