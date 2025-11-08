
import React from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;