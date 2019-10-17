import { Component } from 'react';

class AuthWidget extends Component {
    render() {
        const { auth = {} } = this.props;
        return this.props.children(auth.data || {});
    }
}

export default AuthWidget;
