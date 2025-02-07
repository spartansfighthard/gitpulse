import ngrok from 'ngrok';

export async function startNgrok() {
  try {
    const url = await ngrok.connect({
      addr: 3000,
      authtoken: process.env.NGROK_AUTHTOKEN,
    });
    console.log('Ngrok tunnel created:', url);
    return url;
  } catch (error) {
    console.error('Failed to create ngrok tunnel:', error);
    throw error;
  }
} 