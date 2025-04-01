import fetch from "node-fetch"; // Make sure to install node-fetch

// Your Discord Webhook URL here
const webhookUrl = "https://discord.com/api/webhooks/1356444979131580458/Kh71vCp-5zTRI3f7_MvQutbSOY5w_gOQlpqT48250GJIB0wDkUezg0Qg8G9AdRIBYb0g";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        
        // Send the received data to the Discord webhook
        const webhookPayload = {
            content: data.content || "No content provided",
            embeds: data.embeds || [],
            attachments: data.attachments || []
        };

        try {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(webhookPayload)
            });

            if (response.ok) {
                res.status(200).json({ message: "Status received and sent to Discord" });
            } else {
                res.status(500).json({ message: "Error sending to Discord" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error: " + error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
