/*********************************************************************************
 * WEB422 – Assignment 3
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Stephanie Tran Student ID: 134 233 162 Date: October 6 2017
 * Heroku link: https://glacial-cove-51366.herokuapp.com/
 *
 *
 ********************************************************************************/
// viewModel : knockout object with observable properties
let viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
};

/**
 *  showGenericModal(title,message)
 *  Sets content for genericModal
 */
function showGenericModal(title, message) {
    $('.modal-title').empty();
    $('.modal-body').empty();

    $('.modal-title').append(title);
    $('.modal-body').append(message);
    // show the modal programmatically
    $('#genericModal').modal();
}

/**
 *  initializeTeams()
 *  Populates teams viewModel.teams
 *  Returns a promise
 */
function initializeTeams() {
    return new Promise((resolve, reject) => {
        $.ajax({
                url: "https://glacial-cove-51366.herokuapp.com/teams-raw",
                type: "GET",
                contentType: "application/json"
            })
            .done(function(data) {
                viewModel.teams = ko.mapping.toJS(data);
                resolve();
            })
            .fail(function(err) {
                reject("Error loading the team data.");
            });
    });
};

/**
 *  initializeEmployees()
 *  Populates teams viewModel.employees
 *  Returns a promise
 */
function initializeEmployees() {
    return new Promise((resolve, reject) => {
        $.ajax({
                url: "https://glacial-cove-51366.herokuapp.com/employees",
                type: "GET",
                contentType: "application/json"
            })
            .done(function(data) {
                viewModel.employees = ko.mapping.toJS(data);
                resolve();
            })
            .fail(function(err) {
                reject("Error loading the employee data.");
            });
    })
};

/**
 *  initializeProjects()
 *  Populates teams viewModel.projects
 *  Returns a promise
 */
function initializeProjects() {
    return new Promise((resolve, reject) => {
        $.ajax({
                url: "https://glacial-cove-51366.herokuapp.com/projects",
                type: "GET",
                contentType: "application/json"
            })
            .done(function(data) {
                viewModel.projects = ko.mapping.toJS(data);
                resolve();
            })
            .fail(function(err) {
                reject("Error loading the project data.");
            });
    });
}
/**
 *  saveTeam()
 *  Sends updated data through API
 *  Returns a promise
 */
function saveTeam() {
    let currentTeam = ko.mapping.toJS(this);
    $.ajax({
            url: "https://glacial-cove-51366.herokuapp.com/team/" + currentTeam._id,
            type: "PUT",
            data: JSON.stringify({
                "Projects": currentTeam.Projects,
                "Employees": currentTeam.Employees,
                "TeamLead": currentTeam.TeamLead
            }),
            contentType: "application/json"
        })
        .done(function(data) {
            showGenericModal('Success', currentTeam.TeamName + " Updated Successfully");
        })
        .fail(function(err) {
            showGenericModal('Error', 'Error updating the team information.');
        });
};

// DOM ready function
$(function() {
    console.log("jQuery running.");
    initializeTeams()
        .then(initializeEmployees)
        .then(initializeProjects)
        .then(() => {
            $(".loader").fadeOut(2000);
            $('main').delay(2000).fadeIn(1000);
            ko.applyBindings(viewModel);
            $('select.multiple').multipleSelect({ filter: true });
            $('select.multiple').multipleSelect({ single: true, filter: true });

        })
        .catch((err) => {
            // display error in modal 
            showGenericModal('Error', err);
        })

});