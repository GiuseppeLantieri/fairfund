import type { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Carousel } from '../components/Carousele';
import { Title } from '../components/Title';
import { Footer } from '../components/Footer';
import { getPublicClient } from '@wagmi/core'
import { getCampaigns } from '../utils/registry';
import { getRegistry } from '../utils/factory';
import { useEffect, useState } from 'react';
import { getEverythingCampaign } from '../utils/campaigns';
import { Container, Spinner } from 'react-bootstrap';

const Home: NextPage = () => {
  const [cards, setCards] = useState() as any;
  const publicClient = getPublicClient()

  useEffect(() => {
    (async () => {
      const campaigns = await getCampaigns(publicClient);
      const data = [];
      for (const addressC of campaigns) {
        const detail = await getEverythingCampaign(publicClient, addressC);
        data.push(detail);
      }

      setCards(data);
    })();
  }, [])


  return (
    <div >
      <Navbar />
      <Title title='Il Luogo giusto per dare valore a ciò che conta davvero per te' />
      {!cards && <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2em" }}>
                <Spinner style={{ margin: "auto" }} />
            </Container>}
      {cards && <Carousel cards={cards} />}
      <Footer />
    </div>
  );
};

export default Home;
