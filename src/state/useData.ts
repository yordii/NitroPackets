import { useEffect, useMemo, useState } from "react";
import { useBetween } from "use-between";

interface IOptions
{
    key: string;
    type: string;
}
const useDataState = () =>
{
    const [packetID, setPacketID] = useState<string>("");
    const [internal, setInternal] = useState<number>(1);
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<number>(0);
    const [dir, setDir] = useState<string>("");

    const [ready, setReady] = useState<boolean>(false);

    const [options, setOptions] = useState<IOptions[]>([]);

    const titleName = useMemo(() =>
    {
        return name.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ').replaceAll(" ", "");
    }, [name]);

    const breadCrumbs = useMemo(() =>
    {
        let dirs = dir.split("/");

        let str = "";

        dirs.forEach(val => str += "../");

        return str;
    }, [dir]);

    const updateField = (index: number, key: string, type: string) =>
    {
        setOptions(prev =>
        {
            let newVal = [...prev];

            newVal[index].key = key;
            newVal[index].type = type;

            return newVal;
        })
    }

    const newField = () =>
    {
        setOptions(prev =>
        {
            let newVal = [...prev];

            newVal.push({ key: '', type: '' });

            return newVal;
        })
    }

    const removeField = () =>
    {
        setOptions(prev =>
        {
            let newVal = [...prev];

            newVal.splice(prev.length - 1, 1)

            return newVal;
        })
    }

    useEffect(() =>
    {
        console.log(packetID, name, dir)
        if (!packetID || !name || !dir) setReady(false);
        else setReady(true);
    }, [packetID, name, dir])

    return {
        packetID, setPacketID,
        name, setName, titleName,
        type, setType,
        internal, setInternal,
        dir, setDir, breadCrumbs,
        options, setOptions, updateField, newField, removeField,
        ready
    }
}

export const useData = () => useBetween(useDataState);