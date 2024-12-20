const Box=(props)=>{
    return(
<div
  class="relative rounded-lg -skew-x-6 -translate-y-2 -translate-y-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 duration-500 w-72 h-44 p-2 bg-neutral-50 card-compact hover:bg-base-200 transition-all duration-200 [box-shadow:12px_12px] hover:[box-shadow:4px_4px]"
>
  <figure class="w-full h-full">
    <div
      alt="change to a img tag"
      class="bg-neutral-800 text-neutral-50 min-h-full rounded-lg border border-opacity-5"
    ></div>
  </figure>
  <div class="absolute text-neutral-50 bottom-4 left-0 px-4">
    <span class="font-bold text-wrap">{props.name}</span>
    <p class="text-[50px] opacity-60 line-clamp-2 text-wrap">
      {`${props.value}`}
    </p>
  </div>
</div>

    )
}
export default Box;