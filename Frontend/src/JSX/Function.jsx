import React from "react";
import Heading from "./Heading";
import ClassNine from "../Component/ClassNine";


export function Head(val) {
    return (
        <Heading key={val.id} standard={val.standard} addr={val.addr}></Heading>
    )
}

export function VideosNine(val) {
    return (
        <Classes key={val.id} imgSrc={val.imgSrc} videoName={val.videoName} subjectName={val.subjectName} classIn={val.classIn} channelName={val.channelName} videoLink={val.videoLink} ></Classes>
    );
}

export function Subb(val) {
    return (
        <ClassNine sn={val.sn}></ClassNine>
    );
}