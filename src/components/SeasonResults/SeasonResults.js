import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const spreadsheetID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const SeasonResults = (props) => {
    const [racers, setRacers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchURL = `https://sheets.googleapis.com/v4/spreadsheets/{${spreadsheetID}}?key=${apiKey}` ; 
            // add this to dependency array if define outside file
            console.log(fetchURL);
            const request = await axios.get(fetchURL);
            setRacers([request]);
        }

        fetchData();

    }, [props.season]);

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