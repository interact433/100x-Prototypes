document.addEventListener('DOMContentLoaded', function() {
    // Variables to store elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('toggle-sidebar');
    const jobItems = document.querySelectorAll('.job-item');
    const contentObjects = document.querySelectorAll('.content-object');
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        sidebar.classList.toggle('expanded');
    });
    
    // Handle job selection
    jobItems.forEach(job => {
        job.addEventListener('click', function() {
            // Remove active class from all jobs
            jobItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to selected job
            this.classList.add('active');
            
            // Update content pane header with job info
            const objectCount = this.querySelector('.job-meta').textContent;
            const contentHeader = document.querySelector('.content-header h2');
            contentHeader.textContent = objectCount + ' in this job';
            
            // In a real application, you would load the content objects for this job here
        });
    });
    
    // Handle content object expansion/collapse
    expandButtons.forEach(button => {
        const contentObject = button.closest('.content-object');
        const header = contentObject.querySelector('.object-header');
        
        // Add click handler to the entire header
        header.addEventListener('click', function(e) {
            // Don't trigger if clicking the chevron button itself
            if (e.target === button) return;
            
            // Toggle collapsed class
            contentObject.classList.toggle('collapsed');
            
            if (contentObject.classList.contains('collapsed')) {
                // Expand sidebar if it was collapsed
                if (sidebar.classList.contains('collapsed')) {
                    sidebar.classList.remove('collapsed');
                    sidebar.classList.add('expanded');
                }
            } else {
                // Collapse sidebar when expanding content
                sidebar.classList.remove('expanded');
                sidebar.classList.add('collapsed');
                
                // In a real application, you might load content details here
                // For demo purposes, let's add some placeholder content
                const contentSection = contentObject.querySelector('.object-content');
                const objectType = contentObject.getAttribute('data-type');
                
                // Only add content if it's empty
                if (!contentSection.querySelector('.segments-container')) {
                    let segmentsHTML = `
                        <div class="segments-container">
                            <table class="segments-table">
                                <thead>
                                    <tr>
                                        <th>Segment Type</th>
                                        <th>Text Segment in English</th>
                                        <th>Text Segment in Spanish</th>
                                    </tr>
                                </thead>
                                <tbody>
                    `;
                    
                    // Generate different segments based on object type
                    if (objectType === 'body-only') {
                        // Body-only type (4 body segments)
                        for (let i = 1; i <= 4; i++) {
                            segmentsHTML += `
                                <tr>
                                    <td><span class="segment-type body">Body</span></td>
                                    <td class="source-text">This is the ${i}${getSuffix(i)} segment of body text. It demonstrates how content is split into smaller parts for translation.</td>
                                    <td><textarea class="translation-textarea" placeholder="Enter translation here..."></textarea></td>
                                </tr>
                            `;
                        }
                    } else {
                        // Header-statement-body type
                        // Header (1-2 segments)
                        for (let i = 1; i <= 2; i++) {
                            segmentsHTML += `
                                <tr>
                                    <td><span class="segment-type header">Header</span></td>
                                    <td class="source-text">This is part ${i} of the header text, separated by punctuation.</td>
                                    <td><textarea class="translation-textarea" placeholder="Enter translation here..."></textarea></td>
                                </tr>
                            `;
                        }
                        
                        // Statement (1-2 segments)
                        for (let i = 1; i <= 2; i++) {
                            segmentsHTML += `
                                <tr>
                                    <td><span class="segment-type statement">Statement</span></td>
                                    <td class="source-text">This is part ${i} of the statement text, which provides more context about the content.</td>
                                    <td><textarea class="translation-textarea" placeholder="Enter translation here..."></textarea></td>
                                </tr>
                            `;
                        }
                        
                        // Body (3 segments)
                        for (let i = 1; i <= 3; i++) {
                            segmentsHTML += `
                                <tr>
                                    <td><span class="segment-type body">Body</span></td>
                                    <td class="source-text">This is the ${i}${getSuffix(i)} segment of the main body content. These segments are automatically detected based on punctuation.</td>
                                    <td><textarea class="translation-textarea" placeholder="Enter translation here..."></textarea></td>
                                </tr>
                            `;
                        }
                    }
                    
                    segmentsHTML += `
                                </tbody>
                            </table>
                            <button class="done-button">Done</button>
                        </div>
                    `;
                    
                    contentSection.innerHTML = segmentsHTML;
                    
                    // Add event listener to the Done button
                    const doneButton = contentSection.querySelector('.done-button');
                    doneButton.addEventListener('click', function() {
                        // Update status to done
                        const statusElement = contentObject.querySelector('.status');
                        statusElement.className = 'status done';
                        statusElement.textContent = 'Done';
                        
                        // Collapse the content object
                        contentObject.classList.add('collapsed');
                        button.textContent = 'Expand';
                        
                        // Expand sidebar
                        sidebar.classList.remove('collapsed');
                        sidebar.classList.add('expanded');
                    });
                    
                    // Add event listeners to textareas to highlight active row
                    const textareas = contentSection.querySelectorAll('.translation-textarea');
                    textareas.forEach(textarea => {
                        textarea.addEventListener('focus', function() {
                            // Remove active class from all rows
                            const allRows = contentSection.querySelectorAll('.segments-table tr');
                            allRows.forEach(row => row.classList.remove('active'));
                            
                            // Add active class to the parent row
                            const parentRow = this.closest('tr');
                            parentRow.classList.add('active');
                        });
                    });
                }
            }
        });
    });
    
    // Helper function to get the correct suffix for numbers
    function getSuffix(num) {
        if (num === 1) return 'st';
        if (num === 2) return 'nd';
        if (num === 3) return 'rd';
        return 'th';
    }
});