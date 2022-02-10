import React, { useState, useCallback } from 'react';
import Radio from './Radio';

const genderList = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];
const statusList = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
];

function App() {

  const [form, setForm] = useState({
    gender: null,
    status: null
  });

  const onValidate = (value, name) => {
    setError(prev => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value }
    }));
  }

  const [error, setError] = useState({
    gender: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate
    },
    status: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate
    }
  });

  const onHandleChange = useCallback((value, name) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach(x => {
      const errObj = error[x];
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        isInvalid = true;
        onValidate(true, x);
      }
    });
    return !isInvalid;
  }

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      console.error('Invalid Form!');
      return false;
    }

    console.log('Data:', form);
  }

  return (
    <div className="app">
      <div className='mb-3'><strong>Validate a radio button in React - <a href="https://www.cluemediator.com" target="_blank" rel="noreferrer noopener">Clue Mediator</a></strong></div>
      <div className='form'>
        <Radio
          name="gender"
          title="Gender"
          value={form.gender}
          options={genderList}
          onChangeFunc={onHandleChange}
          {...error.gender}
        />
        <Radio
          name="status"
          title="Status"
          isVertical={true}
          value={form.status}
          options={statusList}
          onChangeFunc={onHandleChange}
          {...error.status}
        />
        <button
          className='btn btn-primary btn-sm mt-2'
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;