import { useEffect, useState } from "react";
import TP from "../../CSS/TeacherProfile.module.css";
import axios from "axios";
import { MessageCircle } from "lucide-react"

export default function TeacherRightThree() {
  const [query, setQuery] = useState([]);
  const Registration_ID = localStorage.getItem("RegID");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return TP.statusSuccess
      case "pending":
        return TP.statusWarning
      default:
        return TP.statusDefault
    }
  }

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
    <div className={`${TP.section} ${TP.querySection}`}>
      <div className={TP.sectionHeader}>
        <h2><MessageCircle size={24} />My Queries</h2>
      </div>

      <div className={TP.tableContainer}>
        <table className={TP.queriesTable}>
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Message</th>
              <th>Query Date</th>
              <th>Resolution</th>
              <th>Resolution Date</th>
            </tr>
          </thead>
          <tbody>
            {query.map((q, index) => (
              <tr key={index} className={getStatusColor(q.status)}>
                <td className={TP.queryText}>{q.query_ID}</td>
                <td>{q.message}</td>
                <td>{q.queryDate}</td>
                <td>{q.replyMessage}</td>
                <td>{q.resolveDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
