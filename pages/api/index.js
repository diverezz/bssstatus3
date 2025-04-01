import { useState, useEffect } from "react";

export default function Home() {
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const fetchStatuses = async () => {
            const res = await fetch("/api/status");
            const data = await res.json();
            setStatuses(data);
        };

        fetchStatuses();
    }, []);

    return (
        <div>
            <h1>BestStatus - Bee Swarm Macro Monitoring</h1>
            <ul>
                {statuses.map((status, index) => (
                    <li key={index}>
                        <strong>{status.username || "Unknown"}</strong>: {status.content}
                        {status.embeds && status.embeds.length > 0 && (
                            <div>
                                <strong>Embeds:</strong>
                                {status.embeds.map((embed, i) => (
                                    <pre key={i}>{JSON.stringify(embed, null, 2)}</pre>
                                ))}
                            </div>
                        )}
                        {status.attachments && status.attachments.length > 0 && (
                            <div>
                                <strong>Attachments:</strong>
                                {status.attachments.map((att, i) => (
                                    <a key={i} href={att.url} target="_blank" rel="noopener noreferrer">
                                        {att.url}
                                    </a>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
