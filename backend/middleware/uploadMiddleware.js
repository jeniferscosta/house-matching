import multer from 'multer';

const storage = multer.memoryStorage(); // ou diskStorage para salvar em pasta
export const upload = multer({ storage });
