
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';
import { Form } from '../../components/Form';
import { Raccolta } from '../../components/Raccolta';

const Home: NextPage = () => {
    const cards = [
        { descrpition: "abc", fondi: 100, id: "1", mio: 10, src: "/asset/i1.jpeg", title: "assert" },
        { descrpition: "abc", fondi: 100, id: "1", mio: 10, src: "/asset/i2.jpeg", title: "assert" },
        { descrpition: "abc", fondi: 100, id: "1", mio: 10, src: "/asset/i2.jpeg", title: "assert" },
        { descrpition: "abc", fondi: 200, id: "1", mio: 10, src: "/asset/i2.jpeg", title: "assert" },
        { descrpition: "abc", fondi: 0, id: "1", mio: 0, src: "/asset/i2.jpeg", title: "assert" },
        { descrpition: "abc", fondi: 0, id: "1", mio: 0, src: "/asset/i2.jpeg", title: "assert" },
        { descrpition: "abc", fondi: 0, id: "1", mio: 0, src: "/asset/i2.jpeg", title: "assert" },
        { descrpition: "abc", fondi: 0, id: "1", mio: 0, src: "/asset/i2.jpeg", title: "assert" },
        { descrpition: "abc", fondi: 0, id: "1", mio: 0, src: "/asset/i2.jpeg", title: "assert" },
    ]

    return (
        <div >
            <Navbar />

            <Raccolta cards={cards} />
            <Title title="Grazie infinitivamente per il tuo contributo!" />
            <Footer />
        </div>
    );
};

export default Home;
