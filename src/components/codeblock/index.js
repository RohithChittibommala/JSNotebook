import React, { useState } from "react";
import ExecuteButton from "../executebutton";
import "./codeblock.scss";
import Buttonp from "../buttons/optionsButton.jsx";

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
    const num = parseInt(height);
    textArea.style.height = `${num + 20}px`;
    textArea.setAttribute("localheight", num + 10);
  }
  function handleBackSpaceKeyDown(e) {
    const textArea = e.target;
    let height = textArea.getAttribute("localheight");
    const num = parseInt(height);
    textArea.style.height = `${num - 10}px`;
    textArea.setAttribute("localheight", num - 10);
  }
  const evaluate = async function () {
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
          localheight={20}
          role="textarea"
          contentEditable={true}
          suppressContentEditableWarning={true}
        ></textarea>
        <Buttonp></Buttonp>
      </div>
      <div className="output">
        <div className="output-info"></div>
        {block.output && <p className="codeblock__output">{block.output}</p>}
      </div>
    </div>
  );
};

export default CodeBlock;
