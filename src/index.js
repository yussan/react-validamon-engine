import generateResult from "./modules/generateResult";
import extraRulesValidation from "./modules/extraRulesValidation";
import handleFileValidator from "./modules/fileValidation";

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
    label,
  } = props;
  const { value } = data;

  if (required && (!value || value == 0)) {
    // validate required value
    return generateResult(
      props,
      false,
      // errorMessage.required || `Format ${label || name} Salah, Cek Kembali Ya!`
      `${label || name} Wajib Diisi`
    );
  } else if (min && value.length < min) {
    //valdate min character
    return generateResult(
      props,
      false,
      `Karakter Kurang. Minimal ${min} Karakter Ya!`
    );
  } else if (max && value && value.length > max) {
    //validate max character
    return generateResult(
      props,
      false,
      `Karakter Kelebihan. Maksimal ${max} Karakter Ya!`
    );
  } else if (type == "number" && !parseInt(value)) {
    //validate input type number
    return generateResult(props, false, "inputan bukan angka");
  } else if (type == "file") {
    //validate input type file
    return handleFileValidator(props, file);
  } else if (props.extraRules && props.extraRules.length > 0) {
    // added extra rules
    return extraRulesValidation(props);
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
      is_valid = Boolean(
        typeof inputs[n].validation !== "undefined" &&
          inputs[n].validation.is_valid
      );
    }
  });
  return is_valid;
}
