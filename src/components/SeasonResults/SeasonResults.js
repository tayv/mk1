import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// For google spreadsheet api refer to https://theoephraim.github.io/node-google-spreadsheet/#/?id=working-with-rows
const doc = new GoogleSpreadsheet(spreadsheetID);
doc.useApiKey(apiKey);

// initialilize objects to hold racer and season stats from Google Sheets
const statsRacers = [];
const statsBySeason = [];


const SeasonResults = (props) => {
    const [racers, setRacers] = useState([]);
    const [sheetList, setSheetList] = useState([]);
    const [seasonList, setSeason] = useState([]);

    useEffect(() => {

        (async function() {
            await doc.loadInfo();
        
            // get an array of all sheets as objects 
            const sheetsAll = doc.sheetsByIndex;
            console.log("sheetsALL:", sheetsAll )

            sheetsAll.forEach((sheet) => {
               
                // Regex used to check if sheet name contains string "season"
                const regexMatchSeason = /season/mg;
                if (sheet.title === "racerList") {
                    // If we're on the racerList sheet then grab all the row data
                    async function printRows() {
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
                            // add each racers profile to the racers state
                            racers.push(newRacer)
                        }));
                        // set state now that array is updated
                        setRacers(racers);
                      }
                      printRows()
 
                   // console.log(rowsRacerList[1].name);  
                } else if (sheet.title.match(regexMatchSeason)) {
                    // Get all the season specific data
                    seasonList.push(sheet.title);
                    return seasonList;

                } else {
                    console.log("Check the sheet names. This sheet either needs to be renamed or added into SeasonResults logic")
                }
               
            }) 
/*
            console.log("here", seasonList)
            const sheetRacerList = doc.sheetsByIndex[0];
            const sheetSeason1 = doc.sheetsByIndex[1];
            const sheetSeason2 = doc.sheetsByIndex[2];
         
            const rowsRacerList = await sheetRacerList.getRows(); // can pass in { limit, offset }
            
            const updateRacerData = (rowLimit) => {
                // updateRacer() updates racers state object 
                // rowLimit is a number used to limit the number of rows looped through. Should be equal to number of racers +1 (because of heading row)
                for (let i=0; i<rowLimit; i++) {
                   statsRacers[i]= {
                       id: rowsRacerList[i].id,
                       avatar: rowsRacerList[i].avatar,
                       name: rowsRacerList[i].name,
                       allTime: {
                           championships: rowsRacerList[i].championships,
                           participated: rowsRacerList[i].participated
                       }

                    };
                 }
            }
            
            updateRacerData(13);

         
/*
            // sheetsArray used to store each sheets data. Later iterate through this to update season specific data.
            const sheetsArray = [];
            const updateSheetsArray = (doc) => {
                for (let i=0; i<doc.sheetCount; i++) {
                    sheetsArray[i] = doc.sheetsByIndex[i];
                }

                // Use regex to check if sheet name contains "season"
                const regexMatchSeason = /season/mg;
                // Create a list of season sheets titles. Dynamically updates so we know how much data to grab in updateSeasonData()
                let seasonList = sheetsArray.map( season => {
                    // if sheet name includes "season" then add it to array
                    if ( season.title.match(regexMatchSeason) ) {
                        return season.title;
                    } else {
                        // not a season data sheet so will return undefined. These are filtered out below
                        return 
                    }
                })
                // Filter out falsy aka undefined values resulting from failing map condition above
                seasonList = seasonList.filter(Boolean);
                // Update the state with the latest seasonList
                setSeason(seasonList);
         
            } 
            
           updateSheetsArray(doc); */
            


            // To update a single season's records
            // Season name is an array of strings using format: seasonX (e.g. [season1, seaons2])
            const updateSeasonData = async (seasonList) => { 
                console.log("wurk", seasonList)
                seasonList.forEach( (season) => {

                    console.log("SEAS", season.title);
                })

                /*
                for (let i=0; i<seasonList.length; i++) {

                     
                        // works so long as google sheets follow sheetx naming conventions for seasons
                        statsBySeason[sheetsArray[i].title] = {};

                        let rowsAllSeasons = [];
                        rowsAllSeasons[i] = await sheetsArray[i].getRows().then((response) => {
                            
                            // limit to statsRacers length so that you only loop through rows for how many racers there are
                            for (let j=0; j<statsRacers.length; j++) {

                                if (response[j].name === undefined) {
                                    // do nothing for empty rows since racerList holds all time number of racers 
                                } else {
                                    // statsBySeason is an array saved to state. 
                                    // Dynamically add an object to statsBySeason array for each season by using i
                                    // add a key for each season to organize statsSeason 
                                    // add 1 to iterator since index starts at zero
                                    statsBySeason["season" + (i + 1)] =  {
                                        standings: [ {
                                            rank: response[j].rank,
                                            name: response[j].name,
                                            points: response[j].points
                                        } ]
                                    } 

                                    let racer = response[j].name;
                                    
                                    racer = {
                                        rank: response[j].rank,
                                        name: response[j].name,
                                        points: response[j].points
                                    } 

                                    statsBySeason.push(racer);


                                }
                                
                            }
                            
                
                        }) 
                    

                } */
            }
          
            updateSeasonData(seasonList);
            

          }());
     
    }, [props.season]); 

    /*
    useEffect(() => {
        const fetchData = async () => {
            const fetchURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}?key=${apiKey}` ; 
            // add this to dependency array if define outside file since each time it updates you'll need to refetch data
            console.log(fetchURL);
            const request = await axios.get(fetchURL);
            setRacers([request]);
        }

        fetchData();

    }, [props.season]);
*/

    return (
        <tbody>
          { racers.map( (racer) => (
                <tr key={racer.id}>
                    <td>{ racer.name }</td>
                </tr>
            )) }
        </tbody>
    )
}

export default SeasonResults;