import axios from "axios";
import { useEffect, useState } from "react";
import SP from "../../CSS/StudentProfile.module.css";

export default function StudentRightTwo() {
    const [query, setQuery] = useState([]);
    const Registration_ID = localStorage.getItem("RegID");
    
    const fetchData = () => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/queryDetails`, { Registration_ID })
      .then((res) => {
        setQuery(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching the data", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={SP.rightFour}>
      <div className={SP.brightOne}>
        <h2 className={SP.tetd}>Queries</h2>
        <div className={SP.Ttdd}>
          <table className={`${SP.brightTwo} ${SP.ttable}`}>
            <tr className={SP.TableHead}>
              <td className={SP.teacher}>Query ID</td>
              <td className={SP.teacher}>Name</td>
              <td className={SP.teacher}>Email ID</td>
              <td className={SP.teacher}>Message</td>
              <td className={SP.teacher}>Query Date</td>
              <td className={SP.teacher}>Resolution</td>
              <td className={SP.teacher}>Resolution Date</td>
            </tr>
            {query &&
              query.map((teacher, index) => (
                <tr
                  key={index}
                  className={`${SP.teacherDet} ${
                    teacher.status === "pending" ? SP.pending : SP.resolved
                  }`}
                >
                  <td className={SP.ttd}>{teacher.query_ID}</td>
                  <td className={SP.ttd}>{teacher.fullname}</td>
                  <td className={SP.ttd}>{teacher.email}</td>
                  <td className={SP.ttd}>{teacher.message}</td>
                  <td className={SP.ttd}>{teacher.queryDate}</td>
                  <td className={SP.ttd}>{teacher.replyMessage}</td>
                  <td className={SP.ttd}>{teacher.resolveDate}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}
