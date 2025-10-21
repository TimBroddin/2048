import { Game } from '@/components/game';

export default function Home() {
  return (
    <main className="min-h-screen py-20 px-4">
      <Game />

      <div className="max-w-[530px] mx-auto mt-8">
        <hr className="border-none border-b border-[#d8d4d0] my-8" />

        <p className="text-text-primary leading-[1.65] mb-4">
          <strong className="uppercase">Note:</strong> This is a modern Next.js implementation of the classic 2048 game.
        </p>

        <hr className="border-none border-b border-[#d8d4d0] my-8" />

        <p className="text-text-primary leading-[1.65]">
          Original game created by <a href="http://gabrielecirulli.com" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold underline">Gabriele Cirulli</a>.
          Based on <a href="https://itunes.apple.com/us/app/1024!/id823499224" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold underline">1024 by Veewo Studio</a> and conceptually similar to <a href="http://asherv.com/threes/" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold underline">Threes by Asher Vollmer</a>.
        </p>
      </div>
    </main>
  );
}
