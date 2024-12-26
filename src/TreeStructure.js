import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const TreeStructure = ({ data }) => {
  const [propData, setPropData] = useState(data);
  const [expanded, setExpanded] = useState({});
  const [popupConfig, setPopupConfig] = useState(null);

  useEffect(() => {
    setPropData(data);
  }, [data]);

  const handleExpandCollapse = (val) => {
    setExpanded((prevState) => {
      console.log(prevState)
      const updatedState = { ...prevState, [val]: !prevState[val] };
      return updatedState;
    });
  };

  const openPopup = (action, value) => {
    let title = "",
      message = "";
    switch (action) {
      case "edit":
        title = "Edit File Name";
        message = `Enter a new name for "${value}":`;
        break;
      case "delete":
        title = "Delete Confirmation";
        message = `Are you sure you want to delete "${value}"?`;
        break;
      case "create_file":
        title = "Create a file";
        message = `Enter a file name to add in folder "${value}"`;
        break;
      case "create_folder":
        title = "Create a folder";
        message = `Enter a folder name to add inside folder "${value}"`;
        break;
      default:
        title = "";
        message = "";
        break;
    }
    setPopupConfig({
      title: title,
      message: message,
      showInput:
        action === "edit" ||
        action === "create_file" ||
        action === "create_folder",
      defaultValue: action === "edit" ? value : "",
      onConfirm: (inputValue) => handleAction(action, value, inputValue),
      onCancel: () => setPopupConfig(null),
    });
  };
  const handleAction = (action, value, inputValue) => {
    if (action === "edit") {
      setPropData((prevData) => updateFileName(prevData, value, inputValue));
    } else if (action === "delete") {
      setPropData((prevData) => deleteFiles(prevData, value));
    } else if (action === "create_file") {
      setPropData((prevData) => createFile(prevData, value, inputValue));
    } else if (action === "create_folder") {
      setPropData((prevData) => createFolder(prevData, value, inputValue));
    }
    setPopupConfig(null);
  };

  const createFile = (data, folderName, fileName) => {
    for (const [key, value] of Object.entries(data)) {
      if (key === folderName) {
        if (!data[key].includes(fileName)) {
          data[key].push(fileName);
        } else {
          alert("Same file exists already");
        }
      }
    }
    return data;
    //}
  };

  const createFolder = (data, parentFolder, folderName) => {
    /* if (Array.isArray(data)) {
      console.log(data, "in array");
      return data.map((item) => createFolder(item, parentFolder, folderName));
    } */
    //if (typeof data === "object") {
      for (const [key, value] of Object.entries(data)) {
        if (key === parentFolder) {
          console.log(key, "key name");
          if (key !== folderName) {
            data[folderName] = [];
          } else {
            alert("Same folder exists already");
          }
        }
      }
    //}
    return data;
  };
  const deleteFiles = (data, fileNameToDelete) => {
    console.log(JSON.stringify(data), typeof data);
    if (typeof data === "string" && data === fileNameToDelete) {
      return "";
    }
    if (typeof data === "object") {
      const updatedData = {};
      for (const [key, value] of Object.entries(data)) {
        if (key !== fileNameToDelete) {
          updatedData[key] = value;
        }
      }
      return updatedData;
    }
  };

  const updateFileName = (data, oldName, newName) => {
    if (data === oldName) return newName;
    if (typeof data === "object") {
      const updatedData = {};
      for (const [key, value] of Object.entries(data)) {
        const newKey = key === oldName ? newName : key;
        updatedData[newKey] = updateFileName(value, oldName, newName);
      }
      return updatedData;
    }

    return data;
  };

  const renderTree = () => {
    if (Array.isArray(propData)) {
      return (
        <ul className="folders_array_ul">
          {propData.map((item, index) => (
            <li key={index} className="folders_array_li">
              <TreeStructure data={item} />
            </li>
          ))}
        </ul>
      );
    }

    if (typeof propData === "object") {
      return (
        <ul className="folders_obj_ul">
          {Object.entries(propData).map(([key, value], index) => (
            <li
              key={index}
              className={`folders_obj_li ${expanded[key] ? "" : "active"}`}
            >
              <span className="folder_name">
                <strong>{key}</strong>
                <div className="action_btns">
                  <span
                    className="create_folder_icon"
                    onClick={() => openPopup("create_folder", key)}
                  ></span>
                  <span
                    className="create_file_icon"
                    onClick={() => openPopup("create_file", key)}
                  ></span>
                  <span
                    className="edit_icon"
                    onClick={() => openPopup("edit", key)}
                  ></span>
                  <span
                    className="delete_icon"
                    onClick={() => openPopup("delete", key)}
                  ></span>
                  <span
                    className="accordion_icon"
                    title={`${expanded[key] ? "Expand" : "Collapse"}`}
                    onClick={() => handleExpandCollapse(key)}
                  ></span>
                </div>
              </span>

              <TreeStructure data={value} />
            </li>
          ))}
        </ul>
      );
    }

    return (
      <>
        {propData && (
          <>
            <span className="leaf_nodes">
              {propData}
              <div className="action_btns">
                <span
                  className="edit_icon"
                  onClick={() => openPopup("edit", propData)}
                ></span>
                <span
                  className="delete_icon"
                  onClick={() => openPopup("delete", propData)}
                ></span>
              </div>
            </span>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {renderTree()}
      {popupConfig && <Popup {...popupConfig} />}
    </>
  );
};

export default TreeStructure;
