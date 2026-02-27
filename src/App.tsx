/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Stars, Sparkles } from 'lucide-react';

export default function App() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);

  const handleNoHover = () => {
    if (isAccepted) return;
    
    // 버튼의 대략적인 크기 (패딩 포함 약 120x60)
    const btnWidth = 120;
    const btnHeight = 60;
    
    // 화면 중앙으로부터의 최대 이동 거리 계산 (화면 밖으로 나가지 않게)
    // window.innerWidth / 2 가 중앙이므로, 여기서 btnWidth/2 만큼 뺀 값이 최대 범위
    const maxX = (window.innerWidth / 2) - (btnWidth / 2) - 20;
    const maxY = (window.innerHeight / 2) - (btnHeight / 2) - 20;
    
    // 새로운 좌표 생성 (-maxX ~ maxX)
    const newX = (Math.random() * 2 - 1) * maxX;
    const newY = (Math.random() * 2 - 1) * maxY;
    
    setNoButtonPos({ x: newX, y: newY });
    setYesButtonSize(prev => Math.min(prev + 0.1, 2.5)); // 적절한 크기까지만 커지게 함
    setNoClickCount(prev => prev + 1);
  };

  const handleYes = () => {
    setIsAccepted(true);
  };

  const messages = [
    "진짜 안 할 거야? 🥺",
    "다시 생각해봐... 💔",
    "승민이가 기다리는데? 😭",
    "클릭하기 힘들걸? 😏",
    "승민이 울어... 💧",
    "진심이야? 😱",
    "한 번만 더 생각해봐! 🙏",
    "나 상처받았어... 🩹",
    "데이트하면 진짜 재밌을 텐데! 🎡",
    "맛있는 거 사줄게! 오빠 잔액 지켜! 🍰",
    "오늘 안 하면 후회할걸? ⚡",
    "거절은 거절한다! 🚫",
    "마우스가 고장 났나? 🖱️",
    "손가락이 미끄러졌지? 🖐️",
  ];

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center text-center space-y-8 max-w-md w-full"
          >
            {/* Image Section */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src="https://postfiles.pstatic.net/MjAyNjAyMjdfMjA1/MDAxNzcyMTcyODc0NDI1.dqwTu2PAkOvuthVPlNnDVLZGcV04g-UbfBAI6C8gXsog.6ISvOjt9MnSkv5BBtZZLGRvngi860AoBT_pM1y6d7kcg.JPEG/f10fd32ca20c34a9c7428e3c7fc385514ba2c41a.jpg?type=w966"
                alt="Cute Seungmin"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent" />
            </motion.div>

            {/* Question Section */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-rose-600 tracking-tight">
                승민이랑 데이트할래? 🧸
              </h1>
              <p className="text-rose-400 font-medium h-6">
                {noClickCount > 0 ? messages[Math.min(noClickCount - 1, messages.length - 1)] : "영화도 늦게 끝나는데 밤새 같이 있자><"}
              </p>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-wrap items-center justify-center gap-6 w-full relative min-h-[120px]">
              <motion.button
                onClick={handleYes}
                animate={{ scale: yesButtonSize }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: yesButtonSize + 0.05 }}
                whileTap={{ scale: yesButtonSize - 0.05 }}
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg transition-colors flex items-center gap-2 z-10"
              >
                좋아! <Heart className="fill-current" size={20} />
              </motion.button>

              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                className="bg-white text-rose-500 border-2 border-rose-200 px-8 py-3 rounded-full font-bold text-xl shadow-md hover:bg-rose-50 transition-colors whitespace-nowrap"
              >
                싫어
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 text-rose-300 opacity-50"
              >
                <Stars size={120} className="w-full h-full" />
              </motion.div>
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10"
              >
                <img
                  src="https://postfiles.pstatic.net/MjAyNjAyMjdfMjQ2/MDAxNzcyMTcyODc0NTk2.U654wGVGO6UiMh6-w-j7VlGdjHIrf9iyu_3mwFpBfuMg.Hqweugcj32eUmZgTvgicGIZSlwASh3ajNIvG8is5fckg.JPEG/IMG%EF%BC%BF1741.JPG?type=w966"
                  alt="Happy Couple"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-rose-600 flex items-center justify-center gap-3">
                야호! <Sparkles className="text-yellow-400" />
              </h2>
              <p className="text-xl text-rose-500 font-semibold">
                그럼 이따가 8시에 만나! ❤️
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    delay: i * 0.1,
                    repeat: Infinity,
                    duration: 1.5
                  }}
                >
                  <Heart className="text-rose-400 fill-rose-400" size={24} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        <div className="absolute top-10 left-10 text-rose-300 animate-pulse"><Heart size={40} /></div>
        <div className="absolute bottom-20 right-10 text-rose-300 animate-bounce"><Heart size={30} /></div>
        <div className="absolute top-1/2 left-1/4 text-rose-200"><Sparkles size={20} /></div>
        <div className="absolute bottom-1/3 right-1/4 text-rose-200"><Sparkles size={25} /></div>
      </div>
    </div>
  );
}
