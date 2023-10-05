import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';
import { Form } from '../../components/Form';
import { CardInfo } from '../../components/CardInfo';

const Home: NextPage = () => {
    return (
        <div >
            <Navbar />
            <Title title='La tua raccolta' />
            <CardInfo data={{ budget: "100", description: "Lorem Ipsus", fondi: "200", name: "Fondo Pensione", url:"/asset/i1.jpeg" }} />
            <Footer />
        </div>
    );
};

export default Home;
