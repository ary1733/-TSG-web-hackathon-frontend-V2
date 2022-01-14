import React, { useState, useCallback } from "react";
import AsyncCreatableSelect from "react-select/lib/Creatable";

function Multi_select_text() {
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);

  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
  );

  const loadOptions = (inputValue, callback) =>
    setTimeout(() => {
      callback(
        options.filter((item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, 3000);

  return (
    <div className="App">
      <AsyncCreatableSelect
        isClearable
        value={value}
        options={options}
        onChange={handleChange}
        onCreateOption={handleCreate}
        cacheOptions
        loadOptions={loadOptions}
      />
    </div>
  );
}

export default React.memo(Multi_select_text);