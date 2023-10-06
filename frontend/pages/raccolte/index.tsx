import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';
import { Form } from '../../components/Form';
import { CardInfo } from '../../components/CardInfo';
import { getAccount, getPublicClient } from '@wagmi/core'
import { getCampaigns } from '../../utils/registry';
import { getEverythingCampaign, getRDonators, getReceiver } from '../../utils/campaigns';
import { getDonators } from '../../utils/donators';
import { useEffect, useState } from 'react';
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
                    const receiver = await getReceiver(publicClient, addressC);
                    if (receiver == account.address) {
                        const det = await getEverythingCampaign(publicClient, addressC);
                        data.push({ ...det });
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
            <Title title='La tua raccolta' />
            {!cards && <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em" }}>
                <Spinner style={{ margin: "auto" }} />
            </Container>}
            {
                cards && cards.map((card: any, index: number) => {
                    return (
                        <div key={index}>
                            <CardInfo data={card} withdraw={true}/>
                            
                        </div>

                    )
                })
            }
            <Footer />
        </div>
    );
};

export default Home;
