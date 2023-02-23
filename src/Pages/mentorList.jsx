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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mentor</TableCell>
              <TableCell align="right">Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentor.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MentorList;
