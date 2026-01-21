import FormData from 'form-data';

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

        // Create form-data
        const form = new FormData();
        form.append('file', buffer, { filename: 'invoice.pdf', contentType: 'application/pdf' });

        // Forward to n8n webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: form,
            headers: form.getHeaders(),
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Webhook proxy error:', error);
        return res.status(500).json({ error: 'Failed to forward request: ' + error.message });
    }
}
