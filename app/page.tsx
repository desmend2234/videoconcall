'use client';
import { useRouter } from 'next/navigation';
import useUser from './hooks/useUser';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FiArrowRight } from 'react-icons/fi';
import { useMotionTemplate, useMotionValue, motion, animate } from 'framer-motion';

const COLORS_TOP = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

export default function Home() {
  const { fullName, setFullName } = useUser();
  const [roomId, setRoomId] = useState('');
  const router = useRouter();
  const [openBtn, setOpenBtn] = useState(false);
  useEffect(() => {
    setFullName('');
  }, []);

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="w-full relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full capitalize bg-gray-600/50 px-3 py-1.5 text-sm">
          Start a talk
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-white via-zinc-300 to-gray-500 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl capitalize md:leading-tight">
          Have a smooth meeting
        </h1>
        <p className="bg-clip-text  font-extrabold text-transparent my-6 max-w-[20rem] md:max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 capitalize tracking-widest text-pretty break-words">
          Making remote communication effortless
        </p>
        {!fullName && (
          <motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            onClick={() => setOpenBtn(true)}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
          >
            Start free trial
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        )}

        {openBtn && (
          <div className="w-[50dvw] md:w-[30dvw] flex items-center justify-center gap-4 mt-6">
            <input
              type="text"
              className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
              id="name"
              onChange={(e) => setFullName(e.target.value.toString())}
              placeholder="Enter your name"
            />
          </div>
        )}
        {fullName && fullName.length > 0 && (
          <>
            <div className="w-[50dvw] md:w-[30dvw] flex items-center justify-center gap-4 mt-4">
              <input
                type="text"
                id="roomid"
                value={roomId}
                onChange={(e) => setFullName(e.target.value)}
                className="w-[30dvw] md:w-full border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2  text-black"
                placeholder="Enter room id"
              />
              {/* <button
                className="rounded-md bg-blue-600 px-10 py-2 text-sm font-medium"
                onClick={() => router.push(`/room/${roomId}`)}
                disabled={!roomId}
              >
                Go to Room
              </button> */}
              <motion.button
                style={{
                  border,
                  boxShadow,
                }}
                whileHover={{
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                onClick={() => router.push(`/room/${roomId}`)}
                disabled={!roomId}
                className="group relative flex max-w-fit md:w-full items-center gap-1.5  bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 cursor-pointer rounded-lg"
              >
                Go
                <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
              </motion.button>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button
                className="text-lg font-medium duration-200 transition-all hover:text-blue-400 hover:underline"
                onClick={() => router.push(`/room/${uuid()}`)}
              >
                Create a room
              </button>
            </div>
          </>
        )}
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );

  // <div className="w-full h-screen">
  //   <section className="bg-gray-950 text-white">
  //     <div className="mx-auto max-w-scr een-xl px-4 py-32 flex-col gap-24 flex h-screen items-center">
  //       <div className="mx-auto max-w-4xl text-center">
  //         <h1 className="bg-gradient-to-r from-green-600 via-blue-300 to-purple-500 bg-clip-text  font-extrabold text-transparent text-5xl">
  //           {`Have a smooth meeting`}
  //         </h1>
  //         <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text  font-extrabold text-transparent text-5xl">
  //           <span className="block">with your friends</span>
  //         </h1>
  //         <div className="flex items-center justify-center gap-4 mt-6">
  //           <input
  //             type="text"
  //             className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
  //             id="name"
  //             onChange={(e) => setFullName(e.target.value.toString())}
  //             placeholder="enter your name"
  //           />
  //         </div>
  //         {fullName && fullName.length > 0 && (
  //           <>
  //             <div className="flex items-center justify-center gap-4 mt-4">
  //               <input
  //                 type="text"
  //                 id="roomid"
  //                 value={roomId}
  //                 onChange={(e) => setFullName(e.target.value)}
  //                 className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
  //                 placeholder="enter room id"
  //               />
  //               <button
  //                 className="rounded-md bg-blue-600 px-10 py-[11px] text-sm font-medium"
  //                 onClick={() => router.push(`/room/${roomId}`)}
  //                 disabled={!roomId}
  //               >
  //                 Go to Room
  //               </button>
  //             </div>
  //             <div className="mt-4 flex items-center justify-center">
  //               <button
  //                 className="text-lg font-medium hover:text-blue-400 hover:underline"
  //                 onClick={() => router.push(`/room/${uuid()}`)}
  //               >
  //                 Create a room
  //               </button>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </section>
  // </div>
}
