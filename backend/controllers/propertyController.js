import UserProperties from '../models/UserProperties.js';

export const saveUserProperties = async (req, res) => {
  console.log('📦 Dados recebidos no backend:', req.body);

  try {
    const { userId, properties } = req.body;

    if (!userId) {
      console.warn('⚠️ userId ausente!');
    }
    if (!Array.isArray(properties)) {
      console.warn('⚠️ properties não é um array!', properties);
    }
    if (Array.isArray(properties) && properties.length === 0) {
      console.warn('⚠️ Nenhuma propriedade selecionada!');
    }

    if (!userId || !Array.isArray(properties) || properties.length === 0) {
      return res.status(400).json({ message: 'Dados inválidos. Envie userId e ao menos uma propriedade.' });
    }

    const newProperties = new UserProperties({ userId, properties });
    await newProperties.save();

    console.log('✅ Propriedades salvas no MongoDB:', newProperties);

    return res.status(201).json({
      message: 'Propriedades salvas com sucesso!',
      userId,
    });
  } catch (error) {
    console.error('❌ Erro ao salvar propriedades:', error);
    return res.status(500).json({ message: 'Erro no servidor ao salvar propriedades.' });
  }
};