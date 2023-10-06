
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';
import { Form } from '../../components/Form';
import { Raccolta } from '../../components/Raccolta';
import { useEffect, useState } from 'react';
import { getCampaigns } from '../../utils/registry';
import { getEverythingCampaign, getRDonators } from '../../utils/campaigns';
import { getDonatorAmount, getDonators } from '../../utils/donators';
import { getAccount, getPublicClient } from '@wagmi/core'
import { formatUnits } from 'viem';
import { Container, Spinner } from 'react-bootstrap';

const Home: NextPage = () => {
    const [cards, setCards] = useState() as any;

    const publicClient = getPublicClient()

    const account = getAccount();

    useEffect(() => {
        (async () => {
            if (account.address) {
                const campaigns = await getCampaigns(publicClient);
                const data = [];
                for (const addressC of campaigns) {
                    const addressR = await getRDonators(publicClient, addressC);
                    const donators = await getDonators(publicClient, addressR);
                    if (donators.includes(account.address)) {
                        const myFund = formatUnits(await getDonatorAmount(publicClient, addressR, account.address), 18);
                        const det = await getEverythingCampaign(publicClient, addressC);
                        data.push({ ...det, myFund });

                    }
                }

                console.log(data);
                setCards(data);
            }
        })();
    }, [])



    return (
        <div >
            <Navbar />

            {!cards &&
                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em" }}>

                    <Spinner style={{ margin: "auto" }} />
                </Container>
            }
            {cards && <Raccolta cards={cards} />}
            <Title title="Grazie infinitivamente per il tuo contributo!" />
            <Footer />
        </div>
    );
};

export default Home;
