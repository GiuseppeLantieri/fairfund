import { useState } from 'react';
import { Button, Col, Image, ProgressBar, Row } from 'react-bootstrap';
import FormB from 'react-bootstrap/Form';

export function Form() {
    const [Form, setForm] = useState({
        name: "",
        description: "",
        budget: "",
        azienda: "",
        sede: "",
        number: "",
        wallet: "",
        url: "",
        fondi: ""
    });


    const handleChange = (value: any, variable: any) => {
        const aux = Form
        //@ts-ignore
        aux[variable] = value;
        //@ts-ignore
        setForm({ ...aux });
    }

    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em", border: "black 1px solid", padding: "20px", borderRadius: "25px" }}>
            <FormB>
                <div style={{ display: "flex" }}>

                    <div style={{ flexGrow: 1 }}>
                        <FormB.Group className="mb-3" >
                            <FormB.Label>Nome raccolta</FormB.Label>
                            <FormB.Control type="text" value={Form.name} onInput={(e: any) => handleChange(e.target.value, "name")} />
                        </FormB.Group>
                        <FormB.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <FormB.Label>Descrpition</FormB.Label>
                            <FormB.Control as="textarea" rows={10} style={{ height: "100%" }} value={Form.description} onInput={(e: any) => handleChange(e.target.value, "description")} />
                        </FormB.Group>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "3em", border: "1px black solid", padding: "1em", borderRadius: "25px" }}>
                        {
                            Form.url && <img src={Form.url} style={{ width: "18em", height: "18em" }} />
                        }
                        <ImageFileInput onFilesChange={(file) => {
                            const aux = Form
                            //@ts-ignore
                            aux[variable] = e.target.value;
                            //@ts-ignore
                            setForm({ ...aux });
                        }} />
                    </div>
                </div>
                {
                    Form.fondi && <Row style={{ "marginTop": "2em", alignItems: "center" }}>
                        <Col lg={10}>
                            <ProgressBar now={Number(Form.fondi) / Number(Form.budget)} />
                        </Col>
                        <Col>
                            <FormB.Group className="ml-3" >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <FormB.Control type="text" style={{ width: "10em" }} value={Form.budget} onInput={(e: any) => handleChange(e.target.value, "budget")} />
                                    <div style={{ marginLeft: "1em" }}>
                                        BFT

                                    </div>
                                </div>

                            </FormB.Group>
                        </Col>
                    </Row>
                }
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <FormB.Group className="mb-3" >
                        <FormB.Label>Nome Azienda</FormB.Label>
                        <FormB.Control type="text" style={{ width: "25em" }} value={Form.azienda} onInput={(e: any) => handleChange(e.target.value, "azienda")} />
                    </FormB.Group>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <FormB.Group className="mb-3" >
                            <FormB.Label>Sede Legale</FormB.Label>
                            <FormB.Control type="text" style={{ width: "25em" }} value={Form.sede} onInput={(e: any) => handleChange(e.target.value, "sede")} />
                        </FormB.Group>
                        <FormB.Group className="mx-3" >
                            <FormB.Label>Postal Code</FormB.Label>
                            <FormB.Control type="text" style={{ width: "5em" }} value={Form.number} onInput={(e: any) => handleChange(e.target.value, "number")} />
                        </FormB.Group>
                    </div>

                </div>
                <FormB.Group className="mb-3" >
                    <FormB.Label>Wallet Address</FormB.Label>
                    <FormB.Control type="text" style={{ width: "100%" }} value={Form.wallet} onInput={(e: any) => handleChange(e.target.value, "wallet")} />
                </FormB.Group>

                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button type="submit">Submit form</Button>
                </div>
            </FormB>
        </div>
    );
}

// components/ImageFileInput.tsx
type Props = {
    onFilesChange(files: string): void;
};

const ImageFileInput = ({ onFilesChange }: Props) => {
    return (
        <input
            type="file"
            accept="image/*" // only accept image file types
            onChange={(e) => {
                if (e.target.files && e.target.files[0] != null) {

                    onFilesChange(URL.createObjectURL(e.target.files[0]));
                }
            }}
            className="bg-gray-100"
            style={{ overflow: "hidden", width: "18em" }}
        />
    );
};


