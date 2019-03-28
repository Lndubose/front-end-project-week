import React from 'react';
import { connect } from 'react-redux';

import { addNote, editNote, getANote } from '../../store/actions';

import { Form, Input, Textarea, Button } from './noteFormStyle';

class NoteForm extends React.Component {
    state = {
        title: '',
        textBody: '',
    };

    componentDidMount() {
        if (this.props.match.url === '/noteform/create') {
            return null;
        } else {
            const id = this.props.match.params.id;
            this.props.getANote(id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.note._id !== prevProps.note._id) {
            this.setState({ ...this.props.note });
        }
    }

    componentWillReceiveProps() {
        if (this.props.match.url === '/noteform/create') {
            this.setState({
                title: '',
                textBody: '',
            });
        } else {
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

export default connect(
    mapStateToProps,
    { addNote, editNote, getANote }
)(NoteForm);
