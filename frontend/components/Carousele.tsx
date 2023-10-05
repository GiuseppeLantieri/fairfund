import { Container, Row } from "react-bootstrap";
import { Card } from "./Cards";
import colors from "../constant/colors";

export function Carousel() {
    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", padding: "2em", backgroundColor: colors.green, borderRadius: "25px" }}>
            <h1>Raccolte in evidenza</h1>

            <Row style={{ justifyContent: "space-around" }}>
                <Card title="titolo" src="/asset/i1.jpeg" progress={60} id="" descrpition="Cumma" />
                <Card title="titolo" src="/asset/i2.jpeg" progress={30} id="" descrpition="Cumma" />
                <Card title="titolo" src="/asset/i1.jpeg" progress={20} id="" descrpition="Cumma" />
            </Row>
        </div>
    )
}