const AudioInput = (props) => {
  return (
    <>
      <p>Input Audio</p>
      <input
        type="file"
        name="problem"
        onChange={props.fileChangeHandler}
        required
        accept=".mp3"
      />
    </>
  );
};

export default AudioInput;
