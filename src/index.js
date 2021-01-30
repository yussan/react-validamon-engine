// helper to handle form input validation

// global variable to save validation status
export let validator = {};

export function resetValidator() {
  validator = {};
}

/**
 * function to validate on change input form
 * @param {Object} props, object of React component
 * @param {ObjectFile} file, object file from onChange
 */
export function validate(props = {}, file = {}) {
  const {
    name,
    min,
    max,
    data = {},
    required,
    type,
    errorMessage = {},
  } = props;
  const label = props.label ? props.label.toLowerCase() : "";
  const { value } = data;

  if (required && (!value || value == 0)) {
    // validate required value
    return generateResult(
      props,
      false,
      errorMessage.required || `Pilih ${label || name} terlebih dahulu, ya!`
    );
  } else if (min && value.length < min) {
    //valdate min character
    return generateResult(
      props,
      false,
      `${label || name} kurang. Minimal ${min} karakter, ya!`
    );
  } else if (max && value.length > max) {
    //validate max character
    return generateResult(
      props,
      false,
      `${label || name} kelebihan. Maksimal ${max} karakter, ya!`
    );
  } else if (type == "number" && !parseInt(value)) {
    //validate input type number
    return generateResult(props, false, "inputan bukan angka");
  } else if (type == "link" && !value.includes("http")) {
    //validate input type link
    return generateResult(
      props,
      false,
      "harus link valid yang dilengkapi dengan, http:// atau https://"
    );
  } else if (
    type === "email" &&
    /(.+)@(.+){2,}\.(.+){2,}/.test(value) === false
  ) {
    //validate input type email
    return generateResult(
      props,
      false,
      "Masukan email dengan format yang sesuai, ya!"
    );
  } else if (type == "file") {
    //validate input type file
    return handleFileValidator(props, file);
  }

  return generateResult(props, true);
}

/**
 * function to check is a available non valid validation
 * @param {array} inputs, sample ['username', 'password']
 * @param {object} values, sample { username:  }
 */
export function validationChecker(inputs = [], values = {}) {
  let is_valid = true;
  Object.keys(inputs).map((n) => {
    if (is_valid) {
      is_valid = Boolean(inputs[n].validation && inputs[n].validation.is_valid);
    }
  });
  return is_valid;
}

function handleFileValidator(props, file = {}) {
  const { max, accept } = props;
  if (file.size > max) {
    //melebihi max size
    return generateResult(
      props,
      false,
      `Ukuran gambar yang kamu pilih lebih dari ${
        max / 1000000
      } MB. Cek kembali, ya!`
    );
  } else if (props.required && !value) {
    return generateResult(props, false, `${props.name} wajib diisi`);
  } else if (accept.includes("*.") && file.name) {
    // validate based on specific accepted extension
    // check upload extensions
    const fileNameArr = file.name.split(".");
    const fileExtension = fileNameArr[fileNameArr.length - 1];
    const acceptExtension = props.accept.replace(".*", "");

    if (!acceptExtension.includes(fileExtension)) {
      // file not accepted
      return generateResult(
        props,
        false,
        `File bukan ${acceptExtension}, silahkan coba yang lain`
      );
    }
  }
  return generateResult(props, true);
}

function generateResult(props, is_valid = true, message = "") {
  const { name } = props;
  const result = {
    is_valid,
    message,
  };
  validator[name + "_validate"] = result;
  return result;
}
