import { React} from 'react';
import { RadioGroup } from '@headlessui/react'

export const TypeRadioGroup = (props) => {
    //let [plan, setPlan] = useState('startup')
    
  
    return (
      <div>
        <RadioGroup value={props.value} onChange={value => props.onChange(value)}>
        <RadioGroup.Label className="sr-only">Stats Type</RadioGroup.Label>
        <div className="flex justify-evenly cursor-pointer">
          <RadioGroup.Option value="individual">
            {({ checked }) => (
              <span className={ checked ? "rounded-l-lg bg-gray-800 px-4 py-3 text-gray-100" : "ring-4 ring-gray-800 ring-inset rounded-l-lg px-4 py-3 cursor-pointer bg-gray-400 opacity-90 text-gray-600"}>
                Individual
              </span>
            )}
          </RadioGroup.Option>
      
          <RadioGroup.Option value="team">
            {({ checked }) => (
              <span className={ checked ? "rounded-r-lg bg-gray-800 px-4 py-3 text-gray-100" : "ring-4 ring-gray-800 ring-inset rounded-r-lg px-4 py-3 cursor-pointer bg-gray-400 opacity-90 text-gray-600"}>
                Team
              </span>
            )}
          </RadioGroup.Option>
        </div>
        </RadioGroup>
      </div>
      
    )
  }

 export default TypeRadioGroup;