import { Prism } from "@mantine/prism";
import { useData } from "../state";
import ViewTemplate from "./ViewTemplate";

export default function RegisterPacketView()
{
    const { type, packetID, titleName,name } = useData();

    const messagesText = `${type ? `private registerComposers(): void
{
    this._composers.set(OutgoingHeader.${name.replaceAll(" ", "_").toLocaleUpperCase()}, ${titleName}Composer);`
: `private registerEvents(): void
{
    this._events.set(IncomingHeader.${name.replaceAll(" ", "_").toLocaleUpperCase()}, ${titleName}Event);`}`;
    
    const incomingOutgoingText = `export class ${ type ? `Outgoing` : `Incoming` }Header
{
    public static ${name.replaceAll(" ", "_").toLocaleUpperCase()} = ${packetID};`;

    return <>
        <ViewTemplate title="NitroMessages.ts" subTitle="import your new packet seperately">
            <Prism language="typescript" colorScheme="dark">{ messagesText }</Prism>
        </ViewTemplate>
        <ViewTemplate title={ (type ? `OutgoingHeader` : `IncomingHeader`)  + '.ts'}>
            <Prism language="typescript" colorScheme="dark">{ incomingOutgoingText }</Prism>
        </ViewTemplate>
    </>
}