import { useState, useEffect } from "react";
import AP from "../../CSS/AdminProfile.module.css";
import axios from "axios";

export default function AdminRightFour() {
  const [query, setQuery] = useState([]);

  const fetchData = () => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/queryAll`)
      .then((res) => {
        setQuery(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching the data from client side", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={AP.rightFour}>
      <div className={AP.brightOne}>
        <h2 className={AP.tetd}>Queries</h2>
        <div className={AP.Ttdd}>
          <table className={`${AP.brightTwo} ${AP.ttable}`}>
            <tr className={AP.TableHead}>
              <td className={AP.teacher}>Query ID</td>
              <td className={AP.teacher}>Name</td>
              <td className={AP.teacher}>Email ID</td>
              <td className={AP.teacher}>Message</td>
              <td className={AP.teacher}>Query Date</td>
              <td className={AP.teacher}>Resolution</td>
              <td className={AP.teacher}>Resolution Date</td>
            </tr>
            {query &&
              query.map((teacher, index) => (
                <tr
                  key={index}
                  className={`${AP.teacherDet} ${
                    teacher.status === "pending" ? AP.pending : AP.resolved
                  }`}
                >
                  <td className={AP.ttd}>{teacher.query_ID}</td>
                  <td className={AP.ttd}>{teacher.fullname}</td>
                  <td className={AP.ttd}>{teacher.email}</td>
                  <td className={AP.ttd}>{teacher.message}</td>
                  <td className={AP.ttd}>{teacher.queryDate}</td>
                  <td className={AP.ttd}>{teacher.replyMessage}</td>
                  <td className={AP.ttd}>{teacher.resolveDate}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}
