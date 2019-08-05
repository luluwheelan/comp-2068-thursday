import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`/api/blogs/${props.match.params.id}`)
      //   .then(result => {
      //     setInputs({
      //       title: result.data.title,
      //       content: result.data.content,
      //       status: result.data.status
      //     });
      //   })
      .then(result => setInputs(result.data))
      .catch(err => console.error(err));
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/blogs/update", {
      id: props.match.params.id,
      blog: inputs
      //   {
      //     title: inputs.title,
      //     content: inputs.content,
      //     status: inputs.status
      //   }
    })
      .then(resp => setRedirect(true))
      .catch(err => {
        console.error(err);
      });
  }

  function handleInputChange(event) {
    event.persist();
    // const name = event.target.name;
    // const value = event.target.value;
    const { name, value } = event.target;

    setInputs(inputs => {
      return {
        ...inputs,
        [name]: value //here must use ..., if just return inputs: value will not work well
      };
    });
  }

  if (redirect) {
    return <Redirect to="/blogs" />;
  }

  return (
    <div className="container">
      <header>
        <h1>Edit Blog Post</h1>
      </header>
      <div>
        <form action="/blogs" method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              required="required"
              onChange={handleInputChange}
              defaultValue={inputs.title}
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              className="form-control"
              name="content"
              onChange={handleInputChange}
              value={inputs.content}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              required="required"
              onChange={handleInputChange}
              defaultValue={inputs.status}
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

export default Edit;
