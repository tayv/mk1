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

    useEffect(() => {

        (async function() {
            await doc.loadInfo();
         
            const sheetRacerList = doc.sheetsByIndex[0];
        
            const sheetSeason1 = doc.sheetsByIndex[1];
            const sheetSeason2 = doc.sheetsByIndex[2];
         
            const rowsRacerList = await sheetRacerList.getRows(); // can pass in { limit, offset }
           // const rowsSeason1 = await sheetSeason1.getRows();
           // const rowsSeason2 = await sheetSeason2.getRows();
            

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


            // sheetsArray used to store each sheets data. Later iterate through this to update season specific data.
            const sheetsArray = [];
            const updateSheetsArray = (doc) => {
                for (let i=0; i<doc.sheetCount; i++) {
                    sheetsArray[i] = doc.sheetsByIndex[i];
            
                }
                console.log(sheetsArray)

         
            }
            
           updateSheetsArray(doc);


             

            // To update a single season's records
            // Season name is an array of strings using format: seasonX (e.g. [season1, seaons2])
            const updateSeasonData = async (seasonArray) => { 
                
                for (let i=0; i<seasonArray.length; i++) {

                    if (sheetsArray[i].title === "racerList") {
                        // Skip racerList sheets as only want to set season data here.
                        return
                    }

                    let rowsAllSeasons = [];
                    rowsAllSeasons[i] = await sheetsArray[i].getRows().then((response) => {
                        
                        // limit to statsRacers length so that you only loop through rows for how many racers there are
                        for (let j=0; j<statsRacers.length; j++) {

                            if (response[j].name === undefined) {
                                // filter out empty rows for each season since racerList holds alltime number of racers 
                                return
                            }

                            console.log(response[j].name);
                            
                        }
                        

                        // statsBySeason is an array saved to state. 
                        // Dynamically add an object to statsBySeason array for each season by using i
                        // add a key for each season to organize statsSeason 
                        // add 1 to iterator since index starts at zero
                        statsBySeason["season" + (i + 1)] =  {
                            standings: [ {
                                rank: response[i].rank,
                                name: response[i].name,
                                points: response[i].points
                            } ]
              
                        
                        };

             
                    })

                    
                    

                }
            }
          
            updateSeasonData(sheetsArray);
            console.log(statsBySeason);

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
                <tr key={racer.data.id}>
                    <td>{ racer.data.title }</td>
                </tr>
            )) }
        </tbody>
    )
}

export default SeasonResults;