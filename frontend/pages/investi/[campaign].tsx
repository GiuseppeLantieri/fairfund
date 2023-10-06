import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';
import { Form } from '../../components/Form';
import { CardInfo } from '../../components/CardInfo';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getPublicClient } from '@wagmi/core';
import { getEverythingCampaign } from '../../utils/campaigns';
import contracts from '../../constant/contracts';
import { parseUnits } from 'viem';
import { useWrite } from '../../hook/useWrite';
import { Button, Container, Spinner } from 'react-bootstrap';
import FormB from 'react-bootstrap/Form';

const Home: NextPage = () => {
    const router = useRouter();
    const [detail, setDetail] = useState() as any;
    const publicClient = getPublicClient()
    const campaign = router.query.campaign;
    const [funds, setFunds] = useState(0) as any;
    const { write } = useWrite({
        abi: contracts.campaign.abi,
        address: campaign as `0x${string}`,
        args: [],
        enabled: Boolean(funds),
        functionName: "sendFund",
        value: funds == 0 ? BigInt(0) : parseUnits(funds, 18)
    });


    useEffect(() => {
        (async () => {
            try {
                const d = await getEverythingCampaign(publicClient, campaign as string);
                setDetail(d);
            }
            catch (e) {
                console.log("error on chain", e);
            }
        })();
    }, [])

    const click = async () => {
        write?.()
    }

    return (
        <div >
            <Navbar />
            <Title title='La Campagna' />
            {!detail && <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em" }}>
                <Spinner style={{ margin: "auto" }} />
            </Container>}
            {detail &&
                <>
                    <CardInfo data={detail} withdraw={false} />
                    <div style={{
                        marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em",
                        border: "black 1px solid", padding: "20px", borderRadius: "25px", display: "flex",
                        justifyContent: "space-around"
                    }}>
                        <div style={{ display: "flex", alignContent: "center" }}>
                            <FormB.Label>Budget BFT</FormB.Label>
                            <FormB.Control name='budget' type="number" style={{ width: "10em" }} value={funds} onInput={(e: any) => setFunds(e.target.value)} />
                        </div>
                        <Button onClick={click}>Sostieni!</Button>
                    </div>
                </>
            }
            <Footer />
        </div>
    );
};

export default Home;
