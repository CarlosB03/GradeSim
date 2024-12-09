// Store categories and assignments
let categories = [];

// Function to add a new category
function addCategory() {
    const categoryName = document.getElementById('categoryName').value;
    const categoryWeight = parseFloat(document.getElementById('categoryWeight').value);

    if (!categoryName || isNaN(categoryWeight) || categoryWeight < 0 || categoryWeight > 100) {
        alert("Please enter a valid category name and weight.");
        return;
    }

    const category = {
        name: categoryName,
        weight: categoryWeight / 100,  // Convert weight to percentage
        assignments: []
    };

    categories.push(category);
    document.getElementById('categoryName').value = ''; // Clear input field
    document.getElementById('categoryWeight').value = '';

    displayCategories();  // Update the category dropdown
    displayCategoryList();
    calculateGrade();  // Recalculate grade
}

// Function to display categories
function displayCategories() {
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '';

    categories.forEach((category, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Function to display categories with existing assignments and delete button
function displayCategoryList() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';
    categories.forEach((category, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${category.name} (Weight: ${category.weight * 100}%)`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Category';
        deleteButton.onclick = () => deleteCategory(index);
        listItem.appendChild(deleteButton);

        categoryList.appendChild(listItem);
    });
}

// Function to delete a category
function deleteCategory(categoryIndex) {
    categories.splice(categoryIndex, 1);  // Remove the category from the array
    displayCategories();  // Re-display the category dropdown
    displayCategoryList();  // Re-display the categories with the updated list
    calculateGrade();  // Recalculate grade after deletion
}

// Function to add an assignment to a category
function addAssignment() {
    const categoryIndex = document.getElementById('categorySelect').value;
    const assignmentScore = parseFloat(document.getElementById('assignmentScore').value);
    const assignmentTotal = parseFloat(document.getElementById('assignmentTotal').value);

    if (isNaN(assignmentScore) || isNaN(assignmentTotal) || assignmentScore < 0 || assignmentTotal <= 0) {
        alert("Please enter valid assignment score and total points.");
        return;
    }

    const assignmentPercentage = assignmentScore / assignmentTotal;  // Calculate percentage of the assignment
    categories[categoryIndex].assignments.push({
        score: assignmentScore,
        total: assignmentTotal,
        percentage: assignmentPercentage
    });

    document.getElementById('assignmentScore').value = '';  // Clear input fields
    document.getElementById('assignmentTotal').value = '';

    displayAssignments();
    calculateGrade();  // Recalculate grade
}

// Function to display assignments for each category
function displayAssignments() {
    const assignmentList = document.getElementById('assignmentList');
    assignmentList.innerHTML = '';

    categories.forEach((category, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${category.name}:`;

        category.assignments.forEach((assignment, i) => {
            const assignmentItem = document.createElement('span');
            assignmentItem.textContent = ` Assignment ${i + 1}: ${assignment.score}/${assignment.total} (${(assignment.percentage * 100).toFixed(2)}%) `;
            listItem.appendChild(assignmentItem);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteAssignment(index, i);
            listItem.appendChild(deleteButton);
        });

        assignmentList.appendChild(listItem);
    });
}

// Function to delete an assignment from a category
function deleteAssignment(categoryIndex, assignmentIndex) {
    categories[categoryIndex].assignments.splice(assignmentIndex, 1);  // Remove the assignment from the array
    displayAssignments();  // Re-display the assignments
    calculateGrade();  // Recalculate grade after deletion
}

// Function to calculate the final grade
function calculateGrade() {
    let totalGrade = 0;
    let totalWeight = 0;

    categories.forEach((category) => {
        const categoryAvg = category.assignments.reduce((a, b) => a + b.percentage, 0) / category.assignments.length;
        totalGrade += categoryAvg * category.weight;
        totalWeight += category.weight;
    });

    // Make sure the total weight is 100% (adjust if necessary)
    if (totalWeight > 1) totalWeight = 1;
    totalGrade = (totalGrade / totalWeight) * 100;

    document.getElementById('finalGrade').textContent = totalGrade.toFixed(2);
}
