<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($data['name']) && isset($data['email'])) {
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);

    $city = "Kharar";
    $temperature = "51°C";
    $description = "Cloudy";
    $humidity = "60%";
    $windSpeed = "6.2 km/h";

    $subject = "Weather Alert for $city";
    $message = "
    Hello $name,

    Here are the current weather details for $city:

    Temperature: $temperature
    Description: $description
    Humidity: $humidity
    Wind Speed: $windSpeed

    Stay safe!

    Best regards,
    Your Weather App
    ";

    $headers = "From: your-email@example.com\r\n";
    $headers .= "Reply-To: your-email@example.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($email, $subject, $message, $headers)) {
        echo json_encode(["success" => true, "message" => "Email sent successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to send email"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
?>
