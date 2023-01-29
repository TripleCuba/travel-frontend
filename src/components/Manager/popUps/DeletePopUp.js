import React from "react";
import { delete_call } from "../../../utils/managerApiCalls";

const DeletePopUp = ({ trigger, obj, setTrigger, setMessage }) => {
  const deleteObj = async () => {
    const token = localStorage.getItem("token");
    let resp = await delete_call(token, obj.id, obj.category);
    if (resp.is_success) {
      setTrigger(false);
      setMessage(resp.message);
    }
    console.log(resp);
  };
  return (
    trigger && (
      <div className="managerPopUp">
        <h1>
          You really want to delete this {`${obj.category}(${obj.title})`}?
        </h1>
        <div className="buttons">
          <button
            onClick={() => {
              deleteObj();
            }}
          >
            Yes
          </button>
          <button onClick={() => setTrigger(false)}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default DeletePopUp;
