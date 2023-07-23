import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <p>
        Page your are looking is not yet developed or been removed or your
        beinging naughty..
      </p>
      <button onClick={() => navigate("/login")}>
        click me i will take you landing page
      </button>
    </div>
  );
}
