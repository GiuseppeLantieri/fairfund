import { Container, ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CardB from 'react-bootstrap/Card';

export function Title({ title }: { title: string }) {
    return (
        <div style={{ marginLeft: "90px", marginRight: "90px", marginTop: "2em", marginBottom: "2em", fontSize: "42px" }}>
            <h1>{title}</h1>
        </div>
    );
}
