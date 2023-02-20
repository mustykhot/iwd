import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function Mentee() {
  const [name, setName] = useState("");
  const [mentor, setMentor] = useState("");
  const [mentorList, setMentorList] = useState([]);

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
        mentor,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="pd_mentee">
      <form onSubmit={addMentee}>
        <div className="form_field">
          <label htmlFor="name">Full Name</label>
          <input
            onChange={(e) => {
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
              <option value={item.id}>{item.id}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Mentee;
