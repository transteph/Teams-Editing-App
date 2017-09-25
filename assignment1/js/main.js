/*********************************************************************************
 * WEB422 – Assignment 2
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
$(function() {
    console.log("jQuery running.");

    let employeesModel;

    let rowTemplate = _.template('<% _.forEach(employees, function(employee) { %>' +
    '<div class="row body-row" data-id="<%- employee._id %>">' +
    '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
    '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
    '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
    '</div>' +
    '<% }); %>');

    initializeEmployeesModel();
    $('#employee-search').keyup(function() {
        let search = $(this).val();
        let filter = getFilteredEmployeesModel(search);
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
            .done(function(data) {
                employeesModel = data;
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
    function refreshEmployeeRows(employees) {
        let rows = rowTemplate({'employees' : employees});
        $('#employees-table').empty();
        $('#employees-table').append(rows);
    };

    /**
     *  getFilteredEmployeesModel(filterString) 
     *  Returns filtered employeesModel array
     */
    function getFilteredEmployeesModel(filterString) {

       // filterString = filterString.toString().toLowerCase();

        let matches = _.filter(employeesModel, function(employee) {
            if (employee.FirstName.indexOf(filterString) > -1 ||
                employee.LastName.indexOf(filterString) > -1 ||
                employee.Position.PositionName.indexOf(filterString) > -1 ) {
                    return true;
                }
            else {
                return false;
            }

        });
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