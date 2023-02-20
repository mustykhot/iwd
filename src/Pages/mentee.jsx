import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function Mentee() {
  const [name, setName] = useState("");
  const [mentor, setMentor] = useState({ name: "", id: "" });
  const [mentorList, setMentorList] = useState([]);
  console.log(mentor);
  const fetchPost = async () => {
    await getDocs(collection(db, "mentor")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMentorList(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const addMentee = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "arupiwd"), {
        name,
        mentor: mentor.name,
      });
      console.log("Document written with ID: ", docRef.id);
      deleteMentor(mentor.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const deleteMentor = async (id) => {
    const response = await deleteDoc(doc(db, "mentor", id));
    fetchPost();
    console.log(response);
  };
  return (
    <div className="pd_mentee">
      <form onSubmit={addMentee}>
        <div className="form_field">
          <label htmlFor="name">Full Name</label>
          <input
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="form_field">
          <label htmlFor="mentor">Mentor</label>
          <select
            onChange={(e) => {
              setMentor(e.target.value);
            }}
            name="mentor"
            id="mentor"
          >
            {mentorList.map((item) => (
              <option value={{ name: item.name, id: item.id }}>
                {item.number}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Mentee;
