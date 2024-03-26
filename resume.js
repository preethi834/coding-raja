document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sign-in-link').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior (page navigation)
      document.getElementById('login-container').style.display = 'block'; // Display the login form container
      document.getElementById('resume-form').style.display = 'none'; // Hide the resume form
      document.getElementById('resume-preview').style.display = 'none'; // Hide the resume preview
    });
  
    document.getElementById('login-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission behavior (page reload)
      // Here you would handle the login process, for simplicity, let's just reload the page
      location.reload();
    });
  });
document.addEventListener('DOMContentLoaded', function() {
    // Get the "Create Resume" button
    var createResumeBtn = document.getElementById('create-resume-btn');
  
    // Add click event listener to the button
    createResumeBtn.addEventListener('click', function() {
      // Reload the page
      location.reload();
    });
  });
  