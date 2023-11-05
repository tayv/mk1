import React, { useState } from "react"

import SeasonResults from "../SeasonResults/SeasonResults.js"
import TypeRadioGroup from "../TypeRadioGroup/TypeRadioGroup"
import FilterListbox from "../SeasonFilter/SeasonFilter.js"
import HighlightCol from "../Helpers/HighlightCol.js"

const Leaderboard = () => {
  // Default to latest season so most likely to load relevant results
  const [season, setSeason] = useState("season5")
  const [teamToggle, setTeamToggle] = useState("individual")
  const [sortByProjPoint, setSortByProjPoints] = React.useState(false) // Used by PrintSeasonData

  // Dynamic styles
  const highlightHeader =
    "text-white py-0 px-2 m-0 transition ease-in-out delay-10"

  const handleSortProjPointToggle = () => {
    setSortByProjPoints(!sortByProjPoint)
  }

  const onTeamToggleChange = (value) => {
    setTeamToggle(value)
  }

  const onSeasonFilterChange = (value) => {
    setSeason(value)
  }

  return (
    <div className="w-screen md:w-10/12">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center sm:justify-between py-2 ">
        <TypeRadioGroup value={teamToggle} onChange={onTeamToggleChange} />
        <FilterListbox value={season} onChange={onSeasonFilterChange} />
      </div>

      <div className="border-gray-400 border-2 shadow-xl rounded-lg overflow-x-scroll w-max min-w-full">
        <table className="table-auto w-full h-full p-4">
          <thead>
            {(function () {
              if (season === "allTime") {
                return (
                  <tr>
                    <th>Racer</th>
                    <th>Championship</th>
                    <th>Gold</th>
                    <th>Silver</th>
                    <th>Bronze</th>
                    <th>Time Trial</th>
                  </tr>
                )
              } else if (
                (season === "season1") |
                (season === "season2") |
                (season === "season3") |
                (season === "season4")
              ) {
                return (
                  <tr>
                    <th colSpan="2">Racer</th>
                    <th>Points</th>
                    <th>Change</th>
                  </tr>
                )
              } // Season 5 added byes and projected points so columns changed
              else if (season !== "allTime") {
                return (
                  <tr>
                    <th colSpan="2">Racer</th>
                    <th className={sortByProjPoint ? "px-2" : highlightHeader}>
                      <HighlightCol
                        variant="heading"
                        headerValue="points"
                        sortByProjPoint={sortByProjPoint}
                        handleSortProjPointToggle={handleSortProjPointToggle}
                      >
                        Points
                      </HighlightCol>
                    </th>
                    <th
                      className={
                        sortByProjPoint ? highlightHeader : "py-0 px-2 m-0"
                      }
                    >
                      <HighlightCol
                        variant="heading"
                        headerValue="projPoints"
                        sortByProjPoint={sortByProjPoint}
                        handleSortProjPointToggle={handleSortProjPointToggle}
                      >
                        Projected
                      </HighlightCol>
                    </th>
                    <th className="px-2">Bye</th>
                  </tr>
                )
              }
            })()}
          </thead>
          <SeasonResults
            teamToggle={teamToggle}
            season={season}
            sortByProjPoint={sortByProjPoint}
            handleSortProjPointToggle={handleSortProjPointToggle}
          />
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
