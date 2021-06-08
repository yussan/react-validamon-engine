import generateResult from "./generateResult";

/**
 * function to validate based on rules
 * @params {Object} props , props object ffrom react component
 */
const ruleValidation = (props) => {
  const { data, extraRules, label, name } = props;
  const { value } = data;

  // NIK validation: Indonesian identify number validation
  if (extraRules.includes("nik") && value && value.length !== 16) {
    return generateResult(props, false, "Format NIK Salah, Cek Kembali Ya!");
  }

  // Email validation
  if (
    extraRules.includes("email") &&
    /(.+)@(.+){2,}\.(.+){2,}/.test(value) === false
  ) {
    return generateResult(
      props,
      false,
      `Format ${label || name} Salah, Cek Kembali Ya!`
    );
  }

  // Link validation, must have "http" string
  if (extraRules.includes("link") && value && !value.includes("http")) {
    return generateResult(
      props,
      false,
      "Harus Link Valid dan Dilengkapi dengan http:// atau https://"
    );
  }

  // phone number validation, without prefix, prefix is +62, +1, etc
  if (
    extraRules.includes("phone_number_no_preffx") &&
    value &&
    (value.length < 10 || value.length > 13 || value[0] == 0)
  ) {
    return generateResult(
      props,
      false,
      `Format ${label || name} Salah, Cek Kembali Ya!`
    );
  }

  // alphanumeric validation
  if (
    extraRules.includes("alphanumeric") &&
    value &&
    value.match(/[-!#@$%^&*()_+|~=`{}/\\[\]:";'<>?,.\/\s\t\n]/)
  ) {
    return generateResult(
      props,
      false,
      `Format ${label || name} Wajib Alphanumeric dan Tanpa Spasi`
    );
  }

  // password validation
  // minimum 8 getLineAndCharacterOfPosition, must be ada huruf, angka, min 1 capital, min 1 simbol
  // ref:https://tcashsquad.atlassian.net/browse/MS-54
  if (
    extraRules.includes("password") &&
    (!value.match(/[A-Z]/) ||
      !value.match(/[a-z]/) ||
      !value.match(/[0-9]/) ||
      !value.match(/[-!#@$%^&*()_+|~=`{}/\\[\]:";'<>?,.\/]/) ||
      value.match(/[\s\t\n]/))
  ) {
    return generateResult(
      props,
      false,
      `Format ${
        label || name
      } Wajib Kombinasi Alphanumeric, Symbol, Huruf Kapital dan Tanpa Spasi`
    );
  }

  // 100% valid
  return generateResult(props, true);
};

export default ruleValidation;
