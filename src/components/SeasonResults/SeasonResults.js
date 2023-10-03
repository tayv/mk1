import React, { useState, useEffect } from "react"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { merge } from "lodash"

import PrintSeasonData from "./PrintSeasonData"
import PrintAllTimeData from "./PrintAllTimeData"
import PrintTeamSeasonData from "./PrintTeamSeasonData"

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

// This needs to be refactored for cleaner async featching. Bundle everything using Promise.all() or something similar instead of separate async calls

// For google spreadsheet api refer to https://theoephraim.github.io/node-google-spreadsheet/#/?id=working-with-rows
const doc = new GoogleSpreadsheet(spreadsheetID)
doc.useApiKey(apiKey)

const SeasonResults = (props) => {
  const [sheetsAll, setSheetData] = useState([])
  const [statsAllTime, setStatsAllTime] = useState([]) // allTime stats by racer used to display alltime results
  const [rowsAllTime, setRowsAllTime] = useState([])
  const [statsBySeason, setStatsBySeason] = useState({})
  const [statsByTeamSeason, setTeamStatsBySeason] = useState({})
  const [isDataLoaded, setIsDataLoaded] = useState(false) // used to prevent rendering empty leaderboard

  const [dataFetched, setDataFetched] = useState(false) // Added to patch the initial load bug

  useEffect(() => {
    const fetchSheetData = async () => {
      // load the google sheet
      await doc.loadInfo()

      // get an array of all sheets as objects. Need to use sheetsByIndex so that it's an array.
      const sheetsAll = doc.sheetsByIndex
      // save to state
      setSheetData(sheetsAll)
      // set data loaded to true so we can render the leaderboard data
      setDataFetched(true)
    }

    fetchSheetData()
  }, []) // leave dependency array blank as only need to run once on page render

  useEffect(() => {
    const fetchRowData = async () => {
      if (!dataFetched) return

      sheetsAll.forEach((sheet) => {
        // Regex used to check if sheet name contains string "season" so we can get rows from the right sheet
        const regexMatchSeason = /season/gm

        if (sheet.title === "allTime") {
          // If we're on the allTime sheet then grab all the row data and save it in state so we can work with it
          async function fetchRacerListRows() {
            // Get all the active rows for this sheet
            // Will break if more than 25 all time racers. Using a limit so we can use Google Sheet sorting formulas
            const rowsAllTime = await sheet.getRows({ limit: 25 })

            // save the data to state so we can trigger other useEffects
            setRowsAllTime(rowsAllTime)
            // set data loaded to true so we can render the leaderboard data
          }
          if (dataFetched) {
            fetchRacerListRows()
          }
        } else if (sheet.title.match(regexMatchSeason)) {
          // If we're on a sheet starting with "season" then get each row and deep copy it into the statsBySeason object
          async function fetchSeasonRows() {
            // TODO: limit should be updated to be dynamic based on number of racers in allTime sheet.
            // This will break if more than 12 racers added in a season
            const rowsSeasonList = await sheet.getRows({ limit: 15 })

            // Initialize array to hold each season's individual and team row results
            let seasonResults = []
            let seasonResultsTeam = []
            let seasonTeamResult

            // Promise.all groups promises together in an iterable array and prevents race conditions
            await Promise.all(
              rowsSeasonList.map(async (row) => {
                // Each row represents a racers results for that season
                // Save desired stats to an object
                let seasonIndividualResult = {
                  rank: row.rank,
                  name: row.name,
                  avatar: row.avatar,
                  points: row.points,
                  change: row.change,
                }

                // Wrap in condition to prevent saving undefined team rows due to google sheets layout since there's less teams than individual racers
                if (row.teamName !== undefined) {
                  seasonTeamResult = {
                    teamRank: row.teamRank,
                    teamName: row.teamName,
                    teamPoints: row.teamPoints,
                    teamChange: row.teamChange,
                  }

                  // do this inside conditional so that undefined values aren't added
                  seasonResultsTeam = [...seasonResultsTeam, seasonTeamResult]
                }

                // add each racer's results to the respective array
                seasonResults = [...seasonResults, seasonIndividualResult]
              })
            )

            // Use Lodash's merge() to deep copy the array of all the racer results objects into the statsBySeason object under their respective season
            // Assign the row results to the correct season
            statsBySeason[sheet.title] = merge(seasonResults)
            statsByTeamSeason[sheet.title] = merge(seasonResultsTeam)

            // Update state
            setStatsBySeason(statsBySeason)
            setTeamStatsBySeason(statsByTeamSeason)
            // set data loaded to true so we can render the leaderboard data
            //  setIsDataLoaded(true)
          }

          fetchSeasonRows()
        } else {
          // Something went wrong. Likely a new sheet was added that didn't follow naming convention of "allTime" or starting with "season"
          console.log(
            "Check the sheet names. This sheet either needs to be renamed or added into SeasonResults.js logic"
          )
        }
      })
    }

    fetchRowData()
  }, [sheetsAll, statsBySeason, statsByTeamSeason, dataFetched]) // updates when sheetsAll state updates

  useEffect(() => {
    // Return an array of all the racers and their overall stats from the allTime sheet
    let allTimeList = []

    allTimeList = rowsAllTime.map((row) => {
      let newRacer = {
        id: row.id,
        avatar: row.avatar,
        name: row.name,
        allTime: {
          participated: row.participated,
          championships: row.championships,
          gold: row.gold,
          silver: row.silver,
          bronze: row.bronze,
          timeTrial: row.timeTrial,
        },
      }

      return [...allTimeList, newRacer]
    })

    const flattened = [].concat(...allTimeList)

    setStatsAllTime(flattened)
  }, [rowsAllTime, dataFetched]) // Trigger useEffect when the rowsAllTime state updates

  return (
    <tbody>
      {isDataLoaded ? (
        (function () {
          switch (true) {
            case props.teamToggle === "individual" &&
              props.season !== "allTime":
              return (
                <PrintSeasonData
                  teamToggle={props.teamToggle}
                  season={props.season}
                  statsBySeason={statsBySeason}
                />
              )

            case props.teamToggle === "individual" &&
              props.season === "allTime":
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
                />
              )

            default:
              return null
          }
        })()
      ) : (
        <tr>
          <td colSpan="7" className="loading-message">
            Loading data...
          </td>
        </tr>
      )}
    </tbody>
  )
}

export default SeasonResults
