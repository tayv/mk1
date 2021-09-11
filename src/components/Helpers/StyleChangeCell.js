
// Used to update the colors in the table change cell
const StyleChangeCell = (props) => {
    let changeString = props;
    let changeCellStyle;
    let regexChangeDown = /^[-][0-9]/gm;
    let regexChangeUp = /^[+][0-9]/gm;
    let regexChangeNone = /^[-]+$/gm;

    if (changeString.match(regexChangeNone)) { 

        changeCellStyle = "bg-gray-300 text-gray-100" 
        return changeCellStyle; 

    } else if (changeString.match(regexChangeUp)) {

        changeCellStyle = "bg-green-500 text-gray-100"
        return changeCellStyle;

    } else if (changeString.match(regexChangeDown)) {

        changeCellStyle = "bg-red-500 text-gray-100"
        return changeCellStyle;

   }

}

export default StyleChangeCell;