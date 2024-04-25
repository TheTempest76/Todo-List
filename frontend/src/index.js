const addButton = document.querySelector('#butt button');
const taskInput = document.querySelector('#butt input[type="text"]');
const taskList = document.querySelector('ul');


  
addButton.addEventListener('click', function() {
  const taskText = taskInput.value.trim();
    if (taskText !== '') {
        makeElements(taskText);

        let postText = {"task1" : taskText , "status" : "incomplete"}
        postJSON(postText , "http://localhost:3002/api/")
    }})

function makeElements(taskText , status ) {
    // Create new list item
    const listItem = document.createElement('li');
    listItem.classList.add('px-4', 'py-4', 'sm:px-6', 'flex', 'items-center', 'justify-between');

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-checkbox', 'h-5', 'w-5', 'text-indigo-600');

    // Create task text span
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('ml-2', 'text-sm', 'text-green-200', 'text-2xl', 'antialiased', 'font-serif');
    taskSpan.textContent = taskText;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('text-red-500', 'hover:text-red-700', 'delete');
    deleteButton.textContent = 'Delete';
    
    if (status === 'complete') {
        checkbox.checked = true;
        taskSpan.classList.add('line-through');
    } else {
        checkbox.checked = false;
    }
 // Event listener for checkbox
    checkbox.addEventListener('change', function() {
        
        if (checkbox.checked  ) {
            taskSpan.classList.add('line-through');
            postJSON({"task1":taskSpan.textContent , "status" : "complete"},"http://localhost:3002/api/updateStatus")
        } else {
            taskSpan.classList.remove('line-through');
            postJSON({"task1":taskSpan.textContent , "status" : "incomplete"},"http://localhost:3002/api/updateStatus")
        }
    });
    // Event listener for delete button
    deleteButton.addEventListener('click', function(event) {
        // Get the parent element (list item) and remove it from the task list
        const listItem = event.target.closest('li');
        
        deleteJSON(taskSpan.textContent)
        listItem.remove();
    });

    // Append elements to list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    // Append list item to task list
    taskList.appendChild(listItem);

    // Clear input field
    taskInput.value = '';
}
window.onload = async function(){
   
    const data = await getAllData()
    data.forEach(element => {
        makeElements(element.task1 , element.status) 
    });
   
}