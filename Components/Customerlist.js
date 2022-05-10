import React, { useEffect }  from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import AddCustomer from './AddCustomer';

import EditCustomer from './EditCustomer';

function Customerlist() {
    const [customers, setCustomers] = React.useState([]);

    const deleteCustomer = (link) => {
        

        fetch(link, { method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchCustomers();
                }
            })
    }

    const addCustomer = (customer) => {
        console.log("customerlistin addcustomer funktio");
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(customer)
            })
            .then(response => {
                if(response.ok) {
                    fetchCustomers();
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch(err => console.error(err))
    }

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
    }

    const editCustomer = (editCustomer, link) => {
        
        fetch(link, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(editCustomer)
        })
        .then(response => {
            if(response.ok) {
                console.log("onnistui");
                fetchCustomers();
            } else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
       { field: "firstname" , sortable: true , filter: true, floatingFilter: true },
       { field: "lastname" , sortable: true , filter: true, floatingFilter: true },
       { field: "streetaddress" , sortable: true , filter: true, floatingFilter: true },
       { field: "postcode" , sortable: true , filter: true, floatingFilter: true },
       { field: "city" , sortable: true , filter: true, floatingFilter: true },
       { field: "email" , sortable: true , filter: true, floatingFilter: true},
       { field: "phone" , sortable: true , filter: true, floatingFilter: true},
       {
           headerName: 'Edit' ,
           width: 100 ,
           field: '_links.self.href' ,
           cellRenderer: params =>
            <EditCustomer editCustomer={editCustomer} params={params} />
       }, {
           headerName: 'Delete' ,
           width: 100 ,
           field: '_links.self.href' ,
           cellRenderer: params => 
            <IconButton onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
            </IconButton>
       },
    ]

    useEffect( () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
    }, [])

    return (
        <div className="ag-theme-material" style={{height: 600, width: '90'}}>
            <AddCustomer addCustomer={addCustomer} />
            <AgGridReact
                rowData={customers}
                paginationPageSize={11}
                pagination={true}
                columnDefs={columns}>
            </AgGridReact>
        </div>
    );
}

export default Customerlist