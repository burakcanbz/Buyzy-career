import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { IoMdAttach } from "react-icons/io";

const TagFiles = ({ handleFilesChange, warning, allowMultiple, name, isRequired }) => {
  const [files, setFiles] = useState([]);
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!allowMultiple) {
      setFiles(selectedFiles); 
    } else {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, i) => i !== index);
      return newFiles;
    });
  };

  useEffect(() => {
    if (files.length > 0) {
      handleFilesChange(files);
    }
  }, [files]); 

  return (
    <div>
      <Form.Group controlId="formBasicFiles" className="mt-4">
        <Form.Label id="apply-form-label">
          &nbsp;Upload Files<span style={{ color: "red" }}>&nbsp;*</span>
        </Form.Label>
        <Form.Text className="text-muted"><small>&nbsp;{warning}</small></Form.Text>
        <div className="custom-file-container">
          <input
            type="file"
            name="files"
            id="file-upload"
            multiple={allowMultiple}
            onChange={handleFileChange}
            required={isRequired}
            className="custom-file-input"
          />
          <label htmlFor="file-upload" className="custom-file-label attach" >
            {files.length > 0 ? (<>{files.length} files selected <IoMdAttach style={{fontSize: 25}}/></>): 
            <> 
            Attach {name} 
            <IoMdAttach style={{fontSize: 25}}/> 
            </>}
          </label>
        </div>
      </Form.Group>

      {files.length > 0 && (
        <div className="mt-3">
          <span className="d-block fs-6 fw-bold mb-2">
            &nbsp;Uploaded Files
          </span>
          <div className="div-tag-span">
            {files.map((file, index) => (
              <span key={index} className="tag-span">
                <IoMdClose
                  className="close-icon"
                  onClick={() => handleFileRemove(index)}
                />
                {file.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFiles;


