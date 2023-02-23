import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const MenteeList = () => {
  const [mentee, setMentee] = useState([]);
  const [mentor, setMentor] = useState([]);
  console.log(mentor);
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

  // const filterMentor = (name) => {
  //   console.log(mentee, mentor);
  //   const newArr = mentor.filter((item) => item.name === name);
  //   console.log(newArr, "newArr");
  //   return newArr[0].name;
  // };

  return (
    <div className="pd_menteeList">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mentee</TableCell>
              <TableCell align="right">Mentor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentee.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.mentor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MenteeList;
