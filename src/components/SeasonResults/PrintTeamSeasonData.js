import React from "react"
//import StyleChangeCell from "../Helpers/StyleChangeCell"
import HighlightCol from "../Helpers/HighlightCol"

const PrintTeamSeasonData = (props) => {
  const sortByProjPoint = props.sortByProjPoint
  const handleSortProjPointToggle = props.handleSortProjPointToggle
  const statsByTeamSeasonProp = props.statsByTeamSeason

  const highlightColStyle = "bg-purple-400 transition ease-in-out delay-10 p-0"
  const secondaryColStyle = "text-purple-500 text-opacity-60 p-0"

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
          <td className="gap-x-2 sm:gap-x-4 pl-2 text-left">{row.teamName}</td>

          <td
            className={sortByProjPoint ? secondaryColStyle : highlightColStyle}
          >
            <HighlightCol
              variant="cell"
              sortByProjPoint={sortByProjPoint}
              handleSortProjPointToggle={handleSortProjPointToggle}
            >
              {row.teamPoints}
            </HighlightCol>
          </td>
          {/* <td className={StyleChangeCell(row.teamChange)}>{row.teamChange}</td> */}

          <td
            className={sortByProjPoint ? highlightColStyle : secondaryColStyle}
          >
            <HighlightCol
              variant="cell"
              sortByProjPoint={sortByProjPoint}
              handleSortProjPointToggle={handleSortProjPointToggle}
            >
              {row.teamProjected}
            </HighlightCol>
          </td>
          <td className="text-purple-500 ">{row.teamBye}</td>
        </tr>
      ))}
    </>
  )
}

export default PrintTeamSeasonData
