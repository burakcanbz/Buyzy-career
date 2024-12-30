import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

const TagLinks = ({ handleLinksChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const regex = /.*www\..*\.com.*/;
      if (regex.test(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
        setShowMessage(false);
      } else {
        setShowMessage(true);
        setInputValue("");
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleTagClick = (tag) => {
    tag.includes("https://")
      ? window.open(`${tag}`)
      : window.open(`https://${tag}`);
  };

  const handleRemove = (e, tagIndex) => {
    e.stopPropagation();
    setTags((prev) => {
      const newArr = prev.filter((_, index) => index !== tagIndex);
      return newArr;
    });
  };

  useEffect(() => {
    if(tags.length > 0){
      handleLinksChange(tags);
    }
  }, [tags])

  return (
    <div className="mb-4">
      <Form.Group controlId="formBasicCompany" className="mb-4">
        <Form.Label id="apply-form-label">&nbsp;Personal Accounts</Form.Label>
        <Form.Control
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="You can enter more than one personal account link here. (After typing the link press Enter.)"
        />
        {showMessage && (
          <Form.Text className="text-danger">
            <small>
              &nbsp;Please enter valid url with consist of www. and .com
            </small>
          </Form.Text>
        )}
      </Form.Group>

      {tags.length > 0 && (
        <>
          <span className="d-block fs-6 fw-bold mb-2">
            &nbsp;Personal Accounts Links
          </span>
          <div className="div-tag-span">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="tag-span"
                onClick={() => handleTagClick(tag)}
              >
                <IoMdClose
                  className="close-icon"
                  onClick={(e) => handleRemove(e, index)}
                />
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TagLinks;
