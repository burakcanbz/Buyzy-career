const path = require("path");
const fs = require("fs/promises");

const filePath = path.join(__dirname, "../data/");

const fileReader = async (fileName) => {
  try {
    const data = await fs.readFile(
      path.join(filePath, `${fileName}.json`),
      "utf-8"
    );
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    throw err;
  }
};

const addPosition = async (fileName, position) => {
  try {
    const data = await fs.readFile(
      path.join(filePath, `${fileName}.json`),
      "utf-8"
    );
    const jsonData = JSON.parse(data);
    if (!jsonData.openPositions) {
      jsonData.openPositions = [];
    }
    const maxId = jsonData.openPositions.reduce(
      (max, app) => Math.max(max, app.id),
      0
    );
    const newId = maxId + 1;
    const newPosition = {
      id: newId,
      ...position,
    };
    jsonData.openPositions.push(newPosition);
    await fs.writeFile(
      path.join(filePath, `${fileName}.json`),
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
    console.log("position added successfully!");
  } catch (error) {
    console.error("Error updating file:", error);
  }
};

const addApplication = async (fileName, application) => {
  try {
    const data = await fs.readFile(
      path.join(filePath, `${fileName}.json`),
      "utf-8"
    );
    const jsonData = JSON.parse(data);
    if (!jsonData.applications) {
      jsonData.applications = [];
    }
    const maxId = jsonData.applications.reduce(
      (max, app) => Math.max(max, app.id),
      0
    );
    const newId = maxId + 1;
    application.id = newId;
    jsonData.applications.push(application);
    await fs.writeFile(
      path.join(filePath, `${fileName}.json`),
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
    console.log("Application added successfully!");
  } catch (error) {
    console.error("Error updating file:", error);
  }
};

const addFeedback = async (fileName, feedback) => {
  try {
    const data = await fs.readFile(
      path.join(filePath, `${fileName}.json`),
      "utf-8"
    );
    const jsonData = JSON.parse(data);
    if (!jsonData.feedbacks) {
      jsonData.feedbacks = [];
    }
    const maxId = jsonData.feedbacks.reduce(
      (max, app) => Math.max(max, app.id),
      0
    );
    const newId = maxId + 1;
    feedback.id = newId;
    jsonData.feedbacks.push(feedback);
    await fs.writeFile(
      path.join(filePath, `${fileName}.json`),
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
    console.log("feedback added successfully!");
  } catch (error) {
    console.error("Error updating file:", error);
  }
};

const filterApplications = (applications, divisions) => {
  try {
    if (divisions === "All Divisions") {
      return applications;
    } else {
      const filteredApps = [];
      const _ = applications.filter((item) => {
        if (divisions.includes(item.position.division)) {
          filteredApps.push(item);
          return true;
        }
        return false;
      });
      return filteredApps;
    }
  } catch (err) {
    console.log(err);
  }
};

const updateHire = async (fileName, application, message) => {
  try {
    const data = await fs.readFile(
      path.join(filePath, `${fileName}.json`),
      "utf-8"
    );
    const jsonData = JSON.parse(data);
    const appIndex = jsonData.applications.findIndex(
      (item) => item.id === application.id
    );
    if (appIndex !== -1) {
      jsonData.applications[appIndex].hireStatus = message;
      await fs.writeFile(
        path.join(filePath, `${fileName}.json`),
        JSON.stringify(jsonData, null, 2),
        "utf-8"
      );
      console.log("Hire status updated successfully!");
    } else {
      console.log("Application not found!");
    }
  } catch (error) {
    console.error("Error updating hire status:", error);
  }
};

const updatePosition = async (id, fileName, updatedPosition) => {
  try {
    const data = await fs.readFile(
      path.join(filePath, `${fileName}.json`),
      "utf-8"
    );
    const jsonData = JSON.parse(data);
    const positions = jsonData.openPositions;

    const positionIndex = positions.findIndex((position) => position.id === id);
    if (positionIndex === -1) {
      throw new Error("Position not found");
    }
    positions[positionIndex] = {
      ...positions[positionIndex],
      ...updatedPosition,
    };
    await fs.writeFile(
      path.join(filePath, `${fileName}.json`),
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
    console.log("position updated successfully!");
  } catch (error) {
    console.error("Error updating position:", error);
  }
};

const deletePosition = async (fileName, id) => {
  try {
    const data = await fs.readFile(
      path.join(filePath, `${fileName}.json`),
      "utf-8"
    );
    const jsonData = JSON.parse(data);
    const positions = jsonData.openPositions;
    const positionIndex = positions.findIndex(
      (position) => position.id === Number(id)
    );
    console.log(positionIndex);
    if (positionIndex === -1) {
      throw new Error("Position not found");
    }
    positions.splice(positionIndex, 1);
    await fs.writeFile(
      path.join(filePath, `${fileName}.json`),
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
    console.log("position updated successfully!");
  } catch (error) {
    console.error("Error updating position:", error);
  }
};

const updateApplications = async (fileName, updatedPosition, id) => {
  try {
    const jsonData = await fileReader("applications");

    if (!jsonData?.applications) {
      throw new Error("Applications data is missing or invalid.");
    }

    const apps = jsonData.applications;
    const filteredApps = apps.filter((item) => item.position.id === Number(id));

    if (filteredApps.length === 0) {
      throw new Error("No matching applications found to update.");
    }
    const updatedApps = filteredApps.map((item) => ({
      ...item,
      position: updatedPosition,
    }));
    apps.forEach((app, index) => {
      const updatedItem = updatedApps.find((updated) => updated.id === app.id);
      if (updatedItem) {
        apps[index] = updatedItem;
      }
    });
    const filePathToWrite = path.join(filePath, `${fileName}.json`);
    await fs.writeFile(
      filePathToWrite,
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
    console.log("Applications successfully updated.");
    return { success: true, message: "Applications successfully updated." };

  } catch (error) {
    console.error("Error updating applications:", error.message || error);
    return { success: true, message: "Applications successfully updated." };

  }
};

module.exports = {
  fileReader,
  addApplication,
  addFeedback,
  filterApplications,
  updateHire,
  addPosition,
  updatePosition,
  deletePosition,
  updateApplications,
};
