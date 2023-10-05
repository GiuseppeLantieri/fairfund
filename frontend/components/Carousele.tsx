import { Col, Container, Row } from "react-bootstrap";
import { Card } from "./Cards";
import colors from "../constant/colors";

export function Carousel({ cards }: {
    cards: {
        title: string,
        src: string,
        id: string,
        descrpition: string,
        fondi: number,
        mio: number

    }[]
}) {
    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", padding: "2em", backgroundColor: colors.green, borderRadius: "25px" }}>
            <h1>Raccolte in evidenza</h1>
            {
                cards.map((c: any) => {
                    return (
                        <Col lg={4}>
                            <Card title={c.title} src={c.url} progress={(c.fondi / c.budget)} id={c.id} descrpition={c.description} />
                        </Col>
                    )
                })
            }
        </div>
    )
}