'use client';

interface GameMessageProps {
  won: boolean;
  over: boolean;
  onRestart: () => void;
  onKeepPlaying: () => void;
}

export function GameMessage({ won, over, onRestart, onKeepPlaying }: GameMessageProps) {
  if (!won && !over) return null;

  return (
    <div
      className={`absolute inset-0 z-[100] flex flex-col items-center justify-center text-center animate-fadeIn ${
        won ? 'bg-[rgba(237,194,46,0.5)]' : 'bg-[rgba(238,228,218,0.5)]'
      }`}
    >
      <p className={`text-[60px] font-bold m-0 ${won ? 'text-text-light' : 'text-text-primary'}`}>
        {won ? 'You win!' : 'Game over!'}
      </p>

      <div className="mt-[59px] flex gap-[9px]">
        {won && (
          <button
            onClick={onKeepPlaying}
            className="bg-[#8f7a66] text-[#f9f6f2] px-5 h-[40px] leading-[42px] rounded-[3px] font-bold cursor-pointer hover:bg-[#9f8a76] transition-colors"
          >
            Keep playing
          </button>
        )}
        <button
          onClick={onRestart}
          className="bg-[#8f7a66] text-[#f9f6f2] px-5 h-[40px] leading-[42px] rounded-[3px] font-bold cursor-pointer hover:bg-[#9f8a76] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
