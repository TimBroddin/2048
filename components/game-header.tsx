'use client';

interface GameHeaderProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
}

export function GameHeader({ score, bestScore, onRestart }: GameHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-[80px] font-bold text-text-primary m-0">2048</h1>

        <div className="flex gap-2">
          <div className="relative bg-grid-bg px-[25px] py-[15px] rounded-[3px] text-white text-center min-w-[85px]">
            <div className="absolute top-[10px] left-0 right-0 text-[#eee4da] text-[13px] uppercase">
              Score
            </div>
            <div className="text-[25px] font-bold leading-[47px]">
              {score}
            </div>
          </div>

          <div className="relative bg-grid-bg px-[25px] py-[15px] rounded-[3px] text-white text-center min-w-[85px]">
            <div className="absolute top-[10px] left-0 right-0 text-[#eee4da] text-[13px] uppercase">
              Best
            </div>
            <div className="text-[25px] font-bold leading-[47px]">
              {bestScore}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-text-primary leading-[42px] m-0">
          Join the numbers and get to the <strong>2048 tile!</strong>
        </p>
        <button
          onClick={onRestart}
          className="bg-[#8f7a66] text-[#f9f6f2] px-5 h-[40px] leading-[42px] rounded-[3px] font-bold cursor-pointer hover:bg-[#9f8a76] transition-colors"
        >
          New Game
        </button>
      </div>
    </div>
  );
}
