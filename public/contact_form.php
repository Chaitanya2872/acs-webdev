<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "hello@acstechnologies.co.in"; // Replace with your actual email
    $subject = "New Contact Form Submission";
    
    // Determine which form was submitted
    if (isset($_POST['firstname']) && isset($_POST['lastname'])) {
        $formType = "Sales Enquiry";
        $messageBody = "Sales Enquiry Form Submission:\n";
        $messageBody .= "First Name: " . htmlspecialchars($_POST['firstname']) . "\n";
        $messageBody .= "Last Name: " . htmlspecialchars($_POST['lastname']) . "\n";
        $messageBody .= "Email: " . htmlspecialchars($_POST['email']) . "\n";
        $messageBody .= "Phone: " . htmlspecialchars($_POST['phone']) . "\n";
        $messageBody .= "Company Name: " . htmlspecialchars($_POST['companyname']) . "\n";
        $messageBody .= "Role in the Company: " . htmlspecialchars($_POST['roleinthecompany']) . "\n";
        $messageBody .= "Company Website: " . htmlspecialchars($_POST['companywebsite']) . "\n";
        $messageBody .= "Location: " . htmlspecialchars($_POST['locationoraddress']) . "\n";
        $messageBody .= "Message: " . htmlspecialchars($_POST['message']) . "\n";
    } elseif (isset($_POST['fname']) && isset($_POST['position'])) {
        $formType = "General Enquiry";
        $messageBody = "General Enquiry Form Submission:\n";
        $messageBody .= "First Name: " . htmlspecialchars($_POST['fname']) . "\n";
        $messageBody .= "Position: " . htmlspecialchars($_POST['position']) . "\n";
        $messageBody .= "Company Name: " . htmlspecialchars($_POST['cname']) . "\n";
        $messageBody .= "Email: " . htmlspecialchars($_POST['mail']) . "\n";
        $messageBody .= "Department: " . htmlspecialchars($_POST['department']) . "\n";
        $messageBody .= "Location: " . htmlspecialchars($_POST['location']) . "\n";
        $messageBody .= "Phone: " . htmlspecialchars($_POST['number']) . "\n";
        $messageBody .= "Description: " . htmlspecialchars($_POST['description']) . "\n";
    } elseif (isset($_POST['relationwithacs']) && isset($_POST['typeofsubmission'])) {
        $formType = "Voice It Form";
        $messageBody = "Voice It Form Submission:\n";
        $messageBody .= "Relation with ACS: " . htmlspecialchars($_POST['relationwithacs']) . "\n";
        $messageBody .= "Type of Submission: " . htmlspecialchars($_POST['typeofsubmission']) . "\n";
        $messageBody .= "Company Name: " . htmlspecialchars($_POST['company-name']) . "\n";
        $messageBody .= "Full Name: " . htmlspecialchars($_POST['fullname']) . "\n";
        $messageBody .= "Job Title: " . htmlspecialchars($_POST['jobtitle']) . "\n";
        $messageBody .= "Phone: " . htmlspecialchars($_POST['call']) . "\n";
        $messageBody .= "Email: " . htmlspecialchars($_POST['Email']) . "\n";
        $messageBody .= "Description: " . htmlspecialchars($_POST['description']) . "\n";
    } else {
        die("Invalid form submission.");
    }
    
    $headers = "From: info@acstechnologies.co.in\r\n"; // Change to your domain email
    // Each form names its email field differently; only a validated address may go into a header.
    $replyTo = filter_var($_POST['email'] ?? $_POST['mail'] ?? $_POST['Email'] ?? '', FILTER_VALIDATE_EMAIL);
    if ($replyTo) {
        $headers .= "Reply-To: " . $replyTo . "\r\n";
    }
    
    if (mail($to, "$formType - $subject", $messageBody, $headers)) {
        echo "Success";
    } else {
        echo "Error sending email.";
    }
} else {
    echo "Invalid request.";
}
