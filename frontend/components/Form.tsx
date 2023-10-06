import { useEffect, useState } from 'react';
import { Button, Col, Image, ProgressBar, Row } from 'react-bootstrap';
import FormB from 'react-bootstrap/Form';
import Compress from "compress.js";
import { NFTStorage } from 'nft.storage';
import { useWrite } from '../hook/useWrite';
import contracts from '../constant/contracts';
import { parseUnits } from 'viem';

const ONE_MONTH = Math.round(new Date().getTime() / 1000) + (24 * 60 * 60 * 30);
export function Form() {

    const [args, setArgs] = useState() as any;

    const [Form, setForm] = useState({
        name: "",
        description: "",
        budget: "",
        company: "",
        location: "",
        postal: "",
        wallet: "",
        url: ""
    });

    const { write } = useWrite({
        abi: contracts.factory.abi,
        address: contracts.factory.address as `0x${string}`,
        args: args,
        enabled: Boolean(args),
        functionName: "createCampaign",
        value: BigInt(0)
    });



    async function resizeImageFn(file: File) {
        const compress = new Compress();
        const resizedImage = await compress.compress([file], {
            size: 2, // the max size in MB, defaults to 2MB
            quality: 1, // the quality of the image, max is 1,
            maxWidth: 300, // the max width of the output image, defaults to 1920px
            maxHeight: 300, // the max height of the output image, defaults to 1920px
            resize: true // defaults to true, set false if you do not want to resize the image width and height
        })
        const img = resizedImage[0];
        const base64str = img.data
        const imgExt = img.ext
        const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
        return new File([resizedFiile], "image", { type: file.type });
    }

    const handleChange = (value: any, variable: any) => {
        const aux = Form
        //@ts-ignore
        aux[variable] = value;
        //@ts-ignore
        setForm({ ...aux });
    }

    const storeNFT = async (image: any, name: any, description: any) => {
        // create a new NFTStorage client using our API key
        const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_ID as string })

        // call client.store, passing in the image & metadata
        return nftstorage.store({
            image, description, name
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fileBefore = formData.get("image") as File;
        const fileAfter = await resizeImageFn(fileBefore);

        // const nft = await storeNFT(fileAfter, "ciao", "prova");
        // const url = nft.data.image.href;
        const url = "ipfs://bafybeihdpwbjl2ropsqdbpm2sw6pnboaqebna2ssz32lwgbvahbsd55dui/image";
        console.log(url);
        setArgs([
            ONE_MONTH,//     uint _unlockTime,
            parseUnits(Form.budget, 18),// uint _budget,
            Form.wallet,// address _receiver,
            Form.name,// string memory _name,
            url,// string memory _image,
            Form.company,// string memory _company,
            Form.location,// string memory _location,
            Form.postal,// string memory _postal,
            Form.description// string memory _description
        ])
    }

    const click = async () => {
        write?.()
    }

    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em", border: "black 1px solid", padding: "20px", borderRadius: "25px" }}>
            <FormB onSubmit={handleSubmit}>
                <div style={{ display: "flex" }}>

                    <div style={{ flexGrow: 1 }}>
                        <FormB.Group className="mb-3" >
                            <FormB.Label>Nome raccolta</FormB.Label>
                            <FormB.Control name='name' type="text" value={Form.name} onInput={(e: any) => handleChange(e.target.value, "name")} />
                        </FormB.Group>
                        <FormB.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <FormB.Label>Descrpition</FormB.Label>
                            <FormB.Control name='description' as="textarea" rows={10} style={{ height: "100%" }} value={Form.description} onInput={(e: any) => handleChange(e.target.value, "description")} />
                        </FormB.Group>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "3em", border: "1px black solid", padding: "1em", borderRadius: "25px" }}>
                        {
                            Form.url && <img src={Form.url} style={{ width: "18em", height: "18em" }} />
                        }
                        <input
                            type="file"
                            accept="image/*"
                            name='image'
                            onChange={async (e) => {
                                if (e.target.files && e.target.files[0] != null) {
                                    const file = e.target.files[0];

                                    const aux = Form;
                                    aux.url = URL.createObjectURL(file);
                                    setForm({ ...aux })

                                }
                            }}
                            className="bg-gray-100"
                            style={{ overflow: "hidden", width: "18em" }}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <FormB.Group className="ml-3" >
                        <FormB.Label>Budget BFT</FormB.Label>
                        <FormB.Control name='budget' type="number" style={{ width: "10em" }} value={Form.budget} onInput={(e: any) => handleChange(e.target.value, "budget")} />
                    </FormB.Group>
                    <FormB.Group className="mb-3" >
                        <FormB.Label>Nome Azienda</FormB.Label>
                        <FormB.Control name='azienda' type="text" style={{ width: "25em" }} value={Form.company} onInput={(e: any) => handleChange(e.target.value, "company")} />
                    </FormB.Group>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <FormB.Group className="mb-3" >
                            <FormB.Label>Sede Legale</FormB.Label>
                            <FormB.Control name='sede' type="text" style={{ width: "25em" }} value={Form.location} onInput={(e: any) => handleChange(e.target.value, "location")} />
                        </FormB.Group>
                        <FormB.Group className="mx-3" >
                            <FormB.Label>Postal Code</FormB.Label>
                            <FormB.Control name='code' type="number" style={{ width: "5em" }} value={Form.postal} onInput={(e: any) => handleChange(e.target.value, "postal")} />
                        </FormB.Group>
                    </div>

                </div>
                <FormB.Group className="mb-3" >
                    <FormB.Label>Wallet Address</FormB.Label>
                    <FormB.Control name='address' type="text" style={{ width: "100%" }} value={Form.wallet} onInput={(e: any) => handleChange(e.target.value, "wallet")} />
                </FormB.Group>

                <div style={{ display: "flex", justifyContent: "start" }}>
                    <Button type="submit" >Confirm Data</Button>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button onClick={click} >Create Campaign</Button>
                </div>
            </FormB>
        </div>
    );
}

