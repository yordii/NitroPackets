type Props = {
    title?: string;
    subTitle?: string;
    children: React.ReactNode;
}
export default function ViewTemplate(props: Props)
{
    const { title = '', subTitle = '', children = null } = props;

    return <div className="bg-slate-800 w-full p-1 rounded text-slate-600">
        <div className="text-sm border-b border-b-slate-700 text-slate-600 pb-1 flex flex-row justify-between">
            <span>{ title }</span>
            <span>{ subTitle }</span>
        </div>
        <div className="w-full overflow-hidden select-text pt-2 text-sm">
        { children }
        </div>
    </div>
}