import React from 'react'; 

const SeasonFilter = (props) => {

    return (
        <div> 
            <label htmlFor="season" style={{visibility: "hidden"}}>Season: </label>
            <select className="bg-blue-500" defaultValue={props.value} onChange={(e) => props.onChange(e.target.value)} name="season" id="season"> 
                <option value="season1">Season 1</option>
                <option value="season2">Season 2</option>
                <option value="allTime">All Time</option>
            </select> 
        </div>
    )
}

export default SeasonFilter;