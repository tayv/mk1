import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import merge from 'lodash/merge';

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// For google spreadsheet api refer to https://theoephraim.github.io/node-google-spreadsheet/#/?id=working-with-rows
const doc = new GoogleSpreadsheet(spreadsheetID);
doc.useApiKey(apiKey);

// initialilize objects to hold racer and season stats from Google Sheets
const statsRacers = [];

const SeasonResults = (props) => {
    const [racers, setRacers] = useState([]);
    const [sheetList, setSheetList] = useState([]);
    const [seasonList, setSeason] = useState([]); // will be used to set options in season filter. Need to raise up state to Leaderboard.js
    const [statsBySeason, setStatsBySeason] = useState([{season0: "loading"}]);

    useEffect(() => {

        (async function() {
            // load the google sheet 
            await doc.loadInfo();
        
            // get an array of all sheets as objects 
            const sheetsAll = doc.sheetsByIndex;

            sheetsAll.forEach((sheet) => {       

                // Regex used to check if sheet name contains string "season"
                const regexMatchSeason = /season/mg;

                if (sheet.title === "racerList") {
                    // If we're on the racerList sheet then grab all the row data
                    async function printRows() {

                        // Get all the active rows for this sheet
                        const rowsRacerList = await sheet.getRows();

                        // Cannot use forEach() with promises. Need to use Promise.all with map() to get an array of promises
                        // See https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
                        await Promise.all(rowsRacerList.map(async (row) => {

                            // Each racer will have an object referencing their overall stats
                            let newRacer = {
                                id: row.id,
                                avatar: row.avatar,
                                name: row.name,
                                allTime: {
                                    championships: row.championships,
                                    participated: row.participated
                                    }
                            }
                            // add each racers profile to the racers' state
                            racers.push(newRacer)
                        }));
                        // set state now that array is updated
                        setRacers(racers);
                      }
                      printRows()
  
                } else if (sheet.title.match(regexMatchSeason)) {

                    // If we're on a sheet starting with "season" then get each row and deep copy it into the statsBySeason object
                    async function printSeasonRows() {

                        // TODO: limit should be updated to be dynamic based on number of racers in racerList sheet. 
                        // This will break if more than 13 racers added in a season    
                        const rowsSeasonList = await sheet.getRows({limit: 13});
                        let seasonResults = [];

                        // Promise.all groups promises together in an iterable array and prevents race conditions
                        await Promise.all(rowsSeasonList.map(async (row) => {

                            // Each row represents a racers results for that season
                            // Save desired stats to an object
                            let seasonRowResults = {
                                rank: row.rank,
                                name: row.name,
                                points: row.points
                            }
                            // add each racer's results to an array for each season
                            seasonResults.push(seasonRowResults);

                        }))

                        // Use Lodash's merge() to deep copy the array of all the racer results objects into the statsBySeason object under their respective season
                        statsBySeason[sheet.title] = merge(seasonResults);
                        
                        // Update state 
                        setStatsBySeason(statsBySeason);
                     }

                     printSeasonRows();

                } else {

                    // Something went wrong. Likely a new sheet was added that didn't follow naming convention of "racerList" or starting with "season"
                    console.log("Check the sheet names. This sheet either needs to be renamed or added into SeasonResults.js logic")
                }  
            }) 
          
          }());
     
    }, [props.season, racers, statsBySeason]); 


    return (
        <tbody>

            
           { 
        
            statsBySeason.forEach( (season) => {
                <tr>

                    <td>{"hi"}</td>
                </tr>
               
            })
        
          
          /* { racers.map( (racer) => (
                <tr key={racer.id}>
                    <td>{ racer.name }</td>
                </tr>
          )) } */ }
        

        </tbody>
    )
}

export default SeasonResults;