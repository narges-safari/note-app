import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class NoteList extends Component {

    render() {

        const { notes, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />;
        
        return (
            <div className="container">
                <div className="project-list-section">
                    {notes && notes.map(note => {
                        if (note.authorId === auth.uid) {
                            return (
                                <div className="card z-depth-0 project-summary" key={note.id}>
                                    <div className="card-content grey-text text-darken-3">
                                        <a className="card-title" href={'/note/' + note.id}>
                                            {note.title}
                                        </a>
                                    </div>
                                </div>
                            );
                        } else if ((note.authorId === auth.uid).length === null) {
                            return(
                                <p>There's NO note!</p>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.firestore.ordered.notes,
        auth: state.firebase.auth
    };
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'notes', orderBy: ['createdAt', 'desc']}
    ])
  )(NoteList);