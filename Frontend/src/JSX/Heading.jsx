import React from 'react';
import { Link } from 'react-router-dom';
import H from '../CSS/Heading.module.css'

export const ClassArray = [
    {
        standard: "Class IX",
        addr: '/classnine'
    },
    {
        standard: "Class X",
        addr: '/classten'
    },
    {
        standard: "Class XI",
        addr: '/classeleven'
    },
    {
        standard: "Class XII",
        addr: '/classtwelve'
    },
    {
        standard: "Competition",
        addr: '/competition'
    }
]

function Heading(props) {
    return (
        <>
            <Link to={props.addr} className={H.classin}>
                {props.standard}
            </Link>
        </>
    );
}

export default Heading;