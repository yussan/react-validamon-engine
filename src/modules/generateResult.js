// global variable to save validation status
let validator = {};

// function to reset validator
function resetValidator() {
  validator = {};
}

/**
 * function to generate result for component
 * @param {Object} props , props from React component
 * @param {Boolean} is_valid , is value valid or not
 * @param {String} message , message show for user
 * @return {Object}
 */
const generateResult = (props, is_valid = true, message = "") => {
  const { name } = props;
  const result = {
    is_valid,
    message,
  };
  validator[name + "_validate"] = result;
  return result;
};

export default generateResult;
