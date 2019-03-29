import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteNote, getData, getANote } from '../../store/actions';
import Modal from './Modal/Modal';
// import Todo from '../Todo/Todo'

import { Button, ViewContainer } from './noteStyle';

class ViewPage extends React.Component {
    state = {
        showModal: false,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getANote(id);
    }

    toggleModal = e => {
        e.preventDefault();
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    };

    deleteClick = e => {
        e.preventDefault();
        this.props.deleteNote(this.props.note._id);
        this.props.history.goBack();
    };

    editClick = e => {
        e.preventDefault();
        this.props.history.push(`/noteform/${this.props.note._id}`);
    };

    render() {
        const description =
            this.props.note.textBody === undefined
                ? []
                : this.props.note.textBody.split('\n');
        return (
            <ViewContainer>
                <Button onClick={this.editClick} className="left">
                    edit
                </Button>
                <Button onClick={this.toggleModal}>delete</Button>
                <div>
                    <h3>{this.props.note.title}</h3>
                    {description.map((descript, index) => {
                        return <p key={index}>{descript}</p>;
                    })}
                </div>
                {/* <Todo /> */}
                <Modal
                    showModal={this.state.showModal}
                    toggleModal={this.toggleModal}
                    deleteClick={this.deleteClick}
                />
            </ViewContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        note: state.note,
    };
};

ViewPage.propTypes = {
    deleteNote: PropTypes.func,
    getANote: PropTypes.func,
    histroy: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    note: PropTypes.shape({
        _id: PropTypes.number,
        textBody: PropTypes.string,
        title: PropTypes.string,
    }),
};

export default connect(
    mapStateToProps,
    { deleteNote, getData, getANote }
)(ViewPage);
