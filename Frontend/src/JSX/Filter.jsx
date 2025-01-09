import React from "react";
import F from '../CSS/Filter.module.css';

export default function Filter({ filterationMethod, item, filterItem, setData, vid }) {
    return (
        <div className={F.titleAndFilteration}>
            <div className={F.title}>{filterationMethod}</div>
            <div className={F.filterButton}>
                {item.map((val, index) => (
                    <button key={index} className={F.filt} onClick={() => filterItem(val)}>{val}</button>
                ))}
                <button className={F.filt} onClick={() => setData(vid)}>All</button>
            </div>
        </div>
    );
}