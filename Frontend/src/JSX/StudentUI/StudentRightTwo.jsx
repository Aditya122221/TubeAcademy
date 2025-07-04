import axios from "axios";
import { useEffect, useState } from "react";
import { MessageSquare, Calendar } from 'lucide-react';
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
    <div className={SP.contentCard}>
      <h2 className={SP.sectionTitle}>
        <MessageSquare className={SP.sectionIcon} />
        Query History
      </h2>

      <div className={SP.tableContainer}>
        <table className={SP.table}>
          <thead className={SP.tableHeader}>
            <tr>
              <th className={SP.tableHeaderCell}>Query ID</th>
              <th className={SP.tableHeaderCell}>Message</th>
              <th className={SP.tableHeaderCell}>Query Date</th>
              <th className={SP.tableHeaderCell}>Resolution Message</th>
              <th className={SP.tableHeaderCell}>Resolution Date</th>
            </tr>
          </thead>
          <tbody>
            {query.length > 0 ? (
              query.map((q) => (
                <tr key={q.query_ID} className={`${SP.tableRow} ${q.status === "resolved" ? SP.resolved : SP.pending}`}>
                  <td className={SP.tableCell}>
                    <span className={SP.queryId}>{q.query_ID}</span>
                  </td>
                  <td className={SP.tableCell}>
                    <div className={SP.messageCell} title={q.message}>
                      {q.message}
                    </div>
                  </td>
                  <td className={SP.tableCell}>
                    <div className={SP.dateCell}>
                      <Calendar className={SP.calendarIcon} />
                      {q.queryDate}
                    </div>
                  </td>
                  <td className={SP.tableCell}>
                    <div className={SP.messageCell} title={q.replyMessage}>
                      {q.replyMessage}
                    </div>
                  </td>
                  <td className={SP.tableCell}>
                    <div className={SP.dateCell}>
                      <Calendar className={SP.calendarIconGreen} />
                      {q.resolveDate}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={SP.noData}>
                  No query history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
