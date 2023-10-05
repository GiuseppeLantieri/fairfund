import { Container } from "react-bootstrap";
import colors from "../constant/colors";

export function Footer() {
    return (
        <Container fluid style={{ width: "100%", height: "60px",  backgroundColor: colors.darkgreen, color: colors.white }} >
            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft:"30px" }}>

                <h1>
                    Quando cerchi aiuto senza compromessi
                </h1>
                <p>
                    ©FairFund
                </p>
            </div>
        </Container>
    )
}