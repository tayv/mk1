import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// For google spreadsheet api refer to https://theoephraim.github.io/node-google-spreadsheet/#/?id=working-with-rows
const doc = new GoogleSpreadsheet(spreadsheetID);
doc.useApiKey(apiKey);

const sheetDataRacerList = [];

const SeasonResults = (props) => {
    const [racers, setRacers] = useState([]);

    useEffect(() => {

        (async function() {
            await doc.loadInfo();
          //  console.log(doc)
            const sheetRacerList = doc.sheetsByIndex[0];
           // console.log("racer list ", sheetRacerList.rowCount)
            const sheetSeason1 = doc.sheetsByIndex[1];
            const sheetSeason2 = doc.sheetsByIndex[2];
            // console.log(sheet);
            const rowsRacerList = await sheetRacerList.getRows(); // can pass in { limit, offset }
            const rowsSeason1 = await sheetSeason1.getRows();
            const rowsSeason2 = await sheetSeason2.getRows();
            console.log("rowsRacerList: ", rowsRacerList)
            // read/write row values

            const updateRacer = (rowLimit) => {
                // updateRacer() updates racers state object 
                // rowLimit is a number used to limit the number of rows looped through. Should be equal to number of racers +1 (because of heading row)
                for (let i=0; i<rowLimit; i++) {
                   sheetDataRacerList[i]= {
                       id: rowsRacerList[i].id,
                       avatar: rowsRacerList[i].avatar,
                       name: rowsRacerList[i].name,
                       allTime: {
                           championships: rowsRacerList[i].championships,
                           participated: rowsRacerList[i].participated
                       }

                    };
                  console.log(sheetDataRacerList)
                 }
            }
            
             
           
            
            
            updateRacer(13);
          
            console.log("sheeDataRacerList: ", sheetDataRacerList);
           // console.log(sheet.headerValues[2])
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