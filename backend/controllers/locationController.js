import Location from '../models/Location.js';

export const saveUserLocation = async (req, res) => {
  try {
    const { userId, locationInfo } = req.body;

    if (!userId || !locationInfo) {
      return res.status(400).json({ message: 'Dados incompletos.' });
    }

    const location = new Location({ userId, locationInfo });
    await location.save();

    res.status(201).json({ message: 'Localização salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar localização:', error);
    res.status(500).json({ message: 'Erro no servidor ao salvar localização.' });
  }
};
