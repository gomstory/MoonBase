import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css'

const Layout = (props) => {
    return (
        <Fragment>
            <div className="layout">
                <nav>
                    <ul>
                        <li>
                            <NavLink activeClassName='active' to='/buy'>Buy</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' to='/history'>History</NavLink>
                        </li>
                    </ul>
                </nav>
                <main>{props.children}</main>
            </div>
        </Fragment>
    );
};

export default Layout;