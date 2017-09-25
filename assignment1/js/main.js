/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Stephanie Tran Student ID: 134 233 162 Date: September 24 2017
 * Heroku link: https://glacial-cove-51366.herokuapp.com/
 *
 *
 ********************************************************************************/
// employee array for view model
let employeesModel = [];
$(function() {
    console.log("jQuery running.");
    initializeEmployeesModel();
    $('#employee-search').keyup(function() {
        let search = $(this).val();
        console.log('Search running.');
        let filter = getFilteredEmployeesModel(search);
        console.log("Filter: " + JSON.stringify(filter));
        refreshEmployeeRows(filter);
    });


    /**
     *   initializeEmployeesModel() 
     *   populates employeesModel array
     */
    function initializeEmployeesModel() {
        $.ajax({
                url: "https://glacial-cove-51366.herokuapp.com/employees",
                type: "GET",
                contentType: "application/json"
            })
            .done(function(employees) {

                employeesModel = employees;
                console.log("Running");
                refreshEmployeeRows(employeesModel);
            })
            .fail(function(err) {
                showGenericModal("Error", "Unable to get Employees");
                console.log("error: " + err.statusText);
            });

    }

    /**
     *  showGenericModal(title,message)
     *  Sets content for genericModal
     */
    function showGenericModal(title, message) {
        $('.modal-title').append(title);
        $('.modal-body').append(title);
        // show the modal programmatically
        $('#genericModal').modal({
            keyboard: true
        });
    }

    /**
     *  refreshEmployeeRows(employees) 
     *  Sets content for genericModal
     */
    function refreshEmployeeRows(employeesModel) {
        let rowTemplate = _.template('<% _.forEach(employeesModel, function(employee) { %>' +
            '<div class="row body-row" data-id="<%- employee._id %>">' +
            '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
            '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
            '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
            '</div>' +
            '<% }); %>');
        $('#employees-table').empty();
        $('#employees-table').append(rowTemplate);
    };

    /**
     *  getFilteredEmployeesModel(filterString) 
     *  Returns filtered employeesModel array
     */
    function getFilteredEmployeesModel(filterString) {
        filterString = filterString.toString().toLowerCase();
        // create case-insensitive, global regex out of filterString

        matches = [];

        // search first names
        matches += _.filter(employeesModel, (function(employee) {
            return employee.FirstName.toLowerCase().indexOf(filterString) > -1;
        }));

        // search last names
        matches += _.filter(employeesModel, (function(employee) {
            return employee.LastName.toLowerCase().indexOf(filterString) > -1;
        }));

        // search positions
        matches += _.filter(employeesModel, (function(employee) {
            return employee.Position.PositionName.toLowerCase().indexOf(filterString) > -1;
        }));
        console.log("Matches: " + JSON.stringify(matches));
        return matches;
    }

    /**
     *  getEmployeeModelById(id) 
     *  Searches employeesModel array.
     *  Returns deep copy of employee obj or null
     */
    function getEmployeeModelById(id) {
        _.filter(employeesModel, (function(employee) {
            return (employee._id == id);
        }));
    }


});