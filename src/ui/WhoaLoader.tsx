import logo from '../logo.svg';

export function WhoaLoader(props) {

    return (
        <div className="row justify-content-center">
            <div className="col interstitial-loader">
                <img src={logo} className="App-logo" alt="logo" />
                <span className="bouncing-dots">
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                </span>
            </div>
        </div>
    );

}

export default WhoaLoader;
