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
// employee array for view model
$(function() {
    console.log("jQuery running.");

    // viewModel : knockout object with observable properties
    let viewModel = {
        teams: ko.observable[],
        employees: ko.observable[],
        projects: ko.observable[]
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
    let initializeTeams = new Promise(function(resolve, reject) {
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

    /**
     *  initializeEmployees()
     *  Populates teams viewModel.employees
     *  Returns a promise
     */
    let initializeEmployees = new Promise(function(resolve, reject) {
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
    });

    /**
     *  initializeProjects()
     *  Populates teams viewModel.projects
     *  Returns a promise
     */
    let initializeProjects = new Promise(function(resolve, reject) {
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


});