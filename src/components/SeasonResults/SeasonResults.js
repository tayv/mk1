import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const SeasonResults = (props) => {
    const [racers, setRacers] = useState([]);
    // this new way changed the response data somehow. now no request.data
    const fetchData = async () => {
        const request = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
        setRacers([request]);
        console.log(racers);
    }

    useEffect(() => {

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