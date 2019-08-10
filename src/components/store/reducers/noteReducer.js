import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

const initState = {
    notes: [],
    id: null,
    error: null,
    changed: false
};

const noteReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_NOTE_SUCCESS:
            return updateObject(state, {error: null , changed: true})

        case actionTypes.CREATE_NOTE_ERROR:
            return updateObject(state, {error: action.err});

        case actionTypes.UPDATE_NOTE_SUCCESS:
            return updateObject(state, {error: null, changed: true}, console.log(state) );
        

        case actionTypes.UPDATE_NOTE_ERROR:
            return updateObject(state, {error: action.err});
            
        case actionTypes.DELETE_NOTE_SUCCESS:
            return updateObject(state, {   
            notes: state.notes.filter(note => note.id !== action.id),
            error: null,
            changed: true
            });
            
        case actionTypes.DELETE_NOTE_ERROR:
            return updateObject(state, {error: action.err});
            
        default:
            return state;
    }
};

export default noteReducer;