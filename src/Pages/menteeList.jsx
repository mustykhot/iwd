import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
const MenteeList = () => {
  const [mentee, setMentee] = useState([]);
  const fetchPost = async () => {
    await getDocs(collection(db, "arupiwd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMentee(newData);
      console.log(mentee, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="pd_menteeList">
      {mentee.map((item) => {
        return <p>{item.name}</p>;
      })}
    </div>
  );
};

export default MenteeList;
