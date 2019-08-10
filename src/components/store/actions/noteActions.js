export const createNote = (note) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('notes').add({
            ...note,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
        })
        .then(() => {
            dispatch({type: 'CREATE_NOTE_SUCCESS', note});
        })
        .catch((err) => {
            dispatch({type: 'CREATE_NOTE_ERROR', err});
        })
        
    };
};

export const updateNote = (updatedNote, id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('notes').doc(id.toString()).update({
        ...updatedNote,
        createdAt: new Date(),
        })
            .then(() => {
                dispatch({type: 'UPDATE_NOTE_SUCCESS'}, updatedNote)
            })
            .catch(() => {
                dispatch({type: 'UPDATE_NOTE_ERROR'})
            })
    };
};

export const deleteNote = (id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('notes').doc(id.toString()).delete()
        .then(() => {
            dispatch({type: 'DELETE_NOTE_SUCCESS'}, id);
        })
        .catch(() => {
            dispatch({type: 'DELETE_NOTE_ERROR'})
        });
    };
};

