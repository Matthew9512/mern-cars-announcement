import React, { useState } from 'react';

const InputComponent = () => {
   const [inputs, setInputs] = useState([
      { id: 1, value: '', disabled: false },
      { id: 2, value: '', disabled: true },
      { id: 3, value: '', disabled: true },
      // Add more inputs as needed...
   ]);

   const handleInputChange = (index, value) => {
      const updatedInputs = [...inputs];
      updatedInputs[index].value = value;

      if (index > 0) {
         if (value.length > 5) {
            updatedInputs[index - 1].disabled = false;
         } else if (!value.length) {
            updatedInputs[index].disabled = true;
         }
      }

      setInputs(updatedInputs);
   };

   return (
      <div>
         {inputs.map((input, index) => (
            <input
               key={input.id}
               value={input.value}
               disabled={input.disabled}
               onChange={(e) => handleInputChange(index, e.target.value)}
            />
         ))}
      </div>
   );
};

export default InputComponent;
