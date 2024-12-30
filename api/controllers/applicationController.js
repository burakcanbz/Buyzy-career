const asyncHandler = require('express-async-handler');
const path = require('path');
const { fileReader, addApplication, updateHire, filterApplications, getFiles } = require('../helpers/utils');

exports.getApplications = asyncHandler( async(req, res) => {
    const { id } = req.query;
    const { users } = await fileReader("users");
    const { applications } = await fileReader("applications");
    const user = users.find(user => user._id === id);
    const filteredApplications = filterApplications(applications, user?.division)
    
    return res.status(200).json({applications: filteredApplications });
})

exports.getApplicationByQuery = asyncHandler( async(req, res) => {
    const { filter, name } = req.query;
    const data = await fileReader("applications");
    const allApplications = data.applications;

    if(filter === "id"){
        const applications = allApplications.filter(item => item.position[filter] === Number(name));
        return res.status(200).json({ applications })
    }

    const applications = allApplications.filter(item => item.position[filter] === name);
    return res.status(200).json({applications});
})

exports.getApplicationDetails = asyncHandler( async(req, res) => {
    
    const { id } = req.params;
    const data = await fileReader("applications");
    const allApplications = data.applications;
    const applicationDetail = allApplications.find(item => item.id === Number(id))
    if(!applicationDetail){
        res.status(500);
        throw new Error("There is no application with that id")
    }
    return res.status(200).json({applicationDetail})
})

exports.addApplicationForm = asyncHandler(async (req, res) => {
    const { name, email, phone, location, company, message, hireStatus } = req.body;
    const position = JSON.parse(req.body.position);
    const files = JSON.parse(req.body.files);
    const links = JSON.parse(req.body.links);
    const applicationFormData = { name, email, phone, location, company, message, hireStatus, files, links }
    const positionId = position.id;
    applicationFormData["position"] = position;
    const data = await fileReader("applications");
    if (data.applications && data.applications.length > 0) {
      const applications = data.applications;
      const samePosApps = applications.filter(
        (item) => item.position.id === positionId
      );
      if (samePosApps.length > 0) {
        const sameUser = samePosApps.find(
          (item) => item.email === applicationFormData.email
        );
        if (sameUser) {
          res.status(400);
          throw new Error("Application already exists for this position.");
        }
      }
    }
    await addApplication("applications", applicationFormData);
    return res.status(200).json({
      error: false,
      message: "Application saved successfully",
      applicationFormData,
    });
  });
  
  exports.updateHireStatus = asyncHandler( async(req, res) => {
    const { message, id } = req.body;
    const { applications } = await fileReader("applications");
    const app = applications.find(item => item.id === Number(id));
    if (app) {
      await updateHire("applications", app, message); 
    } else {
      res.status(404);
      throw new Error("Application not found");
    }
    return res.json({error: false,
      message: "Hire status updated successfully",
      app
    })
  })