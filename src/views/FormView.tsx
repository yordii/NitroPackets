import { useData } from "../state"

export default function FormView()
{
    const { packetID, name, dir, internal, type, options } = useData();
    const { setPacketID, setName, setDir, setInternal, setType, updateField, newField, removeField } = useData();

    return <div className="w-1/4 bg-slate-800 h-full p-2 flex flex-col">
        <div className="border-b border-b-slate-700 grid grid-cols-1 gap-2 mb-2 pb-2">
            <select className="input-element" onChange={evt => setType(parseInt(evt.target.value))} value={ type }>
                <option value="0">Incoming / Event</option>
                <option value="1">Outgoing / Composer</option>
            </select>

            <select className="input-element" onChange={evt => setInternal(parseInt(evt.target.value))} value={ internal }>
                <option value="1">Internal</option>
                <option value="0">External</option>
            </select>

            <input className="input-element" placeholder="Packet ID" onChange={evt => setPacketID(evt.target.value)} value={ packetID } />
            <input className="input-element" placeholder="Name" onChange={evt => setName(evt.target.value)} value={ name } />
            <input className="input-element" placeholder="Directory - no /" onChange={evt => setDir(evt.target.value)} value={ dir } />
        </div>
        <div className="flex space-x-2 mb-2 flex-shrink-0">
            <div className="input-element hover:bg-slate-900 text-center p-0 text-xl" onClick={evt => newField()}>+</div>
            <div className="input-element hover:bg-slate-900 text-center p-0 text-xl" onClick={evt => removeField()}>-</div>
        </div>
        <div className="grid grid-cols-1 gap-2 overflow-auto">
            {options && options.map((element, index) =>
            {
                return <div className="flex space-x-2" key={ index }>
                    <input className="input-element" placeholder="Field" onChange={evt => updateField(index, evt.target.value, element.type)} value={element.key} />
                    <input className="input-element" placeholder="Type" onChange={evt => updateField(index, element.key, evt.target.value)} value={ element.type } />
                </div>;
            })}
        </div>
        <div className="mt-auto text-yellow-300">
        - TONIC
        </div>
    </div>
}