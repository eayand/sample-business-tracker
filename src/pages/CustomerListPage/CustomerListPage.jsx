import { Link } from "react-router-dom";

export default function CustomerListPage() {
    return (
        <>
        <h1 className="align-left">Customers <span><Link> <button>Create New Customer</button> </Link></span></h1>
      
        <div className="chart-container">
            <table >
                <tr>
                    <th className="first-column">Name</th>
                    <th>Address</th>
                    <th>Tax ID</th>
                    <th>Renewal</th>
                    <th>Broker</th>
                    <th>Commission 1</th>
                    <th>Commission 2</th>
                </tr>
                <tr>
                    <td className="first-column">Coffee King</td>
                    <td>1234 Main St, Los Angeles, CA 55555</td>
                    <td>123456789</td>
                    <td>December</td>
                    <td>Insurance Guys</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="first-column">Computer Depot</td>
                    <td>5678 Lemon St, Houston, TX 55555</td>
                    <td>123456789</td>
                    <td>March</td>
                    <td>Benefit Guys</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="first-column">Pizza Shop</td>
                    <td>8919 Broadway Ave, New York, NY 11111</td>
                    <td>123456789</td>
                    <td>January</td>
                    <td>Some Other Guys</td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
   
        </>
        
    )
}