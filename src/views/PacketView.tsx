import { Prism } from "@mantine/prism";
import { useData } from "../state";
import ViewTemplate from "./ViewTemplate";

export default function PacketView()
{
    const { titleName, type, internal, dir, breadCrumbs, options } = useData();

    const composerOptions = () =>
    {
        let construct = '';
        let opts = '';

        options.forEach((val,ind) =>
        { 
            construct += `${val.key}: ${val.type}`

            if (val.type.includes("[]"))
            {
                opts += `${val.key}.length, ...${val.key}`;
            } else opts += val.key;
            
            if (ind !== (options.length - 1))
            {
                construct += ', '
                opts += ', '
            }
        })

        return {construct,opts}
    }
    
    const textEvent = `
            ${internal ? `import { IMessageEvent } from '../../../../${breadCrumbs}core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../${breadCrumbs}core/communication/messages/MessageEvent';
import { ${titleName}Parser } from '../${breadCrumbs}parser${dir ? `/` + dir : ''}';
` : `import { IMessageEvent, MessageEvent } from '@nitrots/nitro-renderer';
import { ${titleName}Parser } from '../../${breadCrumbs}parsers${dir ? `/` + dir : ''}';
`}
export class ${titleName}Event extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ${titleName}Parser);
    }
    
    public getParser(): ${titleName}Parser
    {
        return this.parser as ${titleName}Parser;
    } 
}`;

    const textComposer = `
${internal ? `import { IMessageComposer } from '../../../../${breadCrumbs}core';
` : `import { IMessageComposer } from '@nitrots/nitro-renderer';
`}
export class ${titleName}Composer implements IMessageComposer<ConstructorParameters<typeof ${titleName}Composer>>
{
    private _data: ConstructorParameters<typeof ${titleName}Composer>;

    constructor(${composerOptions().construct})
    {
        this._data = [ ${composerOptions().opts} ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
`;
    
    return <ViewTemplate title={ `${titleName}${!type ? 'Event.ts' : 'Composer.ts'}` }>
        <Prism language="typescript" colorScheme="dark">{ type ?  textComposer : textEvent  }</Prism>
    </ViewTemplate>
}
