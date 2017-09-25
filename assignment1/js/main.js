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

    /**
     *  Wiring up events
     */
    initializeEmployeesModel();
    
    // Set keyup event
    $('#employee-search').keyup(function() {
        let search = $(this).val();
        let filter = getFilteredEmployeesModel(search);
        refreshEmployeeRows(filter);
    });

    // wiring click events
    $('.bootstrap-header-table').on('click', '.body-row', function(){
        console.log("body row clicked. data-id: " + $(this).attr("data-id") );
        employeeFound = getEmployeeModelById( $(this).attr("data-id") );

        employeeFound[0].HireDate = moment(employeeFound.HireDate).format("LL");
        console.log("employeeFound: " + JSON.stringify(employeeFound[0]));
        let modalTemplate = _.template(
            '<strong>Address:</strong> <%- employee.AddressStreet %>, <%- employee.AddressCity %>, <%- employee.AddressState %> <%- employee.AddressZip %><br>' +
            '<strong>Phone Number:</strong> <%-employee.PhoneNum %><br>' + 
            '<strong>Hire Date:</strong> <%- employee.HireDate %>'
        );
        let modalDisplay = modalTemplate({'employee' : employeeFound[0] });
        let title = employeeFound[0].FirstName + " " + employeeFound[0].LastName ; 
        showGenericModal(title, modalDisplay);
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
        console.log("showGenericModal. title: " + title);
        $('.modal-title').append(title);
        $('.modal-body').append(message);
        // show the modal programmatically
        $('#genericModal').modal();
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
       filterString = filterString.toLowerCase().replace(/\s/gi,'');
       console.log("Search string: " + filterString);

        let matches = _.filter(employeesModel, function(employee) {
            firstName = employee.FirstName.toLowerCase().replace(/\s/g,'');
            lastName = employee.LastName.toLowerCase().replace(/\s/g,'');
            position = employee.Position.PositionName.toLowerCase().replace(/\s/g,'');

            if (firstName.indexOf(filterString) > -1 ||
                lastName.indexOf(filterString) > -1 ||
                position.indexOf(filterString) > -1 ) {
                    console.log("Match: " + lastName);
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
        let employeeFound = _.filter(employeesModel, function(employee) {
            return employee._id == id;
        });

        if (employeeFound[0] != null){
            return _.cloneDeep(employeeFound);
        }
        else {
            return 0;
        }

    }

});