import { useState } from 'react';
import { Button, Col, Image, ProgressBar, Row } from 'react-bootstrap';
import FormB from 'react-bootstrap/Form';
import { Title } from './Title';
import { useWrite } from '../hook/useWrite';
import contracts from '../constant/contracts';

export function CardInfo({ data, withdraw }: {
    data: {
        address: string,
        unlockTime: number,
        rDonators: string,
        name: string,
        description: string,
        image: string,
        budget: string,
        company: string,
        location: string,
        postal: string,
        receiver: string,
        fundRaised: string,
        Nft: string
    },
    withdraw: boolean
}) {
    const { write } = useWrite({
        abi: contracts.campaign.abi,
        address: data.address as `0x${string}`,
        args: [[data.image]],
        enabled: Boolean(data.unlockTime * 1000 > Date.now()) || Boolean(data.fundRaised >= data.budget),
        functionName: "withdraw",
        value: BigInt(0)
    });

    const click = async () => {
        write?.()
    }

    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em", border: "black 1px solid", padding: "20px", borderRadius: "25px" }}>
            <h1>{data.name}</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flexGrow: "1", height: "20em", border: "black 1px solid", borderRadius: "25px", padding: "1em" }}>
                    {data.description}
                </div>
                <img style={{ height: "20em", width: "20em", marginLeft: "3em", borderRadius: "25px" }} src={data.image} alt="" />
            </div>

            <div style={{ marginTop: "2em" }}>
                <h2>Abbiamo raggiunto finora:</h2>
                <h2>{data.fundRaised}/{data.budget}</h2>
            </div>
            {
                withdraw &&
                <div style={{
                    display: "flex",
                    justifyContent: "end"
                }}>
                    <Button onClick={click}>Ritira i soldi</Button>
                </div>
            }
        </div>
    );
}
