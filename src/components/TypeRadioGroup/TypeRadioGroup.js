import { React} from 'react';
import { RadioGroup } from '@headlessui/react'

export const TypeRadioGroup = (props) => {
    //let [plan, setPlan] = useState('startup')
    
  
    return (
      <div className="px-4">
        <RadioGroup value={props.value} onChange={value => props.onChange(value)}>
        <RadioGroup.Label className="sr-only">Stats Type</RadioGroup.Label>
        <div className="space-y-2 relative rounded-lg px-5 py-4 cursor-pointer">
          <div className="flex justify-evenly px-4">
            <RadioGroup.Option value="individual">
              {({ checked }) => (
                <span className={checked ? "rounded-l-lg bg-gray-800 px-4 py-3 text-gray-100" : "ring-4 ring-gray-800 ring-inset rounded-l-lg px-4 py-3 cursor-pointer text-gray-600"}>Individual</span>
              )}
            </RadioGroup.Option>
        
            <RadioGroup.Option value="team">
              {({ checked }) => (
                <span className={checked ? "rounded-r-lg bg-gray-800 px-4 py-3 text-gray-100" : "ring-4 ring-gray-800 ring-inset rounded-r-lg px-4 py-3 cursor-pointer text-gray-600"}>Team</span>
              )}
            </RadioGroup.Option>
          </div>
        </div>
        </RadioGroup>
      </div>
      
    )
  }

 export default TypeRadioGroup;