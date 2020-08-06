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
    if (e.keyCode !== 13) return;
    const textArea = document.getElementById("firstCodeBlock");
    let height = textArea.getAttribute("localheight");
    textArea.style.height = `${height + 0.1}px`;
    height = parseInt(height) + 1;
    console.log(height);
    textArea.setAttribute("localheight", parseInt(height) + 1);
  };

  return (
    <div className="codeblock">
      <div className="code">
        <div className="cell-execution-container">
          <ExecuteButton execute={evaluate}></ExecuteButton>
        </div>
        <textarea
          name="codeblock"
          id={"firstCodeBlock"}
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
