import React from "react";
import F from '../CSS/Filter.module.css';

export default function Filter({ filterationMethod, item, filterItem, setData, vid }) {
    console.log(vid, "From Filter method")
    return (
        <div className={F.titleAndFilteration}>
            <div className={F.title}>{filterationMethod}</div>
            <div className={F.filterButton}>
                {item.map((val) => (
                    <button className={F.filt} onClick={() => filterItem(val)}>{val}</button>
                ))}
                <button className={F.filt} onClick={() => setData(vid)}>All</button>
            </div>
        </div>
    );
}