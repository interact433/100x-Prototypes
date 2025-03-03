// Background color changer
document.getElementById('changeColorBtn').addEventListener('click', function() {
    // Generate a random color
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    
    // Change the background color
    document.body.style.backgroundColor = randomColor;
});

// Counter functionality
const counterElement = document.getElementById('counter');
let count = 0;

document.getElementById('incrementBtn').addEventListener('click', function() {
    count++;
    counterElement.textContent = count;
});

document.getElementById('decrementBtn').addEventListener('click', function() {
    count--;
    counterElement.textContent = count;
});

document.getElementById('resetBtn').addEventListener('click', function() {
    count = 0;
    counterElement.textContent = count;
});

// To-Do List functionality
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

document.getElementById('addTodoBtn').addEventListener('click', function() {
    addTodo();
});

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText !== '') {
        // Create new list item
        const li = document.createElement('li');
        
        // Add todo text
        const todoContent = document.createElement('span');
        todoContent.textContent = todoText;
        li.appendChild(todoContent);
        
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });
        li.appendChild(deleteBtn);
        
        // Add to list
        todoList.appendChild(li);
        
        // Clear input
        todoInput.value = '';
    }
    
    // Focus back on input
    todoInput.focus();
}