import { Col, Container, Row } from "react-bootstrap";
import { Card } from "./Cards";
import colors from "../constant/colors";
import { Title } from "./Title";

export function Raccolta({ cards }: {
    cards: {
        title: string,
        src: string,
        id: string,
        description: string,
        fondi: number,
        mio: number

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
                                    <Card title={e.title} src={e.src} progress={(e.mio / e.fondi) * 100} id={e.id} description={e.description} />
                                </Col>
                            )
                        })
                    }
                </Row>

            </div>
            <Title title={`Hai donato un totale di ${cards.reduce((a, b, index) => a + b.mio, 0)}`} />
        </>
    )
}