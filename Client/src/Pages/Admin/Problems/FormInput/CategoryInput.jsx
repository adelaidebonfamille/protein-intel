const CategoryInput = (props) => {
  return (
    <>
      <p>Question Category</p>

      {props.categories.map((category, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              id={`problem-type-${index}`}
              name="type"
              value={category.toLowerCase()}
              required
            />
            <label htmlFor={`problem-type-${index}`}>{category}</label>
          </div>
        );
      })}
      <br />
    </>
  );
};

export default CategoryInput;
