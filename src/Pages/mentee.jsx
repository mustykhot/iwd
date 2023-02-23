import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import arup from "../assets/arup.png";
import iwd from "../assets/iwd.png";
import { Fade, Slide } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
function Mentee() {
  const [name, setName] = useState("");
  const [mentor, setMentor] = useState({ name: "", id: "", number: "" });
  const [mentorList, setMentorList] = useState([]);
  const [isDrop, setIsDrop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(true);
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
    setIsLoading(true);
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
    console.log(response);
    fetchPost();
    setIsLoading(false);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="pd_mentee">
      <form onSubmit={addMentee}>
        <div className="logo_container">
          <img src={arup} alt="arup" className="arup" />
          <img src={iwd} alt="iwd" className="iwd" />
        </div>
        <p className="title">Input name and select number </p>
        <div className="form_field">
          <input
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
            type="text"
            name="name"
            placeholder="Full Name"
            id="name"
          />
        </div>
        <div className="form_field">
          <div
            onClick={() => {
              setIsDrop(!isDrop);
            }}
            className="select_box"
          >
            <p>{mentor.number || "Pick a Number"}</p>
          </div>
          {isDrop && (
            <div className="drop_down">
              {mentorList.length ? (
                mentorList.map((item) => {
                  return (
                    <p
                      onClick={() => {
                        setMentor({
                          name: item.name,
                          number: item.number,
                          id: item.id,
                        });
                        setIsDrop(false);
                      }}
                    >
                      {item.number}
                    </p>
                  );
                })
              ) : (
                <p>No Mentor Available For Selection</p>
              )}
            </div>
          )}
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Submit"}</button>
      </form>

      <Fade in={openModal}>
        <div
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          className="modal-wrap"
        >
          <Slide direction="down" in={openModal} mountOnEnter unmountOnExit>
            <div className="modal-content">
              <div className="top_side">
                <div className="logo_box">
                  <img src={arup} alt="arup" className="arup" />
                  <img src={iwd} alt="iwd" className="iwd" />
                </div>
                <ClearIcon onClick={closeModal} />
              </div>

              <p>
                {name}, Your mentor is {mentor.name}
              </p>
            </div>
          </Slide>
        </div>
      </Fade>
    </div>
  );
}

export default Mentee;
