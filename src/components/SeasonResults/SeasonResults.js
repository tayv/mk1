import React from "react"

import { useGoogleSheetData } from "../../hooks/useGoogleSheetData"

import PrintSeasonData from "./PrintSeasonData"
import PrintAllTimeData from "./PrintAllTimeData"
import PrintTeamSeasonData from "./PrintTeamSeasonData"

const SeasonResults = (props) => {
  // Get the Google Sheet data via custom hook
  const {
    //   sheetsAll,
    //  rowsAllTime,
    statsAllTime,
    statsBySeason,
    statsByTeamSeason,
    isDataLoaded,
    // error,
  } = useGoogleSheetData()

  // Rendering logic based on season and row data
  const renderContent = () => {
    switch (true) {
      case props.teamToggle === "individual" && props.season !== "allTime":
        return (
          <PrintSeasonData
            teamToggle={props.teamToggle}
            season={props.season}
            statsBySeason={statsBySeason}
            sortByProjPoint={props.sortByProjPoint}
            handleSortProjPointToggle={props.handleSortProjPointToggle}
          />
        )

      case props.teamToggle === "individual" && props.season === "allTime":
        return (
          <PrintAllTimeData
            teamToggle={props.teamToggle}
            statsAllTime={statsAllTime}
          />
        )

      case props.teamToggle === "team" && props.season === "season1":
        return (
          <tr>
            <td colSpan="7" className="no-table-data-message">
              No teams this season 👯‍♀️
            </td>
          </tr>
        )

      case props.teamToggle === "team" && props.season === "allTime":
        return (
          <tr>
            <td colSpan="7" className="no-table-data-message">
              No data yet 😕
            </td>
          </tr>
        )

      case props.teamToggle === "team" && props.season !== "allTime":
        return (
          <PrintTeamSeasonData
            teamToggle={props.teamToggle}
            season={props.season}
            statsByTeamSeason={statsByTeamSeason}
            sortByProjPoint={props.sortByProjPoint}
            handleSortProjPointToggle={props.handleSortProjPointToggle}
          />
        )

      default:
        return (
          <tr>
            <td colSpan="7" className="no-table-data-message">
              Something went wrong 😕. Try reloading the page.
            </td>
          </tr>
        )
    }
  }

  return (
    <tbody>
      {isDataLoaded ? (
        renderContent()
      ) : (
        <tr>
          <td colSpan="7" className="loading-message animate-pulse">
            Loading data...
          </td>
        </tr>
      )}
    </tbody>
  )
}

export default SeasonResults
