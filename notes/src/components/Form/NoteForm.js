import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addNote, editNote, getANote } from '../../store/actions';

import { Form, Input, Textarea, Button } from './noteFormStyle';

class NoteForm extends React.Component {
    state = {
        title: '',
        textBody: '',
    };

    componentDidMount() {
        if (this.props.match.url === '/noteform/create') {
            this.setState({
                title: '',
                textBody: '',
            });
        } else {
            const id = this.props.match.params.id;
            this.props.getANote(id);
            this.setState({ ...this.props.note });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.note._id !== prevProps.note._id) {
            this.setState({ ...this.props.note });
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleClick = e => {
        e.preventDefault();
        const pathName = this.props.match.url;
        if (pathName === '/noteform/create') {
            this.props.addNote(this.state);
        } else {
            this.props.editNote(this.state);
        }
        this.setState({ title: '', textBody: '' });
        this.props.history.push('/');
    };

    render() {
        const pathName = this.props.match.url;
        return (
            <Form>
                <h2>
                    {pathName === '/noteform/create'
                        ? 'Create New Note:'
                        : 'Edit Note:'}
                </h2>
                <Input
                    name="title"
                    type="text"
                    placeholder="Note Title"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <Textarea
                    name="textBody"
                    placeholder="Note Content"
                    value={this.state.textBody}
                    onChange={this.handleChange}
                />
                <Button type="submit" onClick={this.handleClick}>
                    {pathName === '/noteform/create' ? 'Save' : 'Update'}
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        note: state.note,
    };
};

NoteForm.propTypes = {
    addNote: PropTypes.func,
    editNote: PropTypes.func,
    getANote: PropTypes.func,
    histroy: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    note: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.shape({
            _id: PropTypes.number.isRequired,
            textBody: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ]),
};

export default connect(
    mapStateToProps,
    { addNote, editNote, getANote }
)(NoteForm);
