import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';

import { deleteNote } from '../store/actions/noteActions';
import './Note.css';

const NoteDetails = (props) => {
    const { note, auth, id } =props;
    if (!auth.uid) return <Redirect to='/signin' />
    
    const deleteHandler = () => {
        props.deleteNote(id);
    };
 
    if (note) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <div className="card-title">{note.title}
                            <Link to="/notelist"><i onClick={deleteHandler} className="material-icons delete right">delete</i></Link>
                            <a href={'/update/' + props.match.params.id}><i className="material-icons edit right">edit</i></a>
                        </div>
                        <div>{renderHTML(note.content)}</div>
                        <p className="grey-text">{moment(note.createdAt.toDate()).calendar()}</p>
                    </div>
                </div>
                
            </div>
        );
    } else {
        return(
            <div className="container center">
                <p>Loading note...</p>
            </div>
            );
    }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const notes = state.firestore.data.notes;
    const note = notes ? notes[id] : null;
    return {
        note: note,
        auth: state.firebase.auth,
        id: id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteNote : (id) => dispatch(deleteNote(id))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'notes' }
    ])
)(NoteDetails);