import { useData } from "./state";
import FormView from "./views/FormView";
import PacketView from "./views/PacketView";
import ParserView from "./views/ParserView";
import RegisterPacketView from "./views/RegisterPacketView";

export default function App()
{
  const { ready } = useData();
  return <div className="flex flex-row h-full overflow-hidden select-none cursor-default">
    <FormView />
    <div className={ "w-3/4 h-full bg-slate-900 flex flex-col space-y-2 p-3 overflow-y-auto " + (ready ? '' : ' justify-center')}>
      {ready ? <>
        <RegisterPacketView/>
        <PacketView />
        <ParserView />
      </> : 
      <div className="text-xl text-red-700 text-center">Fill in the fields!</div>}
    </div>
  </div>
} 
