import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//Redux
import { connect } from 'react-redux';
import {submitComment } from '../../redux/action/dataActions';

const styles = {
    visibleSeparator : {
        width: "100%",
        borderBottom: '1px solid rgba(0,0,0,1)',
        marginBottom: 20
      },
      textField: {
        margin: "10px auto 10px auto"
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
}

class CommentForm extends Component {
    state = {
        body: '',
        errors : ''
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors});
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body : ''})
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body : this.state.body});
    }

    render() {
        const { classes, authenticated} = this.props;
        const errors = this.state.errors;
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type = 'text'
                        label="Comment on Scream"
                        error = {errors.comment ? true: false}
                        helperText={errors.comment}
                        value = {this.state.body}
                        onChange = {this.handleChange}
                        fullWidth
                        className= { classes.TextField}
                        />
                        <Button type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        >Submit</Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null
        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    UI : state.UI,
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));
