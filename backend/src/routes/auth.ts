import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { db } from '../config/db'; // Asegúrate de que la ruta sea correcta

const router = Router();

// Ruta de login de usuario
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validación de datos
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Consultamos el usuario por el nombre de usuario
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const users = rows as any[];
    const user = users[0];

    // Si el usuario no existe, devolvemos un error
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Verificamos la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Guardamos la sesión del usuario si el login es exitoso
    (req.session as { user?: { id: number; username: string } }).user = { id: user.id, username: user.username };
    
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
});

// Ruta de registro de usuario
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validación de datos
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Verificamos si el usuario ya existe
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if ((existingUser as any[]).length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Encriptamos la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertamos el nuevo usuario en la base de datos
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user', error });

  }

  
});

router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
  
});

export default router;


