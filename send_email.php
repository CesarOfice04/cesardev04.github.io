<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger datos del formulario
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Configurar el destinatario y el asunto
    $to = "cesaroficial04@gmail.com"; // Cambia esto por tu dirección de correo
    $subject = "Nuevo mensaje de contacto de $name";

    // Crear el cuerpo del mensaje
    $body = "Nombre: $name\n";
    $body .= "Email: $email\n";
    $body .= "Mensaje:\n$message\n";

    // Configurar los encabezados del correo
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado correctamente.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Método de solicitud no válido.";
}
?>
