import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import { Carousel } from '../components/Carousele';
import { Title } from '../components/Title';
import { Footer } from '../components/Footer';

const Home: NextPage = () => {
  return (
    <div >
      <Navbar />
      <Title title='Il Luogo giusto per dare valore a ciò che conta davvero per te' />
      <Carousel />
      <Footer />
    </div>
  );
};

export default Home;
