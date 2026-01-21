export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { webhookUrl, file } = req.body;

    if (!webhookUrl) {
        return res.status(400).json({ error: 'webhookUrl is required' });
    }

    if (!file) {
        return res.status(400).json({ error: 'file is required' });
    }

    try {
        // Convert base64 to buffer
        const buffer = Buffer.from(file, 'base64');

        // Create boundary
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).slice(2);

        // Build the multipart body
        const header = Buffer.from(
            `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="file"; filename="invoice.pdf"\r\n` +
            `Content-Type: application/pdf\r\n\r\n`
        );

        const footer = Buffer.from(`\r\n--${boundary}--\r\n`);

        // Concatenate all parts
        const body = Buffer.concat([header, buffer, footer]);

        // Forward to n8n webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
            },
            body: body
        });

        const text = await response.text();

        // Try to parse as JSON
        try {
            const data = JSON.parse(text);
            return res.status(200).json(data);
        } catch {
            // Return raw text if not JSON
            return res.status(200).json({ response: text });
        }
    } catch (error) {
        console.error('Webhook proxy error:', error);
        return res.status(500).json({ error: 'Failed to forward request: ' + error.message });
    }
}
