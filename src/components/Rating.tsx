import Image from "next/image";
export default function Rating({value}:{value:number}){
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-1">
      {Array.from({length:5}).map((_,i)=>(
        <Image key={i} src="/star.svg" width={14} height={14} alt="" className={i<full ? "opacity-100" : "opacity-30"}/>
      ))}
      <span className="text-xs text-slate-300 ml-1">{value.toFixed(1)}</span>
    </div>
  );
}
