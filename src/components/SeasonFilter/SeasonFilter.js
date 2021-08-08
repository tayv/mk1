import React, { useState } from 'react'; 

// const seasonList = ["season1", "season2", "alltime"];

const SeasonFilter = (props) => {
    const [season, setSeason] = useState(props.value);

    const handleSeasonChange = (e) => {
        setSeason(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="Leaderboard-filter"> 
            <label for="season" style={{visibility: "hidden"}}>Season: </label>
            <select defaultValue={props.value} onChange={(e) => handleSeasonChange(e)} name="season" id="season">
                <option value="season1">Season 1</option>
                <option value="season2">Season 2</option>
                <option value="alltime">All Time</option>
            </select> 
        </div>
    )
}

export default SeasonFilter;