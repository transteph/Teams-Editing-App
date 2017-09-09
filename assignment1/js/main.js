/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Stephanie Tran Student ID: 134 233 162 Date: September 15 2017
* Heroku link: https://git.heroku.com/glacial-cove-51366.git
*
*
********************************************************************************/ 

$(function() {
    console.log("jQuery running.");

    /* 
     *   When #teams-menu is clicked:
     *   default action is prevented;
     *   AJAX GET request made to TEAMS API
     */
    $( "#teams-menu" ).on( "click", function( event ) {
        event.preventDefault;
        $.ajax({
            url: "http://localhost:8081/teams", 
            type: "GET",
            contentType: "application/json"
        })
        .done(function (teams) {
            $("#data").empty()
                .append("<h3>Teams</h3>")
                .append(JSON.stringify(teams));

        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });

    /* 
     *   When #employees-menu is clicked:
     *   default action is prevented;
     *   AJAX GET request for employees
     */
    $( "#employees-menu" ).on( "click", function( event ) {
        event.preventDefault;
        $.ajax({
            url: "http://localhost:8081/employees", 
            type: "GET",
            contentType: "application/json"
        })
        .done(function (employees) {
            $("#data").empty()
                .append("<h3>Employees</h3>")
                .append(JSON.stringify(employees));

        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });

    /* 
     *   When #projects-menu is clicked:
     *   default action is prevented;
     *   AJAX GET request for projects
     */
    $( "#projects-menu" ).on( "click", function( event ) {
        event.preventDefault;
        $.ajax({
            url: "http://localhost:8081/projects", 
            type: "GET",
            contentType: "application/json"
        })
        .done(function (projects) {
            $("#data").empty()
                .append("<h3>Projects</h3>")
                .append(JSON.stringify(projects));

        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });

    /* 
     *   When #positions-menu is clicked:
     *   default action is prevented;
     *   AJAX GET request for positions
     */
    $( "#positions-menu" ).on( "click", function( event ) {
        event.preventDefault;
        $.ajax({
            url: "http://localhost:8081/positions", 
            type: "GET",
            contentType: "application/json"
        })
        .done(function (positions) {
            $("#data").empty()
                .append("<h3>Positions</h3>")
                .append(JSON.stringify(positions));

        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });



  });