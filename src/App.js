import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CadastrarLivro from './pages/CadastrarLivro';
import AvaliarLivro from './pages/AvaliarLivro'; 
import MinhasMetas from './pages/MinhasMetas';
import Explorar from './pages/Explorar';
import MinhaEstante from './pages/MinhaEstante';

import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastrar-livro" element={<CadastrarLivro />} />
        <Route path="/avaliar-livro" element={<AvaliarLivro />} />
        
        <Route path="/minhas-metas" element={<MinhasMetas />} />

        <Route path="/explorar" element={<Explorar />} />
        <Route path="/perfil/:id" element={<MinhaEstante />} />
        
        <Route path="/minhas-metas" element={<div style={{padding: '50px', textAlign: 'center', color: '#452f02'}}><h2>Metas (Em Breve)</h2></div>} />
        <Route path="/biblioteca" element={<div style={{padding: '50px', textAlign: 'center', color: '#452f02'}}><h2>Grande Biblioteca (Em Breve)</h2></div>} />
        <Route path="/clubes" element={<div style={{padding: '50px', textAlign: 'center', color: '#452f02'}}><h2>Clubes (Em Breve)</h2></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;