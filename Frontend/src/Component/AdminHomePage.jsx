import { useEffect, useState } from "react";
import AH from "../CSS/AdminHome.module.css";
import TeamLeader from "../Images/TeamLeader.png";
import axios from "axios";

export default function AdminHomePage() {
  const [teacherData, setTeacherData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [queryData, setQueryData] = useState([]);

  const [selectedSection, setSelectedSection] = useState("teacher");

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/staff`)
      .then((res) => {
        setTeacherData(res.data.data.teacherData);
        setStudentData(res.data.data.studentData);
        setQueryData(res.data.data.statusQuery);
      })
      .catch((err) => {
        console.log("Error in fetching staff details from client side", err);
      });
  });

  const [replyMessage, setReplyMessage] = useState("");
  const [errorR, setErrorR] = useState();

  const handleReply = (e, queryID) => {
    e.preventDefault();
    if (replyMessage === "") {
      setErrorR("Reply Message is required");
      return;
    }

    setErrorR("");

    const payload = {
      query_ID: queryID,
      replyMessage: replyMessage,
    };

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/replyingquery`, payload)
      .then((res) => {
        console.log("Reply sent");
      })
      .catch((err) => {
        console.log("Error from client side", err);
      });
  };

  // console.log(teacherData.length)
  return (
    <div>
      <div className={AH.mydict}>
        <div>
          <label className={AH.label}>
            <input
              type="radio"
              id="teacher"
              name="radio"
              checked={selectedSection === "teacher"}
              onChange={() => setSelectedSection("teacher")}
              value="teacher"
            />
            <span>Teacher</span>
          </label>
          <label className={AH.label}>
            <input
              type="radio"
              id="student"
              name="radio"
              value="student"
              checked={selectedSection === "student"}
              onChange={() => setSelectedSection("student")}
            />
            <span>Student</span>
          </label>
          <label className={AH.label}>
            <input
              type="radio"
              id="query"
              name="radio"
              value="queries"
              checked={selectedSection === "query"}
              onChange={() => setSelectedSection("query")}
            />
            <span>Queries</span>
          </label>
        </div>
      </div>

      {selectedSection === "teacher" && (
        <div className={`${AH.cardsGrid} ${AH.teacher}`}>
          {teacherData.length > 0 ? (
            teacherData.map((data, index) => (
              <div className={AH.userCard} key={index}>
                <div className={AH.userCardHeader}>
                  <div className={AH.hexagonContainer}>
                    <div className={AH.hexagon}>
                      <img src={data.avatar ? data.avatar : TeamLeader} alt="User Image" className={AH.profileImage} />
                    </div>
                  </div>
                </div>

                <div className={AH.userCardBody}>
                  <h2 className={AH.userName}>{data.fName} {data.lName}</h2>
                  <span className={AH.userRoleBadge}>{data.role}</span>

                  <div className={AH.userDetails}>
                    <div className={AH.detailItem}>
                      <span className={AH.detailLabel}>Registration ID</span>
                      <span className={AH.detailValue}>: {data.Registration_ID}</span>
                    </div>
                    <div className={AH.detailItem}>
                      <span className={AH.detailLabel}>Email</span>
                      <span className={AH.detailValue}>: {data.email}</span>
                    </div>
                    <div className={AH.detailItem}>
                      <span className={AH.detailLabel}>Phone</span>
                      <span className={AH.detailValue}>: {data.pNumber}</span>
                    </div>
                  </div>

                  {/* <button className={AH.deleteButton}>
                    DELETE USER
                  </button> */}
                </div>
              </div>
            ))
          ) : (
            <div className="empty">No data found</div>
          )}
        </div>
      )}

      {selectedSection === "student" && (
        <div className={`${AH.cardsGrid} ${AH.student}`}>
          {studentData.length > 0 ? (
            studentData.map((data, index) => (
              <div className={AH.userCard} key={index}>
                <div className={AH.userCardHeader}>
                  <div className={AH.hexagonContainer}>
                    <div className={AH.hexagon}>
                      <img src={data.avatar ? data.avatar : TeamLeader} alt="User Image" className={AH.profileImage} />
                    </div>
                  </div>
                </div>

                <div className={AH.userCardBody}>
                  <h2 className={AH.userName}>{data.fName} {data.lName}</h2>
                  <span className={AH.userRoleBadge}>{data.role}</span>

                  <div className={AH.userDetails}>
                    <div className={AH.detailItem}>
                      <span className={AH.detailLabel}>Registration ID</span>
                      <span className={AH.detailValue}>: {data.Registration_ID}</span>
                    </div>
                    <div className={AH.detailItem}>
                      <span className={AH.detailLabel}>Email</span>
                      <span className={AH.detailValue}>: {data.email}</span>
                    </div>
                    <div className={AH.detailItem}>
                      <span className={AH.detailLabel}>Phone</span>
                      <span className={AH.detailValue}>: {data.pNumber}</span>
                    </div>
                  </div>

                  {/* <button className={AH.deleteButton}>
                    DELETE USER
                  </button> */}
                </div>
              </div>
            ))
          ) : (
            <div className="empty">No data found</div>
          )}
        </div>
      )}

      {selectedSection === "query" && (
        <div className={`${AH.cardsGrid} ${AH.query}`}>
          {queryData.length > 0 ? (
            queryData.map((query, index) => (
              <div className={AH.queryCard} key={index}>
                <form className={AH.replyForm} onSubmit={(e) => handleReply(e, query.query_ID)}>
                  <div className={AH.inputmethod}>
                    <label htmlFor="queryID" className={AH.label}>
                      Query ID:
                    </label>
                    <input
                      type="text"
                      name="queryID"
                      value={query.query_ID}
                      readOnly
                      className={AH.disabledInput}
                    />
                  </div>

                  <div className={AH.inputmethod}>
                    <label htmlFor="regisID" className={AH.label}>
                      Registration ID:
                    </label>
                    <input
                      type="text"
                      name="regisID"
                      value={query.Registration_ID}
                      readOnly
                      className={AH.disabledInput}
                    />
                  </div>

                  <div className={AH.inputmethod}>
                    <label htmlFor="fullName" className={AH.label}>
                      Name:
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={query.fullname}
                      readOnly
                      className={AH.disabledInput}
                    />
                  </div>

                  <div className={AH.inputmethod}>
                    <label htmlFor="email" className={AH.label}>
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={query.email}
                      readOnly
                      className={AH.disabledInput}
                    />
                  </div>

                  <div className={AH.inputmethod}>
                    <label htmlFor="message" className={AH.label}>
                      Query:
                    </label>
                    <input
                      type="text"
                      name="message"
                      value={query.message}
                      readOnly
                      className={AH.disabledInput}
                    />
                  </div>

                  {/* Optionally display validation error */}
                  {errorR && <span style={{ color: "red" }}>{errorR}</span>}

                  <textarea
                    name="replyMessage"
                    className={AH.enabledInput}
                    value={replyMessage}
                    onChange={(e) => {
                      setReplyMessage(e.target.value);
                    }}
                  ></textarea>

                  <button type="submit" className={AH.reply}>
                    <i
                      className="fa-solid fa-rocket svg"
                      style={{ color: "#fcfafa" }}
                    ></i>
                    <span>Reply</span>
                  </button>
                </form>
              </div>
            ))
          ) : (
            <div>No data found</div>
          )}
        </div>
      )}
    </div>
  );
}
