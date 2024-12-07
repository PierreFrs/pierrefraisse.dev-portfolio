export async function sendEmail(data: { name: string; email: string; subject: string; message: string }): Promise<string> {
    const apiEndpoint = '/api/email';

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return Promise.reject('Failed to send email.');
        }

        const responseData = await response.json();
        return responseData.message;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
}
