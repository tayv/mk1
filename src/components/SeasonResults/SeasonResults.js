import React, { useState, useEffect } from 'react'; 
import { GoogleSpreadsheet } from 'google-spreadsheet';
import merge from 'lodash/merge';
import useDeepCompareWithRef from '../DeepCompare';

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// For google spreadsheet api refer to https://theoephraim.github.io/node-google-spreadsheet/#/?id=working-with-rows
const doc = new GoogleSpreadsheet(spreadsheetID);
doc.useApiKey(apiKey);

const SeasonResults = (props) => {
    const [sheetsAll, setSheetData] = useState([]);
    const [rowsBySeason, setRowsBySeason] = useState([]);
    const [statsByRacer, setStatsByRacer] = useState([]);
    const [rowsRacerList, setRowsRacerList] = useState([]);
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

            if (sheet.title === "racerList") {
                // If we're on the racerList sheet then grab all the row data and save it in state so we can work with it 
                async function fetchSeasonRows() {

                    // Get all the active rows for this sheet
                    const rowsRacerList = await sheet.getRows();

                    // save the data to state so we can trigger other useEfects
                    setRowsRacerList(rowsRacerList);   
                }

                  fetchSeasonRows()
                 

            } else if (sheet.title.match(regexMatchSeason)) {

                // If we're on a sheet starting with "season" then get each row and deep copy it into the statsBySeason object
                async function getSeasonRows() {

                    // TODO: limit should be updated to be dynamic based on number of racers in racerList sheet. 
                    // This will break if more than 13 racers added in a season    
                    const rowsSeasonList = await sheet.getRows({limit: 13});
                    console.log("asdfasdf", rowsSeasonList)
                    let seasonResults = [];

                    // Promise.all groups promises together in an iterable array and prevents race conditions
                    await Promise.all(rowsSeasonList.map(async (row) => {

                        // Each row represents a racers results for that season
                        // Save desired stats to an object
                        let seasonRowResults = {
                            rank: row.rank,
                            name: row.name,
                            points: row.points,
                            change: row.change
                        }
                        // add each racer's results to an array for each season
                        seasonResults.push(seasonRowResults);

                    }))

                    // Use Lodash's merge() to deep copy the array of all the racer results objects into the statsBySeason object under their respective season
                    //statsBySeason[sheet.title] = merge(seasonResults);
                    
                    // Need a copy so don't mutate state
                    let statsBySeasonCopy = statsBySeason[sheet.title] = merge(seasonResults);

                    // Update state 
                    setStatsBySeason(statsBySeasonCopy);
                    console.log("Just updated the statsBySeason using setstate() inside useEffect()", statsBySeason)
                 }

                 getSeasonRows();

            } else {

                // Something went wrong. Likely a new sheet was added that didn't follow naming convention of "racerList" or starting with "season"
                console.log("Check the sheet names. This sheet either needs to be renamed or added into SeasonResults.js logic")
            }   
              console.log(sheet.title);

           })

          // setRowsBySheet(sheetsAllCopy);
        }
      
        fetchRowData();

      }, [sheetsAll]); // updates when sheetsAll state updates

    useEffect(() => {
       // console.log("rowwws", rowsRacerList)
        let racerList = [];

        rowsRacerList.map((row) => {
            let newRacer = {
                id: row.id,
                avatar: row.avatar,
                name: row.name,
                allTime: {
                    championships: row.championships,
                    participated: row.participated
                }
            
            }
            racerList = [...racerList, newRacer]

            return racerList;
            
        })
        setStatsByRacer(racerList);
        console.log("here",racerList)
        // Cannot use forEach() with promises. Need to use Promise.all with map() to get an array of promises
        // See https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
        // const rowPromises = async () => {
        //     let statsAllRacers = [];
        //     await Promise.all(rowsRacerList.map(async (row) => {

        //         // Each racer will have an object referencing their overall stats
        //         let newRacer = {
        //             id: row.id,
        //             avatar: row.avatar,
        //             name: row.name,
        //             allTime: {
        //                 championships: row.championships,
        //                 participated: row.participated
        //             }
        //         }
        //         // add each racers profile to the statsByRacer state
        //         statsAllRacers.push(newRacer)

        //     }));
        //     console.log("Orignial:", "total", statsAllRacers);
        //     setStatsByRacer(statsAllRacers);
        // }

        // rowPromises()
                    
                   
    }, [rowsRacerList]) // Trigger useEffect when the rowsRacerList state updates


    // useEffect(() => {
    //     console.log("This is the value of statsBySeason at render:", statsBySeason);

    //     (async function() {
    //         // load the google sheet 
    //     //    await doc.loadInfo();
        
    //         // get an array of all sheets as objects 
    //      //   const sheetsAll = doc.sheetsByIndex;

    //         // Loop through each sheet and update racerList or statsBySeason depending on sheet title
    //         sheetsAll.forEach((sheet) => {       

    //             // Regex used to check if sheet name contains string "season"
    //             const regexMatchSeason = /season/mg;

    //             if (sheet.title === "racerList") {
    //                 // If we're on the racerList sheet then grab all the row data and add it to statsByRacer
    //                 async function fetchSeasonRows() {

    //                     // Get all the active rows for this sheet
    //                     const rowsRacerList = await sheet.getRows();

    //                     // Cannot use forEach() with promises. Need to use Promise.all with map() to get an array of promises
    //                     // See https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
    //                     let statsByRacerCopy
    //                     await Promise.all(rowsRacerList.map(async (row) => {

    //                         // Each racer will have an object referencing their overall stats
    //                         let newRacer = {
    //                             id: row.id,
    //                             avatar: row.avatar,
    //                             name: row.name,
    //                             allTime: {
    //                                 championships: row.championships,
    //                                 participated: row.participated
    //                                 }
    //                         }
    //                         // add each racers profile to the statsByRacer state
    //                       //  statsByRacer.push(newRacer)

    //                          statsByRacerCopy = [...statsByRacer, newRacer];
    //                         console.log("Orignial:", statsByRacer, "Copy", statsByRacerCopy, "loop",newRacer);
                           

    //                     }));
    //                     // set state now that array is updated. This should trigger update to the table
                        
    //                   }
    //                   fetchSeasonRows()
  
    //             } else if (sheet.title.match(regexMatchSeason)) {

    //                 // If we're on a sheet starting with "season" then get each row and deep copy it into the statsBySeason object
    //                 async function getSeasonRows() {

    //                     // TODO: limit should be updated to be dynamic based on number of racers in racerList sheet. 
    //                     // This will break if more than 13 racers added in a season    
    //                     const rowsSeasonList = await sheet.getRows({limit: 13});
    //                     let seasonResults = [];

    //                     // Promise.all groups promises together in an iterable array and prevents race conditions
    //                     await Promise.all(rowsSeasonList.map(async (row) => {

    //                         // Each row represents a racers results for that season
    //                         // Save desired stats to an object
    //                         let seasonRowResults = {
    //                             rank: row.rank,
    //                             name: row.name,
    //                             points: row.points,
    //                             change: row.change
    //                         }
    //                         // add each racer's results to an array for each season
    //                         seasonResults.push(seasonRowResults);

    //                     }))

    //                     // Use Lodash's merge() to deep copy the array of all the racer results objects into the statsBySeason object under their respective season
    //                     //statsBySeason[sheet.title] = merge(seasonResults);
                        
    //                     // Need a copy so don't mutate state
    //                     let statsBySeasonCopy = statsBySeason[sheet.title] = merge(seasonResults);

    //                     // Update state 
    //                     setStatsBySeason(statsBySeasonCopy);
    //                     console.log("Just updated the statsBySeason using setstate() inside useEffect()", statsBySeason)
    //                  }

    //                  getSeasonRows();

    //             } else {

    //                 // Something went wrong. Likely a new sheet was added that didn't follow naming convention of "racerList" or starting with "season"
    //                 console.log("Check the sheet names. This sheet either needs to be renamed or added into SeasonResults.js logic")
    //             }  
    //         }) 

    //       }());

    //     // USING deepcompare so useEffect can detect change in object. 
    //     // See https://betterprogramming.pub/tips-for-using-reacts-useeffect-effectively-dfe6ae951421
    // }, [props.season, statsByRacer]); 

    return (
        <tbody>
            {
                // want to add statsBySeason state data (grabbed from Google Sheet API using PrintSeasonRows() into table rows here
                // Use a ternary since statBySeason state takes a moment to update as PrintSeasonRows() is async. 
                // This results in initial state being empty which means an error when attempting to access a child property to fill in table rows  
                // PROBLEM: The data is not updating until user switches filter. Want it to populate as soon as data available/state updated
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