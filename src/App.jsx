import { useState } from 'react';
import axios from 'axios';
import Chat from './components/Chat';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
 return (
  <>
    <Navbar />
    <Chat />
    <Footer />
  </>
 )
}

export default App;
