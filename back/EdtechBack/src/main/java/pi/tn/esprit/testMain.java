package pi.tn.esprit;
import org.json.JSONObject;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class testMain {
    public static void main(String[] args) throws IOException, InterruptedException {
        String startTime = "2024-05-11T10:00:00Z";
        String topic = "Custom Topic";

        // Define your JSON payload with customized start time and topic
        String jsonBody = "{\r\n" +
                "  \"topic\": \"" + topic + "\",\r\n" +
                "  \"type\":2,\r\n" +
                "  \"start_time\": \"" + startTime + "\",\r\n" +
                "  \"duration\":\"3\",\r\n" +
                "  \"settings\":{\r\n" +
                "   \"host_video\":true,\r\n" +
                "   \"participant_video\":true,\r\n" +
                "   \"join_before_host\":true,\r\n" +
                "   \"mute_upon_entry\":\"true\",\r\n" +
                "   \"watermark\": \"true\",\r\n" +
                "   \"audio\": \"voip\",\r\n" +
                "   \"auto_recording\": \"cloud\"\r\n" +
                "     } \r\n" +
                "  \r\n" +
                " }";

        // Define your bearer token
        String bearerToken = "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjAyMjMwMDM1LTFhOTItNGI4MC1iNWU1LWJlMmVhMTg1NGE3OSJ9.eyJ2ZXIiOjksImF1aWQiOiIxYjNlZmQyYWU0ODg0NTNkN2I4ZWEwZTVkMTc0NGI2NCIsImNvZGUiOiJwQkpMM3BiQVBsZUhaTzAwS1FJUkR5aXhnallIY1REZFEiLCJpc3MiOiJ6bTpjaWQ6MHhkd3JkV2tRd2E2OEtSMmI3WWlJdyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJ3elY5b3RvRlJzeXNrVE1NdVIyaG9nIiwibmJmIjoxNzEzODk3NDc1LCJleHAiOjE3MTM5MDEwNzUsImlhdCI6MTcxMzg5NzQ3NSwiYWlkIjoiaHJ2R3JsX1VRcS1Fa0d4YVFqWVBiZyJ9.wwaPMYM2PHBuY6rsFYnLxNqAGvnf9aXgcUwPGRZg48_mP6dTtHY_iACBt6kIaRduvZJSPwScuH7BmelmVMUcZQ";

        // Create an HttpClient with default settings
        HttpClient client = HttpClient.newHttpClient();

        // Create an HttpRequest with method POST and your JSON payload
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.zoom.us/v2/users/me/meetings"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + bearerToken)
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        // Send the request and handle the response
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        String responseBody = response.body();
        JSONObject jsonResponse = new JSONObject(responseBody);
        String startUrl = jsonResponse.getString("start_url");
        System.out.println("Start URL: " + startUrl);

    }
}
