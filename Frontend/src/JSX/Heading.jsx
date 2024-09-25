import React from 'react';
import { Link } from 'react-router-dom';
import H from '../CSS/Heading.module.css'

export const ClassArray = [
    {
        id: 1,
        standard: "IX",
        addr: '/classnine'
    },
    {
        id: 2,
        standard: "X",
        addr: '/classten'
    },
    {
        id: 3,
        standard: "XI",
        addr: '/classeleven'
    },
    {
        id: 4,
        standard: "XII",
        addr: '/classtwelve'
    },
    {
        id: 5,
        standard: "Competition",
        addr: '/competition'
    }
]

function Heading(props) {
    return (
        <>
            <Link to={props.addr} className={H.classin} key={props.id}>
                {props.standard}
            </Link>
        </>
    );
}

export default Heading;
