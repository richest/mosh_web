import React from 'react';

const LoginHeader = () => {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav className="navbar text-center">
                            <a className="navbar-brand mx-auto" href="javascript:void(0)">
                                <img className="login-header-img" src="/webapp/images/logo.png" alt="mosh.png" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default LoginHeader