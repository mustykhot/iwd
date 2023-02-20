import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
const AddMentor = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const addId = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "mentor"), {
        name,
        id,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="pd_mentor">
      <form onSubmit={addId}>
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
          <label htmlFor="id">ID</label>
          <input
            onChange={(e) => {
              setId(e.target.value);
            }}
            type="text"
            name="id"
            id="id"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMentor;
