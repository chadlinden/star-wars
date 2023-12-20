import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container-fluid">
                    <div className="h-100 d-flex align-items-center justify-content-center">
                        <div style={{background: 'red' }}>
                            Uh oh! Looks like something went wrong. Sorry about that!
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary
