package pi.tn.esprit.Utils;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;

import java.io.IOException;
import java.util.*;
public class Mailer {
    public static void sendMail(String time,String link,String to) {

        final String username = "ghassen.93459001@gmail.com";
        final String password = "q w q p g k y k i y w c e i z f";

        String toEmail = to;

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.starttls.required", "true");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("Zoom meeting");

            String htmlContent = generateHtmlContent(time,link);

            MimeBodyPart textPart = new MimeBodyPart();
            textPart.setText("Canceled");

            message.setContent(htmlContent, "text/html");

            Transport.send(message);

            System.out.println("Email sent successfully!");

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
    private static String generateHtmlContent(String time,String link) {
        return String.format("""
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                            color: #333333;
                        }
                                
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                                
                        h1 {
                            color: #0078D4;
                            border-bottom: 2px solid #0078D4;
                            padding-bottom: 10px;
                        }
                                
                        p {
                            color: #333333;
                            line-height: 1.6;
                        }
                                
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            margin-top: 20px;
                            background-color: #0078D4;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                                
                        .footer {
                            margin-top: 20px;
                            padding-top: 10px;
                            border-top: 1px solid #dddddd;
                            font-size: 14px;
                            color: #888888;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Join Our Meeting</h1>
                        <p>Dear Team Member,</p>
                        <p>You are invited to join our meeting on the following date : %s. Please click the button below to join:</p>
                        <a href="%s" class="button">Join Meeting</a>
                        <div class="footer">
                            <p>Best regards.</p>
                        </div>
                    </div>
                </body>
                </html>
                          
                """,time, link);
    }
}
