import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

const style = {
    padding: '.75rem 1.25rem',
    marginBottom: '1rem',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
};

class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if(hasError) {
            return (
                <div style={style}>
                    Something is going wrong!!
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
