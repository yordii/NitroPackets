import { Prism } from "@mantine/prism";
import { useMemo } from "react";
import { useData } from "../state";
import ViewTemplate from "./ViewTemplate";

export default function ParserView()
{
    const { titleName, internal, type, options } = useData();
    
    const functionsText = useMemo(() =>
    {
        let str = '';

        options.forEach((val, ind) =>
        {
            str += `
    public get ${val.key}(): ${val.type}
    {
        return this._${val.key};
    }`;
            
            if (ind !== (options.length - 1)) str += `
`;
        });

        return str;
    }, [options])
    
    const valuesText = useMemo(() =>
    {
        let str = '';

        options.forEach((val, ind) =>
        {
            str += `private _${val.key}: ${val.type};`
            if (ind !== (options.length - 1)) str += `
    `;
        })

        return str;
    }, [options]);

    const readPacket = useMemo(() =>
    {
        let str = '';

        options.forEach((val, ind) =>
        {
            str += `this._${val.key} = `;

            if (val.type.includes("[]"))
            {
                str += `this._${val.key} = [];
        let ${val.key}Count = wrapper.readInt();

        while(${val.key}Count > 0) {
            this._${val.key}.push(`;
            }
            
            switch (val.type.toLowerCase().split("[]")[0])
            {
                case "string":
                    str += `wrapper.readString()`;
                    break;
                    break;
                case "number":
                case "int":
                    str += `wrapper.readInt()`
                    break;
                default:
                    str += null;
            }

            if (val.type.includes("[]"))
            {
                str += `);
            ${val.key}Count--
        }`;
            } else str += `;`



            if (ind !== (options.length - 1)) str += `
        
        `;
            
        })

        return str;

    },[options])

    const messagesText = `${internal ? `import { IMessageDataWrapper, IMessageParser } from '../../../../../core';` : `import { IMessageDataWrapper, IMessageParser } from '@nitrots/nitro-renderer';`}

export class ${titleName}Parser implements IMessageParser
{
    ${valuesText}

    public flush(): boolean
    {
        return true;
    }
    
    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        ${readPacket}
    
        return true;
    }
    ${functionsText}
}`;

    if (type) return null;
    
    return <ViewTemplate title={ titleName + 'Parser.ts' }>
        <Prism language="typescript" colorScheme="dark">{ messagesText }</Prism>
    </ViewTemplate>
}