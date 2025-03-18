document.addEventListener('DOMContentLoaded', function() {
    // Variables to store elements
    const jobItems = document.querySelectorAll('.job-item');
    const contentObjects = document.querySelectorAll('.content-object');
    const expandButtons = document.querySelectorAll('.expand-btn');
    
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
        button.addEventListener('click', function() {
            const contentObject = this.closest('.content-object');
            
            // Toggle collapsed class
            contentObject.classList.toggle('collapsed');
            
            // Change button text based on state
            if (contentObject.classList.contains('collapsed')) {
                this.textContent = 'Expand';
            } else {
                this.textContent = 'Collapse';
                
                // In a real application, you might load content details here
                // For demo purposes, let's add some placeholder content
                const contentSection = contentObject.querySelector('.object-content');
                
                // Only add content if it's empty
                if (!contentSection.querySelector('.translation-container')) {
                    const translationHTML = `
                        <div class="translation-container">
                            <div class="source-text">
                                <h4>Source (English)</h4>
                                <div class="text-content">This is sample source text that would need to be translated.</div>
                            </div>
                            <div class="target-text">
                                <h4>Target (Spanish)</h4>
                                <textarea class="translation-area" placeholder="Enter translation here..."></textarea>
                            </div>
                        </div>
                    `;
                    
                    contentSection.innerHTML = translationHTML;
                }
            }
        });
    });
    
    // Additional functionality can be added here for a real application
    // - Saving translations
    // - Loading real content
    // - Validation
    // - Progress tracking
    // - etc.
});