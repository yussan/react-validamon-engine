import generateResult from "./generateResult";

/**
 * function to validate file
 * @param {Object} props, props from React Component
 * @param {Object} file, file object from input type file
 * @returns
 */
export default function handleFileValidator(props, file = {}) {
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
