# react-validamon-engine

Engine of React Validamon, a react validator library

NPM : https://www.npmjs.com/package/react-validamon-engine

## Documentations

### How To Install

```sh
npm install --save react-validamon-engine
```

### Validate on Change Value

**How to Use**

```jsx
import { validate } from "react-validamon-engine"

const result = validate(props)

const onChange = e => {
    e.preventDefault()
    const { value } = e.target
    const nextProps = {...props, {data: { value }}}
    const validationResult = validate(nextProps)

    //use whatever do you want
}

const InputComponent = () => {
    return (
        <Input
            label="Nama Lengkap"
            placeholder="Cth: Linka Jadid"
            name="Nama lengkap"
            data={fullname}
            max={255}
            required
            onChange={(e) => onChange(e)}
        />
    )
}
```

**Requirement Props**

- data :
  - type: Object
  - value : {value: "", validation: {}}
- type :
  - type: String
  - value: one of text, pasword, number, link, file

### Check Validation of All Input

```jsx
import { useEffect, useState } from "react";
import { validationChecker } from "react-validamon-engine";

const SubmitComponent = () => {
  const [disableSubmit, setDisableSubmit] = useState(true);

  // listen fullname change value, and check all validation
  useEffect(() => {
    clearTimeout(checkValidation);

    checkValidation = setTimeout(() => {
      const inputs = {
        fullname,
      };

      const formValidate = !validationChecker(inputs);

      setDisableSubmit(formValidate);
    }, 500);
  }, [fullname]);

  // submit click handler
  const submitHandler = (e) => {
    e.preventDefault();
    // do submit
  };

  return (
    <Button disabled={disableSubmit} onClick={handleSubmit}>
      Send Data
    </Button>
  );
};
```

## Contributtors

- [yussan](https://github.com/yussan)
