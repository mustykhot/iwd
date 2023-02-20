import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
const MenteeList = () => {
  const [mentee, setMentee] = useState([]);
  const [mentor, setMentor] = useState([]);
  const fetchPost = async () => {
    await getDocs(collection(db, "arupiwd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMentee(newData);
    });
  };

  const fetchMentor = async () => {
    await getDocs(collection(db, "mentortwo")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMentor(newData);
    });
  };

  useEffect(() => {
    fetchPost();
    fetchMentor();
  }, []);

  const filterMentor = (name) => {
    console.log(mentee, mentor);
    const newArr = mentor.filter((item) => item.name === name);
    console.log(newArr, "newArr");
    return newArr[0].name;
  };

  return (
    <div className="pd_menteeList">
      {mentee.map((item) => {
        return <p>{item.name}</p>;
      })}
      <table>
        <thead>
          <tr>
            <th>Mentee</th>
            <th>Mentor</th>
          </tr>
        </thead>
        <tbody>
          {mentee.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{filterMentor(item.mentor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenteeList;
