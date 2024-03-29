import { useState, useEffect, useRef } from "react"
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
          teamProjected: row.teamProjected,
          teamBye: row.teamBye,
          teamChange: row.teamChange,

          projTeamRank: row.projTeamRank,
          projTeamName: row.projTeamName,
          projTeamPoints: row.projTeamPoints,
          projTeamProjected: row.projTeamProjected,
          projTeamBye: row.projTeamBye,
        })
      }
    })
  )

  return {
    seasonResults: merge(seasonResults),
    seasonResultsTeam: merge(seasonResultsTeam),
  }
}

export const useGoogleSheetData = (season) => {
  const [sheetsAll, setSheetData] = useState([])
  const [statsAllTime, setStatsAllTime] = useState([])
  const [rowsAllTime, setRowsAllTime] = useState([])
  const [statsBySeason, setStatsBySeason] = useState({})
  const [statsByTeamSeason, setTeamStatsBySeason] = useState({})
  const [isAllDataLoaded, setIsDataLoaded] = useState(false)
  const [error, setError] = useState(null)

  const [isCurrentSeasonLoaded, setCurrentSeasonLoaded] = useState(false) // Used to track when current season is fetched for better loading performance

  const docInfoLoaded = useRef(false) // Ref to track if the doc info has been loaded

  useEffect(() => {
    const fetchSpecificSeasonData = async () => {
      try {
        if (!docInfoLoaded.current) {
          await doc.loadInfo()
          docInfoLoaded.current = true // update ref so we don't make unnecessary calls in later useEffects
        }
        const sheetName = doc.sheetsByTitle[season]

        if (sheetName.title === "allTime") {
          const allTimeRows = await fetchRacerListRows(sheetName)
          setRowsAllTime(allTimeRows)
        } else if (/season/gm.test(sheetName.title)) {
          const { seasonResults, seasonResultsTeam } = await fetchSeasonRows(
            sheetName
          )
          setStatsBySeason((prev) => ({
            ...prev,
            [sheetName.title]: seasonResults,
          }))
          setTeamStatsBySeason((prev) => ({
            ...prev,
            [sheetName.title]: seasonResultsTeam,
          }))
        }

        setCurrentSeasonLoaded(true)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err.message)
      }
    }

    fetchSpecificSeasonData()
  }, [season])

  // To fetch all season data. Want to do this after initial season is loaded.
  useEffect(() => {
    if (isCurrentSeasonLoaded) {
      const fetchAllSeasonData = async () => {
        try {
          if (!docInfoLoaded.current) {
            await doc.loadInfo()
            docInfoLoaded.current = true // update ref so we don't make unnecessary calls in later useEffects
          }
          const sheetsAll = doc.sheetsByIndex
          setSheetData(sheetsAll)

          for (const sheet of sheetsAll) {
            if (sheet.title === "allTime") {
              const allTimeRows = await fetchRacerListRows(sheet)
              setRowsAllTime(allTimeRows)
            } else if (/season/gm.test(sheet.title)) {
              const { seasonResults, seasonResultsTeam } =
                await fetchSeasonRows(sheet)
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

      fetchAllSeasonData()
    }
  }, [isCurrentSeasonLoaded])

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
    isAllDataLoaded,
    isCurrentSeasonLoaded,
    error,
  }
}
