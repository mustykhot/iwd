import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
const AddMentor = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const addId = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "mentor"), {
        name,
        number,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addId2 = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "mentortwo"), {
        name,
        number,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="pd_mentor">
      <form
        onSubmit={(e) => {
          addId(e);
          addId2(e);
        }}
      >
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
          <label htmlFor="id">Number</label>
          <input
            onChange={(e) => {
              setNumber(e.target.value);
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
