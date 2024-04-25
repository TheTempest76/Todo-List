
async function getAllData() {
    try {
        const response = await fetch("http://localhost:3002/api/");
        const data = await response.json(); 
        return data 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
async function postJSON(data , route) {
    try {
      const response = await fetch(route, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

async function deleteJSON(data){
    fetch("http://localhost:3002/api/", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"task1" :data})  //if you do not want to send any addional data,  replace the complete JSON.stringify(YOUR_ADDITIONAL_DATA) with null
      })
}

