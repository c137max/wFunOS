"use client"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';

const MusicPage = () => {


    const [player, setPlayer] = useState({
        progress: 50
    });

    return (
        <div className="relative h-full flex flex-col">
            <div className="flex flex-row  overflow-auto p-4 h-full">
                <div className=" basis-1/4 mb-4 font-bold text-xl">歌曲列表</div>
                <div className=" basis-3/4 text-gray-700">歌词</div>
            </div>
            <div className="absolute bottom-0 w-full  ">
                <progress className="w-full h-1 bg-black"  value={player.progress} max="100" />
                <div className="flex px-4 bg-base-100  justify-center rounded-md">
                    {/* <div className="">歌曲图片</div> */}
                    <button className="mx-2"><ChevronDoubleLeftIcon className='h-9 w-9'/></button>
                    <button className="mx-2"><PlayIcon className='h-9 w-9'/></button>
                    <button className="mx-2"><ChevronDoubleRightIcon className='h-9 w-9'/></button>
                </div>
            </div>
        </div>
    )
}

export default MusicPage