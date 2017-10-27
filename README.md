# WEB422 Assignment 3

For this assignment, we created a friendly user interface to allow users to edit existing JSON data retrieved by our API hosted on Heroku. This includes changing the Team Lead, the current Projects as well as the Members (Employees) of each of the 15 teams in the system. 

[Multiple Select jQuery plugin](http://wenzhixin.net.cn/p/multiple-select) was used to make the controls much easier to use, and [Knockout.js](https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwi45LLY24_XAhXH4IMKHZFGDNkQFggoMAA&url=http%3A%2F%2Fknockoutjs.com%2F&usg=AOvVaw2RzhsmAI2q2V18UirMjC7R)
provides two-way binding for quick updates. 

The collections of data are stored on MongoDB in JSON format. An AJAX "Get" request is performed with jQuery to retrieve this data through an API I've hosted on Heroku:
```
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
```

Once the GET request completes successfully, the value of the "employees" property is set to the data returned from the AJAX call using the [fromJS](http://knockoutjs.com/documentation/plugins-mapping.html) method of the ko.mapping object. The promise is then resolved.


## Contributors

Stephanie Tran, [Patrick Crawford](https://github.com/patrick-crawford)