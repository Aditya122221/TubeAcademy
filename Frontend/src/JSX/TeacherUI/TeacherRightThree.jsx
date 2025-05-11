import { useEffect, useState } from "react";
import TP from "../../CSS/TeacherProfile.module.css";
import axios from "axios";

export default function TeacherRightThree() {
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
    <div className={TP.rightFour}>
      <div className={TP.brightOne}>
        <h2 className={TP.tetd}>Queries</h2>
        <div className={TP.Ttdd}>
          <table className={`${TP.brightTwo} ${TP.ttable}`}>
            <tr className={TP.TableHead}>
              <td className={TP.teacher}>Query ID</td>
              <td className={TP.teacher}>Name</td>
              <td className={TP.teacher}>Email ID</td>
              <td className={TP.teacher}>Message</td>
              <td className={TP.teacher}>Query Date</td>
              <td className={TP.teacher}>Resolution</td>
              <td className={TP.teacher}>Resolution Date</td>
            </tr>
            {query &&
              query.map((teacher, index) => (
                <tr
                  key={index}
                  className={`${TP.teacherDet} ${
                    teacher.status === "pending" ? TP.pending : TP.resolved
                  }`}
                >
                  <td className={TP.ttd}>{teacher.query_ID}</td>
                  <td className={TP.ttd}>{teacher.fullname}</td>
                  <td className={TP.ttd}>{teacher.email}</td>
                  <td className={TP.ttd}>{teacher.message}</td>
                  <td className={TP.ttd}>{teacher.queryDate}</td>
                  <td className={TP.ttd}>{teacher.replyMessage}</td>
                  <td className={TP.ttd}>{teacher.resolveDate}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}
