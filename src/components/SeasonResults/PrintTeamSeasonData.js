import React from "react"
import StyleChangeCell from "../Helpers/StyleChangeCell"

const PrintTeamSeasonData = (props) => {
  const statsByTeamSeasonProp = props.statsByTeamSeason

  if (!statsByTeamSeasonProp[props.season]) {
    return null // Return nothing if no data available
  }

  const validRows = statsByTeamSeasonProp[props.season].filter(
    (row) => row.teamName !== undefined && row.teamName !== ""
  )

  if (validRows.length === 0) {
    return null // Return nothing if there are no valid rows
  }

  return (
    <>
      {validRows.map((row, index) => (
        <tr key={index}>
          <td>{row.teamRank}</td>
          <td>{row.teamName}</td>
          <td>{row.teamPoints}</td>
          <td className={StyleChangeCell(row.teamChange)}>{row.teamChange}</td>
        </tr>
      ))}
    </>
  )
}

export default PrintTeamSeasonData
