import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function HistoryTable({ data: rows, isUserHistory, account }) {
  const headers = [
    "PoolId",
    "Date",
    "Slots",
    "Prize Amount",
    "Status",
    !isUserHistory ? "Winner" : "Won ?",
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        // backgroundColor: "secondary.main",
        backgroundImage: "linear-gradient(to right, #ffd400,#d93013)",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => (
              <TableRow
                key={row.poolId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="td" scope="row">
                  {row.poolId}
                </TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{row.poolSlots}</TableCell>
                <TableCell>{row.prizeConversionAmount}</TableCell>
                <TableCell>{row.isActive ? "Open" : "Drawn"}</TableCell>
                {!isUserHistory && <TableCell>{row.winnerAddress}</TableCell>}
                {isUserHistory && (
                  <TableCell sx={{ fontSize: 24, px: 1, py: 0 }}>
                    {row.winnerAddress === account ? "🤑" : "😭"}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
