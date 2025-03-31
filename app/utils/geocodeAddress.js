import { GOOGLE_MAPS_API_KEY } from '@env';

export const geocodeAddress = async (address) => {
  const encodedAddress = encodeURIComponent(address);

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('API key do Google Maps não encontrada. Verifique seu arquivo .env');
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK') {
    console.log('Resposta do Google:', data); // 🔍 Ajuda no debug
    throw new Error('Endereço inválido ou não encontrado.');
  }

  const location = data.results[0].geometry.location;
  return {
    latitude: location.lat,
    longitude: location.lng,
    formattedAddress: data.results[0].formatted_address,
  };
};
