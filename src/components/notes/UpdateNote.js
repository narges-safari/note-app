import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import * as findIndex from 'lodash.findindex';

import { updateNote } from '../store/actions/noteActions';

class UpdateNote extends Component {
    state = {
        title:'',
        content:''
    };

    getData(){
        setTimeout(() => {
            const { notes, match: { params: { id }} } = this.props;
            const index = findIndex(notes, {id});
            const {title, content} = notes[index];
            this.setState({
            title, content 
          })
        }, 1000)
      }
    
      componentWillReceiveProps(){
        this.getData();
      }

    
 
    handleChange = (event) => {
        this.setState({
            content:event
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateNote(this.state, this.props.match.params.id);
        this.props.history.push('/notelist');
    }

    modules = {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }],
          [{ 'size': ['small', false, 'large', 'huge']}],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['link'],
          ['clean']
        ],
      };
    
      formats = [
        'header',
        'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link'
      ];

    render() {
        
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Update The Note</h5>    
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text" 
                            id="title" 
                            value={this.state.title}
                            onChange={(event)=> {this.setState({title: event.target.value})}} />
                    </div>
                    <div className="input-field">
                        <ReactQuill 
                            value={this.state.content}
                            id="content" 
                            placeholder="content" 
                            onChange={this.handleChange}
                            modules={this.modules}
                            formats={this.formats} />
                    </div>
                    <div className="input-field">
                        <button className="btn amber darken-1 z-depth-0">Update</button>
                    </div>
                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.firestore.ordered.notes,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateNote : (updatedNote, id) => dispatch(updateNote(updatedNote, id))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'notes' }
    ])
)(UpdateNote);