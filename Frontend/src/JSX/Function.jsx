import React from "react";
import Heading from "./Heading";


export function Head(val) {
    return (
        <Heading key={val.id} standard={val.standard} addr={val.addr}></Heading>
    )
}