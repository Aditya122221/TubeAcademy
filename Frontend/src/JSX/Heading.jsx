import React from 'react';
import { Link } from 'react-router-dom';
import H from '../CSS/Heading.module.css'

export const ClassArray = [
    {
        id: 1,
        standard: "Class 9",
        addr: '/classnine'
    },
    {
        id: 2,
        standard: "Class 10",
        addr: '/classten'
    },
    {
        id: 3,
        standard: "Class 11",
        addr: '/classeleven'
    },
    {
        id: 4,
        standard: "Class 12",
        addr: '/classtwelve'
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