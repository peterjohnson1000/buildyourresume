import { useState } from 'react';
import DropdownSelect from 'react-dropdown-select';

const AdditionalSection = () => {

    let option = [
        { value: 'Acheivements', label: 'Acheivements' },
        { value: 'Publications', label: 'Publications' },
        { value: 'Custom Section', label: 'Custom Section' },
    ];

    const [selectedValue, setSelectedValue] = useState([]);
    const [options, setOptions] = useState(option);

    console.log(selectedValue);

    const handleDropdownChange = (value) => {
        const selectedOptionValue = value;
        setSelectedValue(selectedOptionValue);
    
        const updatedOptions = options.filter(option => option.value !== selectedOptionValue);
        setOptions(updatedOptions);
    };
    
    return (
        <div className="bg-white w-[600px] rounded-md p-5 my-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <DropdownSelect options={options} onChange={(o) => handleDropdownChange(o[0].value)}/>
        </div>
    );
};

export default AdditionalSection;