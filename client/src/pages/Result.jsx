import React, { useState, useContext } from 'react';
import { motion } from 'motion/react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setImageLoaded(true);
        setImage(generatedImage);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center'
    >
      <div className='relative'>
        <img src={image} alt='Generated' className='max-w-md md:max-w-lg rounded shadow-lg' />
        {loading && (
          <span className='absolute bottom-0 left-0 h-1 bg-blue-500 w-full transition-all duration-[10s]' />
        )}
      </div>
      {loading && <p className='text-gray-600 text-lg mt-2'>Generating...</p>}

      {!isImageLoaded && (
        <div className='flex w-full max-w-2xl bg-gray-100 text-black text-base p-1 mt-12 rounded-full shadow-md '>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Describe your imagination in words'
            className='flex-1 bg-transparent outline-none ml-8 text-black placeholder-gray-500 text-lg'
          />
          <button
            type='submit'
            className='bg-gray-800 text-white px-12 sm:px-20 py-4 rounded-full text-lg hover:bg-gray-900 transition-all cursor-pointer'
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-6 flex-wrap justify-center text-white text-lg p-1 mt-12'>
          <button
            onClick={() => setImageLoaded(false)}
            className='bg-transparent border border-gray-800 text-black px-10 py-4 rounded-full hover:bg-gray-100 transition-all'
          >
            Generate Another
          </button>
          <a
            href={image}
            download
            className='bg-gray-800 text-white px-12 py-4 rounded-full hover:bg-gray-900 transition-all'
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;

