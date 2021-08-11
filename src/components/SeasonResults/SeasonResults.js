import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const doc = new GoogleSpreadsheet(spreadsheetID);
doc.useApiKey(apiKey);


const SeasonResults = (props) => {
    const [racers, setRacers] = useState([]);

    useEffect(() => {

        (async function() {
            await doc.loadInfo();
            console.log(doc.title)
            const sheet = doc.sheetsByIndex[0];
            console.log(sheet);
            const rows = await sheet.getRows(); // can pass in { limit, offset }

            // read/write row values
            console.log(rows[0].championships);
            console.log(sheet.headerValues[2])
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
          {console.log(racers)}
        </tbody>
    )
}

export default SeasonResults;