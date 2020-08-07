import React, { useState } from "react";
import ExecuteButton from "../executebutton";
import "./codeblock.scss";

const CodeBlock = () => {
  const [block, setBlock] = useState({ code: "", output: "" });
  const handleCodeChange = (event) => {
    const { value } = event.target;
    setBlock({ ...block, code: value });
  };

  const showOutput = (output) => {
    setBlock({ ...block, output: output });
  };
  function handleEnterKeyDown(e) {
    const textArea = e.target;
    let height = textArea.getAttribute("localheight");
    textArea.style.height = `${height + 0.2}px`;
    height = parseInt(height);
    console.log(height);
    textArea.setAttribute("localheight", parseInt(height) + 1);
  }
  function handleBackSpaceKeyDown(e) {
    const textArea = e.target;
    let height = textArea.getAttribute("localheight");
    const num = parseInt(height);
    if (num < 0) return;
    console.log(num);
    textArea.style.height = `${height - 0.1}px`;
    textArea.setAttribute("localheight", parseInt(height) - 1);
  }
  const evaluate = async function () {
    // const response = await fetch("http://localhost:3000/run", {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     code: block.code,
    //     data: "string",
    //   }),
    // });

    // let data = await response.json();
    // showOutput(data.data);

    try {
      console.log = function (value) {
        return value;
      };
      let output = eval(block.code);
      showOutput(output);
    } catch (err) {
      showOutput(String(err));
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleEnterKeyDown(e);
    else if (e.keyCode === 8) handleBackSpaceKeyDown(e);

    // e.keyCode === 8 && console.log("Backspace is pressed");
  };

  return (
    <div className="codeblock">
      <div className="code">
        <div className="cell-execution-container">
          <ExecuteButton execute={evaluate}></ExecuteButton>
        </div>
        <textarea
          name="codeblock"
          value={block.code}
          onKeyDown={(e) => handleKeyDown(e)}
          className="codeblock__code language-js"
          onChange={handleCodeChange}
          localheight={2}
          role="textarea"
          contentEditable={true}
          suppressContentEditableWarning={true}
        ></textarea>
      </div>
      <div className="output">
        <div className="output-info"></div>
        {block.output && <p className="codeblock__output">{block.output}</p>}
      </div>
    </div>
  );
};

export default CodeBlock;
