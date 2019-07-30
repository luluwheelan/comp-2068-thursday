import React, { useState } from "react"; //usestate is hook module used for functional component
import { Redirect } from "react-router-dom";
import Axios from "axios";

function New() {
  const [inputs, setInputs] = useState({}); //{} is the start default inputs value,here is empty
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/blogs", {
      blog: {
        title: inputs.title,
        content: inputs.content,
        status: inputs.status
      }
    })
    .then(resp => setRedirect(true))
    .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    event.persist();
    // const name = event.target.name;
    // const value = event.target.value;

    //this line of code works the same as top two lines
    const { name, value } = event.target;

    setInputs(inputs => {
        inputs[name] = value;
        return inputs;
    });
    console.log(inputs);
  }

  if (redirect) return <Redirect to="/blogs" />;
  return (
    <div className="container">
      <header>
        <h1>New Blog Post</h1>
      </header>
      <div>
        <form action="/api/blogs" method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              required="requires"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <input
              className="form-control"
              name="content"
              required="requires"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              required="requires"
              onChange={handleInputChange}
            >
              <option value="DRAFT">draft</option>
              <option value="PUBLISHED">published</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;
