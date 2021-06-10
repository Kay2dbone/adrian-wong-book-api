import React, { useState } from "react";
import './App.css';
import axios from "axios";
function App() {
const [state, setState] = useState([]);

const getData = async () => {
  console.log('Calledd... function')
  const formData = new FormData();
  formData.append("api_key", process.env.REACT_APP_BOOKMANAGER_API_KEY)
  formData.append("product_code", "9780635034694");
  formData.append("postal", "V5L1M5");
  formData.append("distance_km", "100");
  try {
    const { data } = await axios.post('https://api.bookmanager.com/tbm/nearbyStores/get', formData)
    console.log(data.rows) 
    const books = data.rows /// =>>>>>> THIS IS THE JSON YOU NEED!!!
    setState(books)
  } catch (error) {
    console.log('errr:::::', error)
  }
}

  return (
    <div className="App">
      <button onClick={() => getData()}>Get Books</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>City</th>
              <th>Is_Preorder?</th>
              <th>Postal</th>
              <th>URL?</th>
              <th>Distance_KM</th>
            </tr>
          </thead>
          <tbody>
          { state.map((book, index) => {
            return (
              <tr key={index} style={{ backgroundColor: index%2 === 0? '#edf0ef' : '#d5f7ec' }}>
                <td>{index + 1}</td>
                <td>{book.name}</td>
                <td>{book.address}</td>
                <td>{book.phone}</td>
                <td>{book.city}</td>
                <td>{book.is_preorder}</td>
                <td>{book.postal}</td>
                <td><a href={book.url}>URL</a></td>
                <td>{book.distance_km}</td>
              </tr>
              )
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
