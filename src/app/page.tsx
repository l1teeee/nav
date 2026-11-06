import LobeStack from "@/components/LobeStack";

export default function Home() {
  return (
    <main className="grid h-dvh place-items-center">
      <LobeStack>
        <div className="lobe grid-cols-[minmax(0,1fr)_auto] gap-x-[1em]">
          <h1 className="type-title col-start-2 row-start-1 self-start">Still.</h1>
          <p className="type-lead col-start-1 row-start-1 self-center">
            Every mark
            <br />
            was a doubt.
          </p>
        </div>
        <div className="lobe">
          <p className="type-statement self-center justify-self-end text-right">
            We become
            <br />
            what we keep.
          </p>
        </div>
        <div className="lobe">
          <p className="type-statement self-center">
            Let it dry
            <br />
            slowly.
          </p>
        </div>
        <div className="lobe">
          <p className="type-lead self-end justify-self-end text-right">
            Nothing here
            <br />
            needs to be finished.
          </p>
        </div>
      </LobeStack>
    </main>
  );
}
