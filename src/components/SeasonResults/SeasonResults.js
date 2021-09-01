import React, { useState, useEffect } from 'react'; 
import { GoogleSpreadsheet } from 'google-spreadsheet';
import merge from 'lodash/merge';

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// For google spreadsheet api refer to https://theoephraim.github.io/node-google-spreadsheet/#/?id=working-with-rows
const doc = new GoogleSpreadsheet(spreadsheetID);
doc.useApiKey(apiKey);

const SeasonResults = (props) => {
    const [sheetsAll, setSheetData] = useState([]);
    const [statsAllTime, setStatsAllTime] = useState([]); // allTime stats by racer used to display alltime results
    const [rowsAllTime, setRowsAllTime] = useState([]);
    const [statsBySeason, setStatsBySeason] = useState({});

    

    useEffect(() => {
        const fetchSheetData = async () => {
            // load the google sheet 
            await doc.loadInfo();
        
            // get an array of all sheets as objects. Need to use sheetsByIndex so that it's an array.
            const sheetsAll = doc.sheetsByIndex;
            // save to state
            setSheetData(sheetsAll);
        }

        fetchSheetData();

    }, []); // leave dependency array blank as only need to run once on page render

    useEffect(() => {
        const fetchRowData = async () => {

           sheetsAll.forEach((sheet) => {

            // Regex used to check if sheet name contains string "season" so we can get rows from the right sheet
            const regexMatchSeason = /season/mg;

            if (sheet.title === "allTime") {
                // If we're on the allTime sheet then grab all the row data and save it in state so we can work with it 
                async function fetchRacerListRows() {

                    // Get all the active rows for this sheet
                    const rowsAllTime = await sheet.getRows();

                    // save the data to state so we can trigger other useEfects
                    setRowsAllTime(rowsAllTime);   
                }

                  fetchRacerListRows()
                 

            } else if (sheet.title.match(regexMatchSeason)) {

                // If we're on a sheet starting with "season" then get each row and deep copy it into the statsBySeason object
                async function fetchSeasonRows() {

                    // TODO: limit should be updated to be dynamic based on number of racers in allTime sheet. 
                    // This will break if more than 12 racers added in a season    
                    const rowsSeasonList = await sheet.getRows({limit: 13});

                    // Initialize array to hold each season's row
                    let seasonResults = [];

                    // Promise.all groups promises together in an iterable array and prevents race conditions
                    await Promise.all(rowsSeasonList.map(async (row) => {
                        // Each row represents a racers results for that season
                        // Save desired stats to an object
                        let seasonRowResult = {
                            rank: row.rank,
                            name: row.name,
                            points: row.points,
                            change: row.change
                        }
                        // add each racer's results to the array 
                        return seasonResults = [...seasonResults, seasonRowResult]

                    }))

                    // Use Lodash's merge() to deep copy the array of all the racer results objects into the statsBySeason object under their respective season
                    // Assign the row results to the correct season
                    statsBySeason[sheet.title] = merge(seasonResults);
                    // Update state 
                    setStatsBySeason(statsBySeason);
                 }

                 fetchSeasonRows();
                
            } else {

                // Something went wrong. Likely a new sheet was added that didn't follow naming convention of "allTime" or starting with "season"
                console.log("Check the sheet names. This sheet either needs to be renamed or added into SeasonResults.js logic")
            }   

           })
        }
      
        fetchRowData();

      }, [sheetsAll, statsBySeason]); // updates when sheetsAll state updates


    useEffect(() => {
        // Return an array of all the racers and their overall stats from the allTime sheet
        let allTimeList = [];

        allTimeList = rowsAllTime.map((row) => {
            let newRacer = {
                id: row.id,
                avatar: row.avatar,
                name: row.name,
                allTime: {
                    championships: row.championships,
                    participated: row.participated
                }
            }
            
            return [...allTimeList, newRacer]
            
        })
        
        setStatsAllTime(allTimeList);                    
                   
    }, [rowsAllTime]) // Trigger useEffect when the rowsAllTime state updates


    return (
        <tbody>
            {
                // want to add statsBySeason state data (grabbed from Google Sheet API using PrintSeasonRows() into table rows here
                // Use a ternary since statBySeason state takes a moment to update as PrintSeasonRows() is async. 
                // Without it there will be an error trying to access child property of undefined since initial state is empty 
                !statsBySeason.[props.season] ? <tr /> : (
                 
                    statsBySeason.[props.season].map( (row) => (
                        <tr key={ row.rank }>
                            <td>{ row.rank }</td>
                            <td>{ row.name }</td>
                            <td>{ row.points }</td>
                            <td>{ row.change }</td>
                        </tr>
                    ))
                ) 
            }
        </tbody>
    )
}

export default SeasonResults;