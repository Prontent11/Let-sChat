// src/routes/messageRoutes.ts

import { Router } from 'express';
// import { searchController } from '../controller/searchController';
import { login, signUp } from '../controller/authController.js';
import { searchController } from '../controller/searchController.js';

const router = Router();


// POST   /api/auth/register              → Register user
// POST   /api/auth/login                 → Login user
// GET    /api/users/me                   → Get logged-in user info
// GET    /api/users                      → List/search users (for chatting)

//auth user
router.post('/register', signUp); 
router.post('/login', login); 

//search user
router.get('/',searchController);


export default router;
