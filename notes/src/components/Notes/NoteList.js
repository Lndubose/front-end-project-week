import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getData } from '../../store/actions';
import Note from './Note';

import { NotesContainer, NoteAlign } from './noteStyle';

class NoteList extends React.Component {
    componentDidMount() {
        this.props.getData();
    }

    render() {
        return (
            <NotesContainer>
                <h2>Your Notes:</h2>
                <NoteAlign>
                    {this.props.notes.map(note => (
                        <Link to={`/notes/${note._id}`} key={note._id}>
                            <Note note={note} />
                        </Link>
                    ))}
                </NoteAlign>
            </NotesContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
    };
};

NoteList.propTypes = {
    getData: PropTypes.func.isRequired,
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.number.isRequired,
            textBody: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ),
    histroy: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
};

export default connect(
    mapStateToProps,
    { getData }
)(NoteList);
