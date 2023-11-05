import { useState, useEffect } from "react"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { merge } from "lodash"

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

const doc = new GoogleSpreadsheet(spreadsheetID)
doc.useApiKey(apiKey)

const fetchRacerListRows = async (sheet) => {
  const rowsAllTime = await sheet.getRows({ limit: 24 }) // returns 25 racers because array starts at 0
  return rowsAllTime.filter((row) => row.id && row.id.trim() !== "") // filter empty rows
}

const fetchSeasonRows = async (sheet) => {
  const rowsSeasonList = await sheet.getRows({ limit: 15 }) // returns 16 racers
  let seasonResults = []
  let seasonResultsTeam = []

  await Promise.all(
    rowsSeasonList.map(async (row) => {
      console.log("ROW:", row)
      seasonResults.push({
        rank: row.rank,
        name: row.name,
        avatar: row.avatar,
        points: row.points,
        change: row.change,
        bye: row.bye,
        projected: row.projected,

        projName: row.projName,
        projAvatar: row.projAvatar,
        projCurrentPoints: row.projCurrentPoints,
        projBye: row.projBye,
        projProjected: row.projProjected,
      })

      if (row.teamName !== undefined) {
        seasonResultsTeam.push({
          teamRank: row.teamRank,
          teamName: row.teamName,
          teamPoints: row.teamPoints,
          teamBye: row.teamBye,
          teamProjected: row.teamProjected,
          teamChange: row.teamChange,
        })
      }
    })
  )

  return {
    seasonResults: merge(seasonResults),
    seasonResultsTeam: merge(seasonResultsTeam),
  }
}

export const useGoogleSheetData = () => {
  const [sheetsAll, setSheetData] = useState([])
  const [statsAllTime, setStatsAllTime] = useState([])
  const [rowsAllTime, setRowsAllTime] = useState([])
  const [statsBySeason, setStatsBySeason] = useState({})
  const [statsByTeamSeason, setTeamStatsBySeason] = useState({})
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await doc.loadInfo()
        const sheetsAll = doc.sheetsByIndex
        setSheetData(sheetsAll)

        for (const sheet of sheetsAll) {
          if (sheet.title === "allTime") {
            const allTimeRows = await fetchRacerListRows(sheet)
            setRowsAllTime(allTimeRows)
          } else if (/season/gm.test(sheet.title)) {
            const { seasonResults, seasonResultsTeam } = await fetchSeasonRows(
              sheet
            )
            setStatsBySeason((prev) => ({
              ...prev,
              [sheet.title]: seasonResults,
            }))
            setTeamStatsBySeason((prev) => ({
              ...prev,
              [sheet.title]: seasonResultsTeam,
            }))
          }
        }
        setIsDataLoaded(true)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err.message)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const allTimeList = rowsAllTime.map((row) => ({
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
    }))

    setStatsAllTime([].concat(...allTimeList))
  }, [rowsAllTime])

  return {
    sheetsAll,
    statsAllTime,
    rowsAllTime,
    statsBySeason,
    statsByTeamSeason,
    isDataLoaded,
    error,
  }
}
