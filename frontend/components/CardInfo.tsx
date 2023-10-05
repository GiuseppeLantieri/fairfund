import { useState } from 'react';
import { Button, Col, Image, ProgressBar, Row } from 'react-bootstrap';
import FormB from 'react-bootstrap/Form';
import { Title } from './Title';

export function CardInfo({ data }: {
    data: {
        name: string,
        description: string,
        budget: string,
        url: string,
        fondi: string
    }
}) {

    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em", border: "black 1px solid", padding: "20px", borderRadius: "25px" }}>
            <h1>{data.name}</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flexGrow: "1", height: "20em", border: "black 1px solid", borderRadius:"25px", padding:"1em" }}>
                    {data.description}
                </div>
                <img style={{ height: "20em", width: "20em", marginLeft:"3em", borderRadius:"25px" }} src={data.url} alt="" />
            </div>

            <div style={{ marginTop: "2em" }}>
                <h2>Abbiamo raggiunto finora:</h2>
                <h2>{data.fondi}/{data.budget}</h2>
            </div>
        </div>
    );
}
