import axios from 'axios';
import React, { useEffect } from 'react';

const RacerList = (props) => {

    useEffect(() => {
        async function fetchData () {
            const request = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
            console.log(request);
            return request;
        }

        fetchData();

    }, [props.season]);

    return ( 
        <div>

        </div>
      )
}
 
export default RacerList;