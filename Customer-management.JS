

var customersData = [];
        var lastCustomerId = 1;
        var selectedCustomerId = null;

        window.onload = function () {
            loadDataFromLocalStorage();
            displayCustomers();
        };

        function calculateProfit() {
            
            var name = document.getElementById('name').value;
            var phone = document.getElementById('phone').value;
            var email = document.getElementById('email').value;
            var cost = parseFloat(document.getElementById('cost').value);
            var sales = parseFloat(document.getElementById('sales').value);


            if (name === "" || phone === "" || email === "" || cost === "" || sales === "") {
                alert("Please Enter Data");
                return;
            }
            var profit = sales - cost;

            var currentCustomerId = lastCustomerId;

            customersData.push({
                id: currentCustomerId,  
                name: name,
                phone: phone,
                email: email,
                cost: cost,
                sales: sales,
                profit: profit,  
                addedDate: new Date().toLocaleDateString() 
            });

            lastCustomerId++;

            saveDataToLocalStorage();
            displayCustomers();
            clearInputFields();
        }

        function displayCustomers(customers) {
            var tableBody = document.querySelector('#customersTable tbody');
            tableBody.innerHTML = '';

            var customersToShow = customers ? customers : customersData;

            var totalProfit = 0;
            var totalSales = 0;
            var totalCost = 0;

            customersToShow.forEach(function (customer) {
                var row = tableBody.insertRow();
                var cellId = row.insertCell(0);
                var cellName = row.insertCell(1);
                var cellPhone = row.insertCell(2);
                var cellEmail = row.insertCell(3);
                var cellCost = row.insertCell(4);
                var cellSales = row.insertCell(5);
                var cellProfit = row.insertCell(6);
                var cellAddedDate = row.insertCell(7); 

                cellId.innerHTML = customer.id;
                cellName.innerHTML = customer.name;
                cellPhone.innerHTML = customer.phone;
                cellEmail.innerHTML = customer.email;
                cellCost.innerHTML = customer.cost;
                cellSales.innerHTML = customer.sales;
                cellProfit.innerHTML = customer.profit;
                cellAddedDate.innerHTML = customer.addedDate; 

                
                totalProfit += customer.profit;
                totalSales += customer.sales;
                totalCost += customer.cost;

              
                row.addEventListener('click', function () {
                    
                    selectedCustomerId = customer.id;
                    highlightSelectedRow();
                });
            });

            
            var totalRow = tableBody.insertRow();
            totalRow.innerHTML = `
                <td colspan="4">Total</td>
                <td>${totalCost.toFixed(2)}</td>
                <td>${totalSales.toFixed(2)}</td>
                <td>${totalProfit.toFixed(2)}</td>
                <td></td>
            `;
        }

        function editSelected() {
            
            if (selectedCustomerId !== null) {
                var index = customersData.findIndex(function (customer) {
                    return customer.id === selectedCustomerId;
                });

                if (index !== -1) {
                    var editedName = prompt('Name:', customersData[index].name);
                    var editedPhone = prompt('Phone Number:', customersData[index].phone);
                    var editedEmail = prompt('Email:', customersData[index].email);
                    var editedCost = parseFloat(prompt('Cost:', customersData[index].cost));
                    var editedSales = parseFloat(prompt('Sales:', customersData[index].sales));

                    if (
                        editedName !== null &&
                        editedPhone !== null &&
                        editedEmail !== null &&
                        !isNaN(editedCost) &&
                        !isNaN(editedSales)
                    ) {
                        customersData[index].name = editedName;
                        customersData[index].phone = editedPhone;
                        customersData[index].email = editedEmail;
                        customersData[index].cost = editedCost;
                        customersData[index].sales = editedSales;
                        customersData[index].profit = editedSales - editedCost;

                        saveDataToLocalStorage();
                        displayCustomers();
                        clearSelectedRow();
                    }
                }
            } else {
                alert('Please Select a Client To Edit');
            }
        }

        function deleteSelected() {
        
            if (selectedCustomerId !== null) {
                var confirmation = confirm('Are you sure you want to delete this client?');
        
                if (confirmation) {
               
                    var deletedCustomerId = selectedCustomerId;
        
                    customersData = customersData.filter(function (customer) {
                        return customer.id !== deletedCustomerId;
                    });
        
                    
                    customersData.forEach(function (customer, index) {
                        customer.id = index + 1;
                    });
        
                   
                    lastCustomerId = customersData.length + 1;
        
                    saveDataToLocalStorage();
                    displayCustomers();
                    clearSelectedRow();
                }
            } else {
                alert('Please select a client to delete');
            }
        }
        

        function highlightSelectedRow() {
            
            var rows = document.querySelectorAll('#customersTable tbody tr');
            rows.forEach(function (row) {
                row.classList.remove('selected-row');
            });

          
            var selectedRow = document.querySelector(`#customersTable tbody tr:nth-child(${selectedCustomerId})`);
            if (selectedRow) {
                selectedRow.classList.add('selected-row');
            }
        }

        function clearSelectedRow() {
            selectedCustomerId = null;
            
            var rows = document.querySelectorAll('#customersTable tbody tr');
            rows.forEach(function (row) {
                row.classList.remove('selected-row');
            });
        }

        function clearInputFields() {
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('email').value = '';
            document.getElementById('cost').value = '';
            document.getElementById('sales').value = '';
        }

        function saveDataToLocalStorage() {
            localStorage.setItem('customersData', JSON.stringify(customersData));
            localStorage.setItem('lastCustomerId', lastCustomerId);
        }

        function loadDataFromLocalStorage() {
            var storedData = localStorage.getItem('customersData');
            var storedLastCustomerId = localStorage.getItem('lastCustomerId');

            if (storedData) {
                customersData = JSON.parse(storedData);
            }

            if (storedLastCustomerId) {
                lastCustomerId = parseInt(storedLastCustomerId);
            }
        }

        
        function filterCustomersByDate() {
            var startDateString = document.getElementById('startDate').value;
            var endDateString = document.getElementById('endDate').value;
        
            console.log('Start Date:', startDateString);
            console.log('End Date:', endDateString);
        
            if (startDateString && endDateString) {
                var startDate = new Date(startDateString);
                var endDate = new Date(endDateString);
        
                var filteredCustomers = customersData.filter(function (customer) {
                    var customerDate = new Date(customer.addedDate);
                    return customerDate >= startDate && customerDate <= endDate;
                });
        
                console.log('Filtered Customers:', filteredCustomers);
        
               
                displayCustomers(filteredCustomers);
            }
        }
        
        

       
        function searchCustomers() {
            var searchInput = document.getElementById('searchInput').value.toLowerCase();

            var filteredCustomers = customersData.filter(function (customer) {
                return (
                    customer.name.toLowerCase().includes(searchInput) ||
                    customer.phone.includes(searchInput) ||
                    customer.email.toLowerCase().includes(searchInput)
                );
            });

            displayCustomers(filteredCustomers);
        }
        function showDataInTimeRange() {
 
    var startDateString = document.getElementById('startDate').value;
    var endDateString = document.getElementById('endDate').value;

   
    if (startDateString && endDateString) {
        
        var startDate = new Date(startDateString);
        var endDate = new Date(endDateString);

       
        var filteredCustomers = customersData.filter(function (customer) {
            var customerDate = new Date(customer.addedDate);
            return customerDate >= startDate && customerDate <= endDate;
        });

       
        displayCustomers(filteredCustomers);
    } else {
        
        alert('الرجاء تحديد بداية ونهاية الفترة');
    }
}