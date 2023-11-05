import React from "react"
import StyleChangeCell from "../Helpers/StyleChangeCell"
import HighlightCol from "../Helpers/HighlightCol"

const PrintSeasonData = (props) => {
  const currentSeasonName = props.season
  const statsAllSeasons = props.statsBySeason
  const currentSeasonData = statsAllSeasons[currentSeasonName]
  const sortByProjPoint = props.sortByProjPoint
  const handleSortProjPointToggle = props.handleSortProjPointToggle

  // Dynamic styles
  const highlightColStyle = "bg-purple-400 transition ease-in-out delay-10 p-0"
  const secondaryColStyle = "text-purple-500 text-opacity-60 p-0"

  // Various standing views
  const renderStandings = (currentSeasonName) => {
    // The original seasons didn't have byes so they're rendered with different columns
    if (
      currentSeasonName === "season1" ||
      currentSeasonName === "season2" ||
      currentSeasonName === "season3" ||
      currentSeasonName === "season4"
    ) {
      return currentSeasonData.map((row) => (
        <tr key={row.rank}>
          <td>{row.rank}</td>
          <td>
            <div className="flex gap-x-2 sm:gap-x-4 pl-2 sm:pl-4 text-left items-center">
              <img
                className="rounded-full w-6 sm:w-10 md:w-12 h-6 sm:h-10 md:h-12"
                src={`./avatars/${row.avatar}`}
                alt="avatar"
              />
              {row.name}
            </div>
          </td>
          <td>{row.points}</td>
          <td className={StyleChangeCell(row.change)}>{row.change}</td>
        </tr>
      ))
    }
    // Season 5 is the first season where byes and projected points are introduced as columns
    // Ternary used to toggle sorting based on whether sorting by points or projected points
    else {
      return currentSeasonData.map((row) => (
        <tr key={row.rank}>
          <td>{row.rank}</td>
          <td>
            <div className="flex gap-x-2 sm:gap-x-4 pl-2 sm:pl-4 text-left items-center">
              <img
                className="rounded-full w-6 sm:w-10 md:w-12 h-6 sm:h-10 md:h-12"
                src={`./avatars/${row.avatar}`}
                alt="avatar"
              />
              {sortByProjPoint ? row.projName : row.name}
            </div>
          </td>
          <td
            className={sortByProjPoint ? secondaryColStyle : highlightColStyle}
          >
            <HighlightCol
              variant="cell"
              sortByProjPoint={sortByProjPoint}
              handleSortProjPointToggle={handleSortProjPointToggle}
            >
              {row.points}
            </HighlightCol>
          </td>

          <td
            className={sortByProjPoint ? highlightColStyle : secondaryColStyle}
          >
            <HighlightCol
              variant="cell"
              sortByProjPoint={sortByProjPoint}
              handleSortProjPointToggle={handleSortProjPointToggle}
            >
              {sortByProjPoint ? row.projProjected : row.projected}
            </HighlightCol>
          </td>

          {row.bye && (
            <td className="">{sortByProjPoint ? row.projBye : row.bye}</td>
          )}
        </tr>
      ))
    }
  }

  return (
    // Check that statBySeason isn't undefined as it depends on PrintSeasonRows()

    <>{currentSeasonData && renderStandings(currentSeasonName)}</>
  )
}

export default PrintSeasonData
