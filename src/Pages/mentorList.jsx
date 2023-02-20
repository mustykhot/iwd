import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
const MentorList = () => {
  const [mentor, setMentor] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, "mentor")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMentor(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="pd_menteeList">
      {mentor.map((item) => {
        return <p>{item.name}</p>;
      })}
    </div>
  );
};

export default MentorList;
