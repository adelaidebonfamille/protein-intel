const ImageInput = (props) => {
  return (
    <>
      <p>Input Image</p>
      <input
        type="file"
        name="problem"
        onChange={props.fileChangeHandler}
        required
        accept=".jpg, .png, .jpeg"
      />
    </>
  );
};

export default ImageInput;
