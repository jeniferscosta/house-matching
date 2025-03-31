import User from '../models/User.js'; 


export const registerUser = async (req, res) => {
  console.log('Requisição recebida:', req.body);

  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já registrado.' });
    }

    // create and save new user
    const newUser = new User({ fullName, email, password });
    await newUser.save();


    console.log('✅ Usuário criado, retornando ID:', newUser._id);

    // Retorna o ID criado ao frontend
    return res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      userId: newUser._id,
    });
    
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
  
};

export const updateUserProfile = async (req, res) => {
  try {
    // ✅ LOG para depurar
    console.log('📥 req.body:', req.body);
    console.log('📎 req.file:', req.file);

    const { userId, phone } = req.body;
    const file = req.file;

    // 🔒 Verifica campos obrigatórios
    if (!userId) {
      return res.status(400).json({ message: 'userId ausente.' });
    }

    // 🧠 Se estiver usando multipart/form-data, `req.body` pode conter valores como string
    const user = await User.findById(userId.trim());
    if (!user) {
      console.log('❌ Usuário não encontrado com ID:', userId);
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // 💾 Atualiza os dados
    if (phone) user.phone = phone;
    if (file) {
      user.profileImage = file.buffer.toString('base64');
    }

    await user.save();

    return res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao atualizar perfil:', error);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};



