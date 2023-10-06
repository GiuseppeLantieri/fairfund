import { Col, Container, Row } from "react-bootstrap";
import { Card } from "./Cards";
import colors from "../constant/colors";
import { Title } from "./Title";

export function Raccolta({ cards }: {
    cards: {
        address: string,
        unlockTime: number,
        rDonators: string,
        name: string,
        description: string,
        image: string,
        budget: number,
        company: string,
        location: string,
        postal: string,
        receiver: string,
        fundRaised: number,
        Nft: string,
        myFund: number
    }[]
}) {
    return (
        <>
            <div style={{ marginLeft: "90px", marginRight: "90px", borderRadius: "25px" }}>
                <h1>Raccolte in evidenza</h1>

                <Row style={{ justifyContent: "space-around" }}>
                    {
                        cards && cards.map((e, index) => {
                            return (
                                <Col key={index} lg={3}>
                                    <Card title={e.name} src={e.image} progress={(e.fundRaised / e.budget) * 100} id={e.address} description={e.description} />
                                </Col>
                            )
                        })
                    }
                </Row>

            </div>
            <Title title={`Hai donato un totale di ${cards.reduce((a, b) => a + b.myFund, 0)}`} />
        </>
    )
}